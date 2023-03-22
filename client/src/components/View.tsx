import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));

export default function View() {
  return (
    <>
      <Suspense fallback={<></>} />
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}
