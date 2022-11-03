import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import Home from "../../pages/Index";
import Login from "../../pages/Login";
import ReportView from "../../pages/reports/view";
import ReportAdd from "../../pages/reports/add-report";
import ProtectedRoute, { ProtectedRouteProps } from "./route-guard";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  isAuthenticated: !!localStorage.getItem("user_access_token"),
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
          <Route
            path="/report-add"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<ReportAdd />}
              />
            }
          />
          <Route
            path="/report/view/:id"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<ReportView />}
              />
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
