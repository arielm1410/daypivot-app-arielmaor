export default function InputField({ label, type = "text", placeholder }) {
  return (
    <label>
      <span className="label">{label}</span>
      <input className="input" type={type} placeholder={placeholder} />
    </label>
  );
}
