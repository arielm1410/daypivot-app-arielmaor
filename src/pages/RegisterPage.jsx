import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import InputField from "../components/Inputs/InputField.jsx";
import PrimaryButton from "../components/Buttons/PrimaryButton.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
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
        <h1 className="brand-title">Create Account</h1>
        <p className="subtitle">Start making clearer decisions with DayPivot.</p>
      </section>

      <form className="form" onSubmit={handleRegister}>
        <InputField
          label="Full Name"
          placeholder="Dana Levi"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />

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

        <PrimaryButton type="submit">Register</PrimaryButton>

        <div className="auth-links">
          <Link to="/">Already have an account? Log In</Link>
        </div>
      </form>
    </main>
  );
}