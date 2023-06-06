import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PrivateRoute from "./common/PrivateRoute";
import Home from "./pages/Home";
import { useAuth } from "./context/authContext";
import Loading from "./common/Loading";

// const Login = lazy(() => import("./pages/auth/Login"));
// const Signup = lazy(() => import("./pages/auth/Signup"));

export default function View() {
  const { logged } = useAuth();
  return logged == null ? (
    <Loading />
  ) : (
    <>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route path="*" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
