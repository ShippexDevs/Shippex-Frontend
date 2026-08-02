import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({
    value,
    onChange,
    placeholder = "Enter password",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">

            <input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

        </div>
    );
};

export default PasswordInput;