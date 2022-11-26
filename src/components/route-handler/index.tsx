import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import Home from "../../pages";
import Login from "../../pages/login";
import ReportIndex from "../../pages/reports/index";
import ReportView from "../../pages/reports/view";
import ReportPrint from "../../pages/reports/print";
import ReportRemove from "../../pages/reports/remove";
import ReportUpsert from "../../pages/reports/upsert-report";
import ReportCompare from "../../pages/reports/compare";

import ReviewIndex from "../../pages/reviews/index";
// import ProtectedRoute, { ProtectedRouteProps } from "./route-guard";
// import Loader from "../shared/loader";
import { getDocumentByIdAPI } from "../api/index";
import { AppContext } from "../context/app-context";

const isAuthenticated = () => {
  if (!localStorage.getItem("user_access_token")) {
    localStorage.clear();
    return (window.location.href = "/login");
  }
};

const routeBuilder = (appContext) => {
  // for loaders to use
  const routes: object = {
    unAuthenticatedRoutes: [
      {
        element: <Login />,
        path: "/login",
        loader: async () => {
          if (!!localStorage.getItem("user_access_token")) {
            return (window.location.href = "/");
          }
        },
      },
    ],
    DashBaordRoute: [
      {
        element: <Home />,
        path: "",
        loader: async () => {
          isAuthenticated();
        },
      },
    ],
    reportRoute: [
      {
        element: <ReportIndex />,
        path: "/report",
        loader: async () => {
          isAuthenticated();
        },
      },
      {
        element: <ReportUpsert />,
        path: "report-add",
        loader: async () => {
          isAuthenticated();
        },
      },
      {
        // it renders this element
        element: <ReportView />,

        // when the URL matches this segment
        path: "/report/view/:id",

        // with this data loaded before rendering
        // loader: async ({ params }: { params: { id: string | number } }) => {
        //   const { id } = params;
        //   try {
        //     const result = await getDocumentByIdAPI(id);
        //     return result?.data?.result;
        //   } catch (err) {
        //     console.log({ err });
        //   }
        // },
        children: [
          // {
          //   element: <ReportRemove />,
          //   path: "remove",
          // },
        ],
      },
      {
        element: <ReportCompare />,
        path: "/report/view/:id/compare/:historyId",
        loader: async () => {
          isAuthenticated();
        },
      },
      {
        element: <ReportUpsert />,
        path: "/report/view/:id/edit",
        loader: async () => {
          isAuthenticated();
        },
      },
      {
        element: <ReportRemove />,
        path: "/report/view/:id/remove",
        loader: async () => {
          isAuthenticated();
        },
      },
      {
        element: <ReportPrint />,
        path: "/report/view/:id/print",
        loader: async () => {
          isAuthenticated();
        },
      },
    ],
    reviewRoute: [
      {
        element: <ReviewIndex />,
        path: "/review",
        loader: async () => {
          isAuthenticated();
        },
      },
    ],
  };

  // turn object to compiled array
  const finalRoute = Object.keys(routes).reduce((compileRoute, key) => {
    return compileRoute.concat(routes[key]);
  }, []);

  // return router
  return createBrowserRouter(finalRoute);
};

export default () => {
  const context = useContext(AppContext);
  // console.log({ context });
  return <RouterProvider router={routeBuilder(context)} />;
};

// export default () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute
//                 {...defaultProtectedRouteProps}
//                 outlet={<Home />}
//               />
//             }
//           />
//           <Route
//             path="/report"
//             element={
//               <ProtectedRoute
//                 {...defaultProtectedRouteProps}
//                 outlet={<ReportIndex />}
//               />
//             }
//           />
//           <Route
//             path="/report-add"
//             element={
//               <ProtectedRoute
//                 {...defaultProtectedRouteProps}
//                 outlet={<ReportAdd />}
//               />
//             }
//           />
//           <Route
//             path="/report/view/:id/*"
//             element={
//               <ProtectedRoute
//                 {...defaultProtectedRouteProps}
//                 outlet={<ReportView />}
//               />
//             }
//           />
//           <Route
//             path="/report/view/:id/remove"
//             element={
//               <ProtectedRoute
//                 {...defaultProtectedRouteProps}
//                 outlet={<ReportRemove />}
//               />
//             }
//           />
//         </Route>
//         <Route path="login" element={<Login />} />
//         <Route path="/report/view/:id/print" element={<ReportPrint />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };
