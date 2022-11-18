import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import KebabSVG from "../../assets/kebab.svg";

interface Props {
  title: String;
  target: String;
  children: JSX.Element | String;
  noPadding?: boolean;
  panelOptions: object[];
}

export default (props: Props) => {
  return (
    <div className="panel">
      <div className="panel-title">
        <div>{props.title}</div>
        <div className="panel-options">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <img src={KebabSVG} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {(props.panelOptions || []).length > 0 &&
                (props.panelOptions || []).map((panelOption) => {
                  if (panelOption?.target === "_blank") {
                    return (
                      <Dropdown.Item key={panelOption.to}>
                        <Link key={panelOption.to} to={panelOption.to}>
                          <span className="mr-1">
                            <FontAwesomeIcon icon={panelOption.icon} />
                          </span>
                          {panelOption.title}
                        </Link>
                      </Dropdown.Item>
                    );
                  }
                  return (
                    <Dropdown.Item key={panelOption.to}>
                      <Link key={panelOption.to} to={panelOption.to}>
                        <span className="mr-1">
                          <FontAwesomeIcon icon={panelOption.icon} />
                        </span>
                        {panelOption.title}
                      </Link>
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className={`panel-body ${!!props.noPadding ? "p-0" : ""}`}>
        {props.children}
      </div>
    </div>
  );
};
