import { AlertCircle, BatteryCharging, Save, Star, Lightbulb } from "lucide-react";
import Navbar from "../components/Navbar/Navbar.jsx";
import BottomNavigation from "../components/Navigation/BottomNavigation.jsx";
import { getLastResult } from "../utils/decisionStorage.js";
import { Link } from "react-router-dom";

export default function DecisionResultPage() {
  const result = getLastResult();

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
        <Link to="/history" className="primary-button"><Save size={18} /> View Saved History</Link>
      </div>

      <BottomNavigation />
    </main>
  );
}
