import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

    const accessToken = localStorage.getItem("accessToken");

    // If no token → redirect to login
    if (!accessToken) {
        return <Navigate to="/" replace />;
    }

    // If token exists → allow access
    return <Outlet />;
};

export default ProtectedRoute;