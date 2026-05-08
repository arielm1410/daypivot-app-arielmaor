import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/Inputs/InputField.jsx";
import PrimaryButton from "../components/Buttons/PrimaryButton.jsx";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="auth-shell">
      <section>
        <h1 className="brand-title">DayPivot</h1>
        <p className="subtitle">Find clarity in every decision today.</p>
      </section>

      <form className="form" onSubmit={(event) => {
        event.preventDefault();
        navigate("/dashboard");
      }}>
        <InputField label="Email Address" type="email" placeholder="your@email.com" />
        <InputField label="Password" type="password" placeholder="••••••••" />
        <PrimaryButton type="submit">Log In</PrimaryButton>
        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Don’t have an account? Register</Link>
        </div>
      </form>
    </main>
  );
}
