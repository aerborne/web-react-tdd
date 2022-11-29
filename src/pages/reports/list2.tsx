import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Col, Row, Dropdown } from "react-bootstrap";
import { getDocumentQueryAPI } from "../../components/api/index";
import { FontAwesomeIcon, IconProp } from "@fortawesome/react-fontawesome";
import KebabSVG from "../../assets/kebab.svg";
import {
  faEdit,
  faMultiply,
  faPrint,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const payload = {};
      const result = await getDocumentQueryAPI(payload);
      if (result?.status === 200) {
        const documents = result?.data?.results?.data || [];
        setData(documents);
      }
    };

    fetchAPI();
  }, []);

  const renderCard = () => {
    return data.map((document, index) => {
      const panelOptions = [
        {
          title: "Update Report",
          to: `/report/view/${document?.id}/edit`,
          icon: faEdit,
        },
        {
          title: "Remove Report",
          to: `/report/view/${document?.id}/remove`,
          icon: faMultiply,
        },
        {
          title: "Print Report",
          to: `/report/view/${document?.id}/print`,
          icon: faPrint,
          target: "_blank",
        },
      ];
      return (
        <Col xs={12} sm={6} xl={4} key={index}>
          <Row className="document-card">
            <Col>
              <Link className="no-link" to={`/report/view/${document?.id}`}>
                <div className="card-subject">{document.subject}</div>
                <div className="card-date">
                  {moment(document?.created_at).format("MMMM D YYYY, h:mm a")}
                </div>
                <div className="card-author">
                  Author: {document?.user?.first_name}
                </div>
              </Link>
            </Col>
            <Col xs={2} className="card-dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  variant="gray"
                  className="kebab-dropdown"
                  id="dropdown-basic"
                >
                  <img src={KebabSVG} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {(panelOptions || []).length > 0 &&
                    (panelOptions || []).map((panelOption) => {
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
            </Col>
          </Row>
        </Col>
      );
    });
  };
  return (
    <>
      <Row className="card-search my-3">
        <button>
          <FontAwesomeIcon className="" icon={faSearch} />
        </button>
        <input
          placeholder="Search..."
          type="text"
          className="card-search-input"
        />
      </Row>
      <Row className="card-group">{renderCard()}</Row>
    </>
  );
};
