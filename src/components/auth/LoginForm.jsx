import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import InputField from "./InputField";
import PasswordField from "./PasswordField";

import { validateLoginForm } from "../../utils/loginValidation";
import { login } from "../../features/auth/services/loginService";
import { saveToken } from "../../utils/tokenStorage";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";


function LoginForm() {

    const navigate = useNavigate();

    const location = useLocation();

    const redirectTo =
        location.state?.from?.pathname || "/";

    const { login: authenticateUser } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: value,
        }));

        setErrors(previous => ({
            ...previous,
            [name]: "",
        }));
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const validationErrors =
            validateLoginForm(formData);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setLoading(true);

        const result = await login(formData);

        setLoading(false);

        if (!result.success) {

            toast.error(result.message);

            return;

        }

        const authenticated =
            await authenticateUser(
                result.data.accessToken
            );

        if (!authenticated) {

            toast.error(
                "Unable to restore your session."
            );

            return;

        }

        toast.success(
            `Welcome back ${result.data.name}!`
        );

        navigate(
            redirectTo,
            {
                replace: true,
            }
        );

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-md space-y-5"
        >

            <InputField
                label="Username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
            />

            <PasswordField
                label="Password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />

            <button
                type="submit"
                disabled={loading}
                className="
          w-full
          rounded-2xl
          bg-[#0A2342]
          py-4
          font-semibold
          text-white
          disabled:bg-slate-400
        "
            >
                {loading ? "Signing In..." : "Login"}
            </button>

            <p className="text-center text-sm text-slate-600">

                Don't have an account?{" "}

                <Link
                    to="/register"
                    className="font-semibold text-[#0F6E8C]"
                >
                    Register
                </Link>

            </p>

        </form>

    );

}

export default LoginForm;