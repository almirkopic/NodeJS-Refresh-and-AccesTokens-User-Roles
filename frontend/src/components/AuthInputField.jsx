const InputField = ({ id, type, label, autoComplete, placeholder }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      id={id}
      type={type}
      name={id}
      required
      className="form-control"
      autoComplete={autoComplete}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
