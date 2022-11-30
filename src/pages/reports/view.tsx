import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getDocumentByIdAPI } from "../../components/api/index";
import reportFields from "../../components/utils/report-fields";
import Panel from "../../components/shared/panel";
import Loader from "../../components/shared/loader";
import { faPrint, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import moment from "moment";

export default () => {
  const { id } = useParams();
  const [document, setDocument] = useState();
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getDocumentByIdAPI(id);
      if (result?.status === 200) {
        setDocument(result?.data?.result || []);
        setHistory(result?.data?.history || []);
      }
    };
    fetchAPI();
  }, [setDocument]);

  const renderFields = (document: object) => {
    return reportFields
      .filter(({ field }: { field: keyof object }) => !!document[field])
      .map(
        ({
          field,
          label,
          type,
        }: {
          field: keyof object;
          label: string;
          type: string;
        }) => {
          return (
            <Col xs={12}>
              <div key={field} className="report-group mb-3">
                <label>{label}</label>
                {type === "text" ? (
                  <div className="report-field">{document[field]}</div>
                ) : (
                  <div
                    className="report-field"
                    dangerouslySetInnerHTML={{ __html: document[field] }}
                  />
                )}
              </div>
            </Col>
          );
        }
      );
  };
  return (
    <>
      <div className="app-breadcrumb">
        <Container>
          <Row className="pt-3">
            <Col className="align-items-center">
              <Breadcrumb>
                <Breadcrumb.Item href="/report">Reports</Breadcrumb.Item>
                <Breadcrumb.Item active>{document?.subject}</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="my-5">
        <Row>
          <Col xs={12} lg={8} className="mb-3">
            <Panel
              title="Report Details"
              panelOptions={[
                {
                  title: "Update Report",
                  to: `/report/view/${id}/edit`,
                  icon: faEdit,
                },
                {
                  title: "Remove Report",
                  to: `/report/view/${id}/remove`,
                  icon: faTrash,
                },
                {
                  title: "Print Report",
                  to: `/report/view/${id}/print`,
                  icon: faPrint,
                  target: "_blank",
                },
              ]}
            >
              {document ? <Row>{renderFields(document)}</Row> : <Loader />}
            </Panel>
          </Col>
          <Col xs={12} lg={4}>
            {history.length > 0 && (
              <Panel title="ChangeLog" noPadding>
                <>
                  <Container className="group-alternate">
                    {!document ? (
                      <Loader className="my-3" />
                    ) : (
                      history.map(
                        ({
                          updated_at,
                          id: historyId,
                        }: {
                          updated_at: string;
                          id: string | number;
                        }) => {
                          return (
                            <Row className="row-alternate" key={historyId}>
                              <Link
                                className="link"
                                to={`/report/view/${id}/compare/${historyId}`}
                              >
                                {moment(updated_at).format(
                                  "MMMM D YYYY h:mm:ss A"
                                )}
                              </Link>
                            </Row>
                          );
                        }
                      )
                    )}
                  </Container>
                </>
              </Panel>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
