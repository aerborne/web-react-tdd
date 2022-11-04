import { Outlet } from "react-router-dom";
import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import Header from "./shared/header";
// type Props = {
//   children: JSX.Element;
// };

export default () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  );
};
