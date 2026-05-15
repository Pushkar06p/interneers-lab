import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;

  allowedRoles: string[];
}

const RoleProtectedRoute = ({ children, allowedRoles }: Props) => {
  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  // NOT LOGGED IN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // NO ACCESS
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
