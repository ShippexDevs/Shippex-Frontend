import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PasswordInput from "../components/PasswordInput";
import { loginAdmin } from "../services/adminAuthApi";
import { saveAdminAuth } from "../services/tokenStorage";

const AdminLoginPage = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await loginAdmin({
                username,
                password
            });

            console.log("Login Response:", response);

            saveAdminAuth(response);

            if (response.firstLogin) {

                navigate("/admin/change-password");

            } else {

                navigate("/admin/home");

            }

        } catch (error) {

            console.error(error);

            if (error.response?.data?.message) {

                setError(error.response.data.message);

            } else {

                setError("Unable to connect to server.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="rounded-2xl bg-white shadow-xl p-8">

                    <div className="mb-8 text-center">

                        

                        <h1 className="text-3xl font-bold text-slate-800">
                            Shippex Admin
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Sign in to continue
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Username
                            </label>

                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Password
                            </label>

                            <PasswordInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-100 border border-red-300 p-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
};

export default AdminLoginPage;