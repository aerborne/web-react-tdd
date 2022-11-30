import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { useEffect, useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { getDocumentByIdAPI } from "../../components/api/index";
import Panel from "../../components/shared/panel";
import Loader from "../../components/shared/loader";
import { faPrint, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation, Link } from "react-router-dom";
import moment from "moment";
import formFields from "../../components/utils/report-fields";
import Prism from "prismjs";

export default () => {
  const { id, historyId } = useParams();
  const [document, setDocument] = useState();
  const [history, setHistory] = useState([]);

  // fetching
  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getDocumentByIdAPI(id);
      if (result?.status === 200) {
        const changes = result?.data?.history || [];
        const currentDocument = result?.data?.result || [];
        setHistory(changes);
        setDocument(currentDocument);
      }
    };
    fetchAPI();
  }, [setDocument]);

  if (!(document && history.length > 0)) {
    return <Loader />;
  }

  const versionedDocument = history.reduce((prev, value) => {
    return value?.id === Number(historyId) ? JSON.parse(value?.value) : prev;
  }, {});

  const compare = formFields.reduce((prev: object, value) => {
    let current = document[value.field];
    let versioned = versionedDocument[value.field];

    prev[value.field] = {
      current,
      versioned,
      label: value.label,
    };
    return prev;
  }, {});

  const highlightSyntax = (str) => (
    <pre
      style={{ display: "inline" }}
      dangerouslySetInnerHTML={{
        __html: str,
        // __html: Prism.highlight(str, Prism.languages.javascript),
      }}
    />
  );

  const renderDiff = () => {
    return (Object.keys(compare) || [])
      .filter(
        (field) => !(!compare[field]?.current && !compare[field]?.versioned)
      )
      .map((field, index) => {
        return (
          <Row key={index}>
            <div className="diff-label">{compare[field]?.label || ""}</div>
            <ReactDiffViewer
              showDiffOnly={false}
              oldValue={compare[field]?.versioned || ""}
              newValue={compare[field]?.current || ""}
              splitView={true}
              renderContent={highlightSyntax}
            />
          </Row>
        );
      });
  };

  return (
    <>
      <div className="app-breadcrumb">
        <Container>
          <Row className="pt-3">
            <Col className="align-items-center">
              <Breadcrumb>
                <Breadcrumb.Item href="/report">Reports</Breadcrumb.Item>
                <Breadcrumb.Item href={`/report/view/${document?.id}`}>
                  {document?.subject}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{"Compare"}</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="my-5">
        <Row className="mb-4">
          <Col xs={12}>
            <Panel title="ChangeLog" noPadding>
              <>
                <Container className="history-log group-alternate">
                  {!document ? (
                    <Loader className="my-3" />
                  ) : (
                    history.map(
                      ({
                        updated_at,
                        id: _historyId,
                      }: {
                        updated_at: string;
                        id: string | number;
                      }) => {
                        return (
                          <Row className="row-alternate" key={_historyId}>
                            <Link
                              className={`link ${
                                Number(historyId) === _historyId ? "active" : ""
                              }`}
                              to={`/report/view/${id}/compare/${_historyId}`}
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
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Panel
              title="Compare"
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
              {/* <Row>
              <Col xs={6}>{document ? renderFields(document) : <Loader />}</Col>
              <Col xs={6} className="diff-bl">
                {!document ? <Loader /> : renderFields(diffDocument)}
              </Col>
            </Row> */}
              <Row className="mb-3">
                <Col>
                  {`Version: ${history.reduce(
                    (prev, value) =>
                      value.id == historyId
                        ? moment(value.created_at).format(
                            "MMMM D YYYY h:mm:ss A"
                          )
                        : prev,
                    ""
                  )}`}
                </Col>
                <Col>Current Version</Col>
              </Row>

              <Row>{renderDiff()}</Row>
            </Panel>
          </Col>
        </Row>
      </Container>
    </>
  );
};
