import { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Col, Row, Dropdown } from "react-bootstrap";
import { getDocumentQueryAPI } from "../../components/api/index";
import { FontAwesomeIcon, IconProp } from "@fortawesome/react-fontawesome";
import KebabSVG from "../../assets/kebab.svg";
import {
  faEdit,
  faPrint,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { SearchFormInput } from "../../types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStateWithCallback } from "../../components/utils/set-state-callback";

export default () => {
  const [data, setData] = useState([]);
  const [payload, setPayload] = useStateWithCallback({
    sortBy: "id-desc",
  });

  const fetchAPI = useCallback(async () => {
    const result = await getDocumentQueryAPI(payload);
    if (result?.status === 200) {
      const documents = result?.data?.results?.data || [];
      setData(documents);
    }
  }, [setData, payload]);
  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInput>();

  const onSearch: SubmitHandler<SearchFormInput> = async ({
    search,
  }: {
    search: string;
  }) => {
    if (!search) {
      return setPayload({ ...payload, where: [] }, () => {
        return fetchAPI();
      });
    }
    const searchParams = (input: string) => {
      return [
        {
          field: "subject",
          op: "like",
          value: `%${input}%`,
        },
      ];
    };

    setPayload({ ...payload, where: searchParams(search) });
    return fetchAPI();
  };

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
          icon: faTrash,
        },
        {
          title: "Print Report",
          to: `/report/view/${document?.id}/print`,
          icon: faPrint,
          target: "_blank",
        },
      ];
      return (
        <Col xs={12} key={index}>
          {/* <Col xs={12} sm={6} xl={4} key={index}> */}
          <div className="document-card">
            <Row className="w-100">
              <Col>
                <Link className="no-link" to={`/report/view/${document?.id}`}>
                  <div className="card-subject">{document.subject}</div>
                  <div className="card-date">
                    {moment(document?.created_at).format("MMMM D YYYY, h:mm a")}
                  </div>
                  <div className="card-author">
                    Author:{" "}
                    {`${document?.created_by?.first_name} ${document?.created_by?.last_name}`}
                  </div>
                </Link>
              </Col>
              <Col xs="auto" className="card-dropdown">
                <Dropdown className="ml-auto">
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
          </div>
        </Col>
      );
    });
  };
  return (
    <>
      <Row className="card-search my-3">
        <Col>
          <form onSubmit={handleSubmit(onSearch)} className="d-flex">
            <button type="submit" className="btn btn-gray btn-search">
              <FontAwesomeIcon className="" icon={faSearch} />
            </button>
            <input
              placeholder="Search..."
              type="text"
              className="card-search-input"
              {...register("search", {})}
            />
          </form>
        </Col>
        <Col xs="auto">
          <Link className="btn btn-teal rounded-0 ml-auto" to="/report-add">
            {"Create Report"}
          </Link>
        </Col>
      </Row>
      <Row className="card-group">{renderCard()}</Row>
    </>
  );
};
