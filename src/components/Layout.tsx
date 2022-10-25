import { Outlet } from "react-router-dom";

// type Props = {
//   children: JSX.Element;
// };

export default () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};
