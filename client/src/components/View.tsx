import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PrivateRoute from "./common/PrivateRoute";
import Home from "./pages/Home";
import { useAuthContext } from "./context/authContext";
import Loading from "./common/Loading";

// const Login = lazy(() => import("./pages/auth/Login"));
// const Signup = lazy(() => import("./pages/auth/Signup"));

export default function View() {
  const { loading, hitLim, setHitLim } = useAuthContext();
  useEffect(() => {
    if (hitLim) {
      const timer = setTimeout(() => setHitLim(false), 50000);
      return () => clearTimeout(timer);
    }
  }, [hitLim]);
  return loading ? (
    <Loading />
  ) : (
    <>
      {hitLim ? (
        <Loading msg={"20"} />
      ) : (
        <Routes>
          <Route path="/">
            <Route element={<PrivateRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Signup />} />
              <Route path="*" element={<Login />} />
              <Route path="/" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
}
