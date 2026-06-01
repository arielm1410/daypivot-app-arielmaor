export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name
}) {
  return (
    <label>
      <span className="label">{label}</span>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </label>
  );
}