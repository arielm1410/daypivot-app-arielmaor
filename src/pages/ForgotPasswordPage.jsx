import { Link } from "react-router-dom";
import InputField from "../components/Inputs/InputField.jsx";
import PrimaryButton from "../components/Buttons/PrimaryButton.jsx";

export default function ForgotPasswordPage() {
  return (
    <main className="auth-shell">
      <section>
        <h1 className="brand-title">Reset Password</h1>
        <p className="subtitle">Enter your email and we will send reset instructions.</p>
      </section>

      <form className="form">
        <InputField label="Email Address" type="email" placeholder="your@email.com" />
        <PrimaryButton>Send Reset Link</PrimaryButton>
        <div className="auth-links">
          <Link to="/">Back to Login</Link>
        </div>
      </form>
    </main>
  );
}
