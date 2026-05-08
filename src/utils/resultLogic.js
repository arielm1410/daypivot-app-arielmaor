export function calculateDecisionResult({ category, questions, answers }) {
  const answered = questions
    .map((question) => ({
      question,
      answer: answers[question.id]
    }))
    .filter((item) => item.answer);

  const totalScore = answered.reduce((sum, item) => sum + item.answer.score, 0);
  const maxScore = answered.length * 4 || 1;
  const confidence = Math.round((totalScore / maxScore) * 100);

  const average = totalScore / (answered.length || 1);

  let recommendation = "Take a small clear step now";
  let decisionTip = "Choose the option that reduces mental load and gives you the clearest next step.";

  if (confidence >= 82) {
    recommendation = "Take action now with confidence";
    decisionTip = "Your answers show strong clarity. Choose the option you already marked as most important and take the first practical step today.";
  } else if (confidence >= 65) {
    recommendation = "Move forward, but keep it simple";
    decisionTip = "You have enough clarity to continue. Pick the safer or simpler option, and avoid overthinking small details.";
  } else if (confidence >= 45) {
    recommendation = "Pause, reduce pressure, and choose the safest next step";
    decisionTip = "You are not fully clear yet. Do one small action first, like writing pros and cons or asking one trusted person.";
  } else {
    recommendation = "Do not rush. Rest, collect more clarity, then decide";
    decisionTip = "Your answers show low confidence. Give yourself time, lower the pressure, and decide only after you feel calmer.";
  }

  const mainFactors = [
    {
      name: "Clarity",
      status: confidence >= 70 ? "HIGH" : "MEDIUM",
      type: confidence >= 70 ? "success" : ""
    },
    {
      name: "Urgency",
      status: answered.some((item) => item.answer.text.toLowerCase().includes("immediately") || item.answer.text.toLowerCase().includes("today")) ? "CRITICAL" : "BALANCED",
      type: answered.some((item) => item.answer.text.toLowerCase().includes("immediately") || item.answer.text.toLowerCase().includes("today")) ? "critical" : ""
    },
    {
      name: "Energy",
      status: answered.some((item) => item.answer.text.toLowerCase().includes("low") || item.answer.text.toLowerCase().includes("tired")) ? "LOW" : "OPTIMAL",
      type: answered.some((item) => item.answer.text.toLowerCase().includes("low") || item.answer.text.toLowerCase().includes("tired")) ? "" : "success"
    }
  ];

  if (category?.id === "custom" && answered[0]?.question?.question) {
    decisionTip = `For your question: "${answered[0].question.question}", the best next step is: ${decisionTip}`;
  }

  return {
    id: Date.now().toString(),
    category,
    confidence,
    recommendation,
    decisionTip,
    mainFactors,
    answeredQuestions: answered.map((item) => ({
      question: item.question.question,
      answer: item.answer.text,
      score: item.answer.score
    })),
    createdAt: new Date().toISOString()
  };
}
