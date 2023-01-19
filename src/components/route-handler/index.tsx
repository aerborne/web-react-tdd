import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute, { ProtectedRouteProps } from "./route-guard";

const Login = lazy(() => import("../../pages/login"));
const Dashboard = lazy(() => import("../../pages/index"));
const Layout = lazy(() => import("../Layout"));

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  isAuthenticated: !!localStorage.getItem("user_access_token"),
  authenticationPath: "/login",
};

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" outlet={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<Dashboard />}
              />
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
