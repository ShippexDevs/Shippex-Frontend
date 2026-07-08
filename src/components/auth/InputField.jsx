function InputField({
  label,
  name,
  required = false,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
}) {
  return (
    <div className="space-y-2">

      <label className="block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        className={`
          w-full
          rounded-2xl
          border
          bg-white
          px-4
          py-3
          outline-none
          transition
          focus:ring-2
          disabled:bg-slate-100
          ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
              : "border-slate-300 focus:border-[#0F6E8C] focus:ring-cyan-100"
          }
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default InputField;