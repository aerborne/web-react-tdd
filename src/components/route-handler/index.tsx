import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import Home from "../../pages/Index";
import Login from "../../pages/Login";
import ProtectedRoute, { ProtectedRouteProps } from "./route-guard";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  isAuthenticated: !!localStorage.getItem("key"),
  authenticationPath: "/login",
};

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<Home />}
              />
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
