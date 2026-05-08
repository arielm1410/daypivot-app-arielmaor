import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/Inputs/InputField.jsx";
import PrimaryButton from "../components/Buttons/PrimaryButton.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <main className="auth-shell">
      <section>
        <h1 className="brand-title">Create Account</h1>
        <p className="subtitle">Start making clearer decisions with DayPivot.</p>
      </section>

      <form className="form" onSubmit={(event) => {
        event.preventDefault();
        navigate("/dashboard");
      }}>
        <InputField label="Full Name" placeholder="Dana Levi" />
        <InputField label="Email Address" type="email" placeholder="your@email.com" />
        <InputField label="Password" type="password" placeholder="••••••••" />
        <PrimaryButton type="submit">Register</PrimaryButton>
        <div className="auth-links">
          <Link to="/">Already have an account? Log In</Link>
        </div>
      </form>
    </main>
  );
}
