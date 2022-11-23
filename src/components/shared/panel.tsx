import { FontAwesomeIcon, IconProp } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import KebabSVG from "../../assets/kebab.svg";

interface Props {
  title: String;
  target: String;
  children?: JSX.Element | String;
  noPadding?: boolean;
  panelOptions: PanelOptions[];
}

interface PanelOptions {
  target?: string;
  to: string;
  title: string;
  icon?: IconProp;
}

export default (props: Props) => {
  return (
    <div className="panel">
      <div className="panel-title">
        <div>{props.title}</div>
        {(props.panelOptions || []).length > 0 && (
          <div className="panel-options">
            <Dropdown>
              <Dropdown.Toggle
                variant="gray"
                className="kebab-dropdown"
                id="dropdown-basic"
              >
                <img src={KebabSVG} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {(props.panelOptions || []).length > 0 &&
                  (props.panelOptions || []).map((panelOption) => {
                    if (panelOption?.target === "_blank") {
                      return (
                        // <div>
                        <a
                          className="dropdown-item kebab-item"
                          key={panelOption.to}
                          href={panelOption.to}
                          target="_blank"
                        >
                          <span className="mr-1">
                            <FontAwesomeIcon
                              className="kebab-option-icon"
                              icon={panelOption.icon}
                            />
                          </span>
                          {panelOption.title}
                        </a>
                        // </div>
                        // <Dropdown.Item key={panelOption.to}>

                        // </Dropdown.Item>
                      );
                    }
                    return (
                      <Link
                        className="dropdown-item kebab-item"
                        key={panelOption.to}
                        to={panelOption.to}
                      >
                        <span className="mr-1">
                          <FontAwesomeIcon
                            className="kebab-option-icon"
                            icon={panelOption.icon}
                          />
                        </span>
                        {panelOption.title}
                      </Link>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
      <div className={`panel-body ${!!props.noPadding ? "p-0" : ""}`}>
        {props.children}
      </div>
    </div>
  );
};
