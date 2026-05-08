export default function PrimaryButton({ children, onClick, type = "button", className = "", disabled = false }) {
  return (
    <button type={type} onClick={onClick} className={`primary-button ${className}`} disabled={disabled}>
      {children}
    </button>
  );
}
