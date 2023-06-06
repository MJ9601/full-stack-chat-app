import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function PrivateRoute() {
  const { logged } = useAuth();
  return logged ? <Outlet /> : <Navigate to={"/login"} />;
}
