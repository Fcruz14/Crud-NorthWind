import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

function Protected() {
  const auth = useAuth()

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default Protected;
