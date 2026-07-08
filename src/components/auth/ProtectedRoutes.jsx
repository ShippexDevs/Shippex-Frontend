import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function ProtectedRoute() {

  const { token, loading } = useAuth();

  const location = useLocation();

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0A2342] border-t-transparent"></div>

      </div>

    );

  }

  if (!token) {

    return (

      <Navigate

        to="/login"

        replace

        state={{
          from: location,
        }}

      />

    );

  }

  return <Outlet />;

}

export default ProtectedRoute;