import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
    getAdminToken,
    getAdminRole,
    normalizeAdminRole
} from "../../components/../services/tokenStorage.js";

const AdminProtectedRoute = ({ requiredRole }) => {

    const location = useLocation();

    const token = getAdminToken();
    const role = normalizeAdminRole(getAdminRole());

    if (!token) {

        return (
            <Navigate
                to="/admin/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (
        role !== "ADMIN" &&
        role !== "SUPER_ADMIN"
    ) {

        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to={role === "SUPER_ADMIN" ? "/super-admin/admins" : "/admin/home"} replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;
