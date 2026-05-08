import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CirclePlus, Zap, User, History, Sparkles, Search } from "lucide-react";
import Navbar from "../components/Navbar/Navbar.jsx";
import BottomNavigation from "../components/Navigation/BottomNavigation.jsx";
import PreviewCard from "../components/Cards/PreviewCard.jsx";
import CategoryGrid from "../components/Categories/CategoryGrid.jsx";
import { categories, getCategoryById } from "../data/questionBank.js";
import { getHistory, saveActiveDecision } from "../utils/decisionStorage.js";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [quickSearch, setQuickSearch] = useState("");

  const history = getHistory();
  const totalDecisions = history.length;
  const averageConfidence = history.length
    ? Math.round(history.reduce((sum, item) => sum + item.confidence, 0) / history.length)
    : 0;

  const matchingCategories = useMemo(() => {
    const value = quickSearch.trim().toLowerCase();

    if (!value) return [];

    return categories
      .filter((category) => {
        return (
          category.id !== "custom" &&
          (
            category.title.toLowerCase().includes(value) ||
            category.description.toLowerCase().includes(value) ||
            category.id.toLowerCase().includes(value)
          )
        );
      })
      .slice(0, 3);
  }, [quickSearch]);

  function startDecision(categoryId, customQuestion = "") {
    const category = getCategoryById(categoryId);
    saveActiveDecision({
      category,
      customQuestion,
      answers: {},
      currentQuestionIndex: 0
    });
    navigate("/questions");
  }

  function handleQuickSearch(event) {
    event.preventDefault();

    const value = quickSearch.trim();

    if (!value) {
      startDecision("daily");
      return;
    }

    if (matchingCategories.length > 0) {
      startDecision(matchingCategories[0].id);
      return;
    }

    startDecision("custom", value);
  }

  return (
    <main className="app-shell">
      <Navbar />

      <h1 className="page-title">Welcome to DayPivot</h1>
      <p className="page-copy">Choose a topic, search anything, or write your own decision question.</p>

      <section className="stack">
        <form className="quick-search-form" onSubmit={handleQuickSearch}>
          <span className="label">Quick Search</span>
          <div className="quick-search-row">
            <input
              className="quick-search-input"
              type="text"
              value={quickSearch}
              onChange={(event) => setQuickSearch(event.target.value)}
              placeholder="Search category or write your own question..."
            />
            <button className="quick-search-submit" type="submit" aria-label="Search">
              <Search size={19} />
            </button>
          </div>

          {quickSearch.trim() && (
            <div className="search-results">
              {matchingCategories.map((category) => (
                <button
                  type="button"
                  className="search-result-button"
                  key={category.id}
                  onClick={() => startDecision(category.id)}
                >
                  <strong>{category.title}</strong>
                  <span>{category.description}</span>
                </button>
              ))}

              <button
                type="button"
                className="search-result-button"
                onClick={() => startDecision("custom", quickSearch)}
              >
                <strong>Use my own question</strong>
                <span>{quickSearch}</span>
              </button>
            </div>
          )}
        </form>

        <Link to="/questions" className="primary-button">
          <CirclePlus size={18} />
          Start New Decision
        </Link>

        <button className="secondary-button" onClick={() => startDecision("stress")}>
          <Sparkles size={18} />
          Emergency Mode
          <Zap size={18} />
        </button>

        <div className="quick-actions">
          <Link className="ghost-button" to="/history"><History size={17} /> History</Link>
          <Link className="ghost-button" to="/profile"><User size={17} /> Profile</Link>
        </div>

        <h2 className="card-title" style={{ marginTop: 4 }}>Choose a Topic</h2>
        <CategoryGrid onSelect={(categoryId) => startDecision(categoryId)} />

        <h2 className="card-title" style={{ marginTop: 4 }}>Recent Preview</h2>
        <PreviewCard />

        <section className="stats-grid">
          <div className="soft-card" style={{ textAlign: "center" }}>
            <Sparkles size={18} />
            <p className="card-copy">Decisions Made</p>
            <div className="stat-number">{totalDecisions}</div>
          </div>
          <div className="soft-card" style={{ textAlign: "center" }}>
            <Zap size={18} />
            <p className="card-copy">Avg. Confidence</p>
            <div className="stat-number">{averageConfidence ? `${averageConfidence}%` : "—"}</div>
          </div>
        </section>
      </section>

      <BottomNavigation />
    </main>
  );
}
