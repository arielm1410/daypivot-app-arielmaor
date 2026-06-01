import { useState } from "react";
import { AlertCircle, BatteryCharging, Save, Star, Lightbulb } from "lucide-react";
import Navbar from "../components/Navbar/Navbar.jsx";
import BottomNavigation from "../components/Navigation/BottomNavigation.jsx";
import { getLastResult } from "../utils/decisionStorage.js";
import { supabase } from "../lib/supabase.js";
import { Link } from "react-router-dom";

export default function DecisionResultPage() {
  const result = getLastResult();
  const [isSaving, setIsSaving] = useState(false);

  async function saveDecisionToSupabase() {
    if (!result) return;

    setIsSaving(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert("Please log in first");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase.from("decisions").insert({
      user_id: user.id,
      title: result.category.title,
      category: result.category.id,
      result: result.recommendation,
      confidence_score: result.confidence,
      decision_tip: result.decisionTip
    });

    setIsSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Decision saved successfully!");
  }

  if (!result) {
    return (
      <main className="app-shell">
        <Navbar />
        <section className="card empty-state">
          <h1 className="page-title">No Result Yet</h1>
          <p className="page-copy">Start a new decision flow to generate a result.</p>
          <Link to="/questions" className="primary-button">Start Decision</Link>
        </section>
        <BottomNavigation />
      </main>
    );
  }

  const iconMap = {
    Clarity: Star,
    Urgency: AlertCircle,
    Energy: BatteryCharging
  };

  return (
    <main className="app-shell">
      <Navbar />

      <h1 className="page-title">Decision Result</h1>
      <p className="page-copy">{result.category.title}</p>

      <section className="result-gauge">
        <div style={{ textAlign: "center" }}>
          <strong className="score">{result.confidence}%</strong>
          <span className="score-label">CONFIDENCE</span>
        </div>
      </section>

      <section className="card">
        <span className="label">Recommended Direction</span>
        <h2 className="card-title">{result.recommendation}</h2>
        <p className="card-copy" style={{ fontSize: 15 }}>
          Based on your answers, DayPivot calculated the confidence level and highlighted the main factors that influenced the decision.
        </p>

        <div className="decision-tip">
          <strong><Lightbulb size={16} style={{ verticalAlign: "middle", marginRight: 6 }} /> What should you do?</strong>
          <p className="card-copy">{result.decisionTip}</p>
        </div>
      </section>

      <h2 className="card-title" style={{ marginTop: 20 }}>Main Factors</h2>

      <section className="stack">
        {result.mainFactors.map((factor) => {
          const Icon = iconMap[factor.name] || Star;

          return (
            <div className="factor" key={factor.name}>
              <div className="row" style={{ justifyContent: "flex-start" }}>
                <Icon color={factor.type === "critical" ? "#EF4444" : "#14B8A6"} size={20} />
                <strong>{factor.name}</strong>
              </div>
              <span className={`badge ${factor.type}`}>{factor.status}</span>
            </div>
          );
        })}
      </section>

      <div style={{ marginTop: 22 }}>
        <button className="primary-button" type="button" onClick={saveDecisionToSupabase}>
          <Save size={18} />
          {isSaving ? "Saving..." : "Save Decision"}
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <Link to="/history" className="secondary-button">View Saved History</Link>
      </div>

      <BottomNavigation />
    </main>
  );
}