import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import BottomNavigation from "../components/Navigation/BottomNavigation.jsx";

export default function SettingsPage() {
  return (
    <main className="app-shell">
      <Navbar />
      <h1 className="page-title">Settings</h1>
      <p className="page-copy">Manage app preferences and account actions.</p>

      <section className="stack">
        <div className="card row">
          <div>
            <h3 className="card-title">Notifications</h3>
            <p className="card-copy">Receive reminders about open decisions.</p>
          </div>
          <span className="badge success">ON</span>
        </div>

        <div className="card row">
          <div>
            <h3 className="card-title">Question Flow</h3>
            <p className="card-copy">10 questions per selected topic.</p>
          </div>
          <span className="badge">Smart</span>
        </div>

        <div className="card row">
          <div>
            <h3 className="card-title">History</h3>
            <p className="card-copy">Saved locally in the browser for this demo.</p>
          </div>
          <span className="badge success">ACTIVE</span>
        </div>

        <Link to="/" className="primary-button">Logout</Link>
      </section>

      <BottomNavigation />
    </main>
  );
}
