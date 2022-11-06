import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
interface Props {
  title: String;
  children: JSX.Element | String;
  noPadding: boolean;
  panelOptions: object[];
}

export default (props: Props) => {
  return (
    <div className="panel">
      <div className="panel-title">
        <div>{props.title}</div>
        <div className="panel-options">
          {(props.panelOptions || []).length > 0 &&
            (props.panelOptions || []).map((panelOption) => {
              return (
                <Link key={panelOption.to} to={panelOption.to}>
                  {panelOption.icon && (
                    <span className="mr-1">
                      <FontAwesomeIcon icon={panelOption.icon} />
                    </span>
                  )}
                  {panelOption.title}
                </Link>
              );
            })}
        </div>
      </div>
      <div className={`panel-body ${!!props.noPadding ? "p-0" : ""}`}>
        {props.children}
      </div>
    </div>
  );
};
