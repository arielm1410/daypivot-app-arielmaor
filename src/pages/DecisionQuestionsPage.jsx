import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import PrimaryButton from "../components/Buttons/PrimaryButton.jsx";
import CategoryGrid from "../components/Categories/CategoryGrid.jsx";
import { getCategoryById, getQuestionsByCategory } from "../data/questionBank.js";
import { calculateDecisionResult } from "../utils/resultLogic.js";
import {
  addHistoryItem,
  getActiveDecision,
  saveActiveDecision,
  saveLastResult
} from "../utils/decisionStorage.js";

export default function DecisionQuestionsPage() {
  const navigate = useNavigate();
  const storedDecision = getActiveDecision();

  const [category, setCategory] = useState(storedDecision?.category || null);
  const [answers, setAnswers] = useState(storedDecision?.answers || {});
  const [customQuestion, setCustomQuestion] = useState(storedDecision?.customQuestion || "");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(storedDecision?.currentQuestionIndex || 0);
  const [showCategoryPicker, setShowCategoryPicker] = useState(!storedDecision?.category);

  const questions = useMemo(() => {
    return category ? getQuestionsByCategory(category.id, customQuestion) : [];
  }, [category, customQuestion]);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : null;
  const progress = questions.length ? Math.round(((currentQuestionIndex + 1) / questions.length) * 100) : 0;

  function chooseCategory(categoryId) {
    const selectedCategory = getCategoryById(categoryId);
    const newDecision = {
      category: selectedCategory,
      customQuestion: "",
      answers: {},
      currentQuestionIndex: 0
    };

    setCategory(selectedCategory);
    setAnswers({});
    setCustomQuestion("");
    setCurrentQuestionIndex(0);
    setShowCategoryPicker(false);
    saveActiveDecision(newDecision);
  }

  function chooseAnswer(answer) {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: answer
    };

    setAnswers(nextAnswers);
    saveActiveDecision({
      category,
      customQuestion,
      answers: nextAnswers,
      currentQuestionIndex
    });
  }

  function goBack() {
    if (currentQuestionIndex === 0) {
      navigate("/dashboard");
      return;
    }

    const nextIndex = currentQuestionIndex - 1;
    setCurrentQuestionIndex(nextIndex);
    saveActiveDecision({
      category,
      customQuestion,
      answers,
      currentQuestionIndex: nextIndex
    });
  }

  function goNext() {
    if (!selectedAnswer) return;

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      saveActiveDecision({
        category,
        customQuestion,
        answers,
        currentQuestionIndex: nextIndex
      });
      return;
    }

    const result = calculateDecisionResult({
      category,
      questions,
      answers
    });

    saveLastResult(result);
    addHistoryItem(result);
    navigate("/result");
  }

  if (showCategoryPicker || !category) {
    return (
      <main className="app-shell">
        <h1 className="page-title">Choose a Topic</h1>
        <p className="page-copy">Search and select the area you want help with. The question flow will update by category.</p>
        <CategoryGrid selectedCategoryId={category?.id} onSelect={chooseCategory} />
        <button className="ghost-button" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <div className="progress-wrap">
        <div className="row" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <p className="progress-text">Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
          <button className="change-category-button" onClick={() => setShowCategoryPicker(true)}>
            Change Topic
          </button>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="page-copy" style={{ marginTop: 10, marginBottom: 0 }}>{category.title}</p>
      </div>

      <section className="card question-card">
        <h1 className="card-title" style={{ fontSize: 21 }}>
          {currentQuestion.question}
        </h1>
      </section>

      <section className="stack">
        {currentQuestion.answers.map((answer) => {
          const isSelected = selectedAnswer?.text === answer.text;

          return (
            <button
              key={answer.text}
              className={`option ${isSelected ? "selected" : ""}`}
              onClick={() => chooseAnswer(answer)}
            >
              <span>{answer.text}</span>
              {isSelected && <CheckCircle size={18} />}
            </button>
          );
        })}
      </section>

      <p className="matrix-title">Decision Priority Matrix</p>
      <p className="matrix-explanation">
        Use this to understand the decision: important and easy choices should usually be done first.
      </p>
      <section className="matrix">
        <div className="soft-card matrix-cell">
          Do First <strong>Important + Easy</strong>
        </div>
        <div className="soft-card matrix-cell">
          Plan Carefully <strong>Important + Hard</strong>
        </div>
        <div className="soft-card matrix-cell">
          Do Later <strong>Less Important + Easy</strong>
        </div>
        <div className="soft-card matrix-cell">
          Avoid / Reduce <strong>Less Important + Hard</strong>
        </div>
      </section>

      <section className="quick-actions" style={{ marginTop: 30 }}>
        <button className="ghost-button" onClick={goBack}>
          <ArrowLeft size={17} />
          Back
        </button>
        <PrimaryButton onClick={goNext} disabled={!selectedAnswer}>
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          <ArrowRight size={17} />
        </PrimaryButton>
      </section>
    </main>
  );
}
