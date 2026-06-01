import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import InputField from "../components/Inputs/InputField.jsx";
import PrimaryButton from "../components/Buttons/PrimaryButton.jsx";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <main className="auth-shell">
      <section>
        <h1 className="brand-title">DayPivot</h1>
        <p className="subtitle">Find clarity in every decision today.</p>
      </section>

      <form className="form" onSubmit={handleLogin}>
        <InputField
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <PrimaryButton type="submit">Log In</PrimaryButton>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Don’t have an account? Register</Link>
        </div>
      </form>
    </main>
  );
}