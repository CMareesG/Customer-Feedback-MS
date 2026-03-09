import { Navigate, Outlet } from "react-router-dom";
 
interface ProtectedRouteProps {
  allowedRoles?: string[];
}
 
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");
 
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }
 
  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/" replace />;
  }
 
  return <Outlet />;
};
 
export default ProtectedRoute;