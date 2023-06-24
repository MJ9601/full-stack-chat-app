import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function PrivateRoute() {
  const { logged } = useAuth();
  const location = useLocation();

  if (location.pathname == "/login" || location.pathname == "/register")
    return logged ? <Navigate to="/" /> : <Outlet />;
  return logged ? <Outlet /> : <Navigate to={"/login"} />;
}
