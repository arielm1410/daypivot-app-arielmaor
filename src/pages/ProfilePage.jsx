import Navbar from "../components/Navbar/Navbar.jsx";
import BottomNavigation from "../components/Navigation/BottomNavigation.jsx";
import InputField from "../components/Inputs/InputField.jsx";
import PrimaryButton from "../components/Buttons/PrimaryButton.jsx";
import { getHistory } from "../utils/decisionStorage.js";

export default function ProfilePage() {
  const history = getHistory();
  const mostRecentCategory = history[0]?.category?.title || "No category yet";

  return (
    <main className="app-shell">
      <Navbar />
      <h1 className="page-title">Profile</h1>
      <p className="page-copy">Update your personal details and view your decision progress.</p>

      <section className="stack">
        <section className="stats-grid">
          <div className="soft-card" style={{ textAlign: "center" }}>
            <p className="card-copy">Saved Decisions</p>
            <div className="stat-number">{history.length}</div>
          </div>
          <div className="soft-card" style={{ textAlign: "center" }}>
            <p className="card-copy">Latest Topic</p>
            <div className="stat-number" style={{ fontSize: 14 }}>{mostRecentCategory}</div>
          </div>
        </section>

        <div className="card">
          <InputField label="Full Name" placeholder="Dana Levi" />
          <div style={{ height: 14 }} />
          <InputField label="Email" type="email" placeholder="dana@email.com" />
          <div style={{ height: 18 }} />
          <PrimaryButton>Save Changes</PrimaryButton>
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
