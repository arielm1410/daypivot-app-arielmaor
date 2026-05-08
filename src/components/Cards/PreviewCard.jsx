import { Link } from "react-router-dom";
import { getLastResult } from "../../utils/decisionStorage.js";

export default function PreviewCard() {
  const lastResult = getLastResult();

  if (!lastResult) {
    return (
      <section className="card">
        <div className="preview-image" />
        <div className="row">
          <span className="status">Ready</span>
          <span className="card-copy">Start now</span>
        </div>
        <h3 className="card-title">No decisions yet</h3>
        <p className="card-copy">Choose a topic and answer smart questions to get your first recommendation.</p>
        <div className="row" style={{ marginTop: 14 }}>
          <span className="card-copy">AI Assisted</span>
          <Link to="/questions" className="status">Start →</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="preview-image" />
      <div className="row">
        <span className="status">{lastResult.confidence}% Confidence</span>
        <span className="card-copy">{new Date(lastResult.createdAt).toLocaleDateString()}</span>
      </div>
      <h3 className="card-title">{lastResult.category.title}</h3>
      <p className="card-copy">{lastResult.recommendation}</p>
      <div className="row" style={{ marginTop: 14 }}>
        <span className="card-copy">Saved Result</span>
        <Link to="/history" className="status">View history →</Link>
      </div>
    </section>
  );
}
