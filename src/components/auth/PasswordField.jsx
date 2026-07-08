import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordField({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="space-y-2">

      <label className="block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="relative">

        <input
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`
            w-full
            rounded-2xl
            border
            bg-white
            px-4
            py-3
            pr-12
            outline-none
            transition
            ${
              error
                ? "border-red-400"
                : "border-slate-300"
            }
          `}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>

      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default PasswordField;