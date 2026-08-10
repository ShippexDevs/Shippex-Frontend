import { useNavigate } from "react-router-dom";
import { clearAdminAuth } from "../services/tokenStorage.js";

const AdminHomePage = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        clearAdminAuth();

        navigate("/admin/login", {
            replace: true
        });
    };

    return (
        <div>
            <h1>Admin Home</h1>

            <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white"
            >
                Logout
            </button>
        </div>
    );
};

export default AdminHomePage;