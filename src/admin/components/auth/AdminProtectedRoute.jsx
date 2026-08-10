import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
    getAdminToken,
    getAdminRole
} from "../../components/../services/tokenStorage.js";

const AdminProtectedRoute = () => {

    const location = useLocation();

    const token = getAdminToken();
    const role = getAdminRole();

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

    return <Outlet />;
};

export default AdminProtectedRoute;