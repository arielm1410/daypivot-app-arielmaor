import { useState } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import BottomNavigation from "../components/Navigation/BottomNavigation.jsx";
import { clearHistory, getHistory } from "../utils/decisionStorage.js";

export default function HistoryPage() {
  const [history, setHistory] = useState(getHistory());
  const [openId, setOpenId] = useState(history[0]?.id || null);

  function handleClearHistory() {
    clearHistory();
    setHistory([]);
  }

  return (
    <main className="app-shell">
      <Navbar />
      <h1 className="page-title">Decision History</h1>
      <p className="page-copy">Review saved results, answered questions and progress over time.</p>

      <section className="stats-grid" style={{ marginBottom: 14 }}>
        <div className="soft-card" style={{ textAlign: "center" }}>
          <p className="card-copy">Completed</p>
          <div className="stat-number">{history.length}</div>
        </div>

        <div className="soft-card" style={{ textAlign: "center" }}>
          <p className="card-copy">Avg. Score</p>
          <div className="stat-number">
            {history.length
              ? `${Math.round(
                  history.reduce((sum, item) => sum + item.confidence, 0) / history.length
                )}%`
              : "—"}
          </div>
        </div>
      </section>

      {history.length > 0 && (
        <button
          className="ghost-button"
          onClick={handleClearHistory}
          style={{ marginBottom: 14 }}
        >
          Clear History
        </button>
      )}

      <section className="stack">
        {history.length === 0 ? (
          <div className="card empty-state">
            <h3 className="card-title">No saved decisions yet</h3>
            <p className="card-copy">
              Complete a question flow and your result will appear here.
            </p>
          </div>
        ) : (
          history.map((item) => {
            const isOpen = openId === item.id;

            return (
              <article
                key={item.id}
                className={`card history-card ${isOpen ? "open" : ""}`}
              >
                <div className="row">
                  <span className="status">{item.confidence}% Confidence</span>
                  <span className="card-copy">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="card-title">{item.category.title}</h3>
                <p className="card-copy">{item.recommendation}</p>

                {item.decisionTip && (
                  <div className="decision-tip">
                    <strong>Tip</strong>
                    <p className="card-copy">{item.decisionTip}</p>
                  </div>
                )}

                <button
                  className="small-link-button"
                  style={{ marginTop: 12 }}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  {isOpen ? "Hide answers" : "View answers"}
                </button>

                <div className="history-detail">
                  <div className="answer-summary">
                    {item.answeredQuestions.map((answer, index) => (
                      <div className="answer-item" key={`${item.id}-${index}`}>
                        <p className="card-copy">
                          <strong>Q{index + 1}:</strong> {answer.question}
                        </p>
                        <p className="status" style={{ marginTop: 6 }}>
                          Answer: {answer.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      <BottomNavigation />
    </main>
  );
}
