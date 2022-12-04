import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import Home from "../../pages/Index";
import Login from "../../pages/Login";
import ReportIndex from "../../pages/reports/index";
import ReportRemove from "../../pages/reports/remove";
import ReportView from "../../pages/reports/view";
import ReportCompare from "../../pages/reports/compare";
import ReportPrint from "../../pages/reports/print";
import ReportUpsert from "../../pages/reports/upsert-report";
import ProtectedRoute, { ProtectedRouteProps } from "./route-guard";

import ReviewIndex from "../../pages/reviews/index";

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
                outlet={<Home />}
              />
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<ReportIndex />}
              />
            }
          />
          <Route
            path="/report-add"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<ReportUpsert />}
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
          <Route
            path="/report/view/:id/edit"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<ReportUpsert />}
              />
            }
          />
          <Route
            path="/report/view/:id/print"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<ReportPrint />}
              />
            }
          />
          <Route
            path="/report/view/:id/remove"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<ReportRemove />}
              />
            }
          />
          <Route
            path="/report/view/:id/compare/:historyId"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<ReportCompare />}
              />
            }
          />
          <Route
            path="/review"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<ReviewIndex />}
              />
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
        {/* <Route path="/report/view/:id/print" element={<ReportPrint />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
