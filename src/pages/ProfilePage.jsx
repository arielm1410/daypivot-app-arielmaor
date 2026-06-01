import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import BottomNavigation from "../components/Navigation/BottomNavigation.jsx";
import InputField from "../components/Inputs/InputField.jsx";
import PrimaryButton from "../components/Buttons/PrimaryButton.jsx";
import { supabase } from "../lib/supabase.js";
import { getHistory } from "../utils/decisionStorage.js";

export default function ProfilePage() {
  const navigate = useNavigate();

  const history = getHistory();
  const mostRecentCategory = history[0]?.category?.title || "No category yet";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/");
        return;
      }

      setEmail(data.user.email || "");
      setFullName(data.user.user_metadata?.full_name || "");
    }

    loadUser();
  }, [navigate]);

  async function handleSaveChanges() {
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile updated successfully!");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <main className="app-shell">
      <Navbar />

      <h1 className="page-title">Profile</h1>
      <p className="page-copy">
        Update your personal details and view your decision progress.
      </p>

      <section className="stack">
        <section className="stats-grid">
          <div className="soft-card" style={{ textAlign: "center" }}>
            <p className="card-copy">Saved Decisions</p>
            <div className="stat-number">{history.length}</div>
          </div>

          <div className="soft-card" style={{ textAlign: "center" }}>
            <p className="card-copy">Latest Topic</p>
            <div className="stat-number" style={{ fontSize: 14 }}>
              {mostRecentCategory}
            </div>
          </div>
        </section>

        <div className="card">
          <InputField
            label="Full Name"
            placeholder="Dana Levi"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />

          <div style={{ height: 14 }} />

          <InputField
            label="Email"
            type="email"
            placeholder="dana@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div style={{ height: 18 }} />

          <PrimaryButton type="button" onClick={handleSaveChanges}>
            Save Changes
          </PrimaryButton>

          <div style={{ height: 12 }} />

          <button
            className="secondary-button"
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}