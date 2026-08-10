import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PasswordInput from "../components/PasswordInput";
import { changeAdminPassword } from "../services/adminAuthApi";
import { clearAdminAuth } from "../services/tokenStorage.js";

const ChangePasswordPage = () => {

    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {

            toast.error("Please fill in all fields.");

            return;
        }

        if (newPassword !== confirmPassword) {

            toast.error(
                "New password and confirm password do not match."
            );

            return;
        }

        if (newPassword.length < 8) {

            toast.error(
                "Password must contain at least 8 characters."
            );

            return;
        }

        setLoading(true);

        try {

            /*
             * adminAxios automatically adds:
             *
             * Authorization: Bearer <adminAccessToken>
             */
            await changeAdminPassword({
                currentPassword,
                newPassword,
                confirmPassword
            });

            toast.success(
                "Password changed successfully."
            );

            /*
             * The old JWT belongs to the first-login session.
             * Clear it and force the admin to authenticate
             * again with the new password.
             */
            clearAdminAuth();

            navigate("/admin/login", {
                replace: true
            });

        } catch (error) {

            console.error(
                "Password change failed:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Unable to change password.";

            toast.error(message);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="rounded-2xl bg-white shadow-xl p-8">

                    <div className="mb-8 text-center">

                        <h1 className="text-2xl font-bold text-slate-800">
                            Change Your Password
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            You must change your temporary password
                            before continuing.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Current Password
                            </label>

                            <PasswordInput
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                New Password
                            </label>

                            <PasswordInput
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Confirm New Password
                            </label>

                            <PasswordInput
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Changing Password..."
                                : "Change Password"
                            }
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default ChangePasswordPage;