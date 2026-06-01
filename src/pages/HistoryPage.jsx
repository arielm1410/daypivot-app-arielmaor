import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import BottomNavigation from "../components/Navigation/BottomNavigation.jsx";
import { supabase } from "../lib/supabase.js";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      setIsLoading(true);

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        setHistory([]);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("decisions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        alert(error.message);
        setIsLoading(false);
        return;
      }

      setHistory(data || []);
      setIsLoading(false);
    }

    loadHistory();
  }, []);

  async function handleClearHistory() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return;

    const { error } = await supabase
      .from("decisions")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    setHistory([]);
  }

  const averageScore = history.length
    ? Math.round(
        history.reduce((sum, item) => sum + (item.confidence_score || 0), 0) /
          history.length
      )
    : 0;

  return (
    <main className="app-shell">
      <Navbar />

      <h1 className="page-title">Decision History</h1>
      <p className="page-copy">
        Review saved results and decision progress over time.
      </p>

      <section className="stats-grid" style={{ marginBottom: 14 }}>
        <div className="soft-card" style={{ textAlign: "center" }}>
          <p className="card-copy">Completed</p>
          <div className="stat-number">{history.length}</div>
        </div>

        <div className="soft-card" style={{ textAlign: "center" }}>
          <p className="card-copy">Avg. Score</p>
          <div className="stat-number">
            {history.length ? `${averageScore}%` : "—"}
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
        {isLoading ? (
          <div className="card empty-state">
            <h3 className="card-title">Loading history...</h3>
          </div>
        ) : history.length === 0 ? (
          <div className="card empty-state">
            <h3 className="card-title">No saved decisions yet</h3>
            <p className="card-copy">
              Complete a question flow and your result will appear here.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <article key={item.id} className="card history-card">
              <div className="row">
                <span className="status">
                  {item.confidence_score}% Confidence
                </span>
                <span className="card-copy">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>

              <h3 className="card-title">{item.title}</h3>
              <p className="card-copy">{item.result}</p>
              {item.decision_tip && (
  <div className="decision-tip">
    <strong>Tip</strong>
    <p className="card-copy">{item.decision_tip}</p>
  </div>
)}
              

              <div className="decision-tip">
                <strong>Category</strong>
                <p className="card-copy">{item.category}</p>
              </div>
            </article>
          ))
        )}
      </section>

      <BottomNavigation />
    </main>
  );
}