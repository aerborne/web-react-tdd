// import { Outlet } from "react-router-dom";
import Header from "./shared/header";
import LineLoader from "./shared/loader-line";
import { AppContext } from "./context/app-context";
import { Fragment, useContext, useEffect, useState } from "react";
import ContextFeeder from "./context/index";

export default ({ children }: { children: JSX.Element }) => {
  return (
    <div className="layout">
      <Header />
      {/* {loading?.current && <LineLoader />} */}
      {/* <ConditionalLoading /> */}
      {children}
      {/* <Outlet /> */}
    </div>
  );
};

// const ConditionalLoading = () => {
//   const { loading } = useContext(AppContext);

//   console.log({ loading });
//   return loading ? <LineLoader /> : <></>;
// };
