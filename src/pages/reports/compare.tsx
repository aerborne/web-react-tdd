import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getDocumentByIdAPI } from "../../components/api/index";
import reportFields from "../../components/utils/report-fields";
import Panel from "../../components/shared/panel";
import Loader from "../../components/shared/loader";
import { faPrint, faMultiply, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation, Link } from "react-router-dom";
import moment from "moment";

export default () => {
  const { id, historyId } = useParams();
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
    console.log({ document });
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
            <Col xs={12} key={field}>
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
                      console.log({ _historyId, historyId });
                      return (
                        <Row className="row-alternate" key={_historyId}>
                          <Link
                            className={`link ${
                              Number(historyId) === _historyId ? "active" : ""
                            }`}
                            to={`/report/view/${id}/compare/${_historyId}`}
                          >
                            {moment(updated_at).format("MMMM D YYYY h:mm:ss A")}
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
                icon: faMultiply,
              },
              {
                title: "Print Report",
                to: `/report/view/${id}/print`,
                icon: faPrint,
                target: "_blank",
              },
            ]}
          >
            <Row>
              <Col xs={6}>{document ? renderFields(document) : <Loader />}</Col>
              <Col xs={6} className="diff-bl">
                {!document ? (
                  <Loader />
                ) : (
                  renderFields(
                    history.reduce((prev, value) => {
                      // console.log({ valueId: value?.id, historyId, value });
                      // if (value?.id === Number(historyId)) {
                      //   const parsedValue = JSON.parse(value?.value);
                      //   console.log({ parsedValue });
                      //   return parsedValue;
                      // }

                      // return prev;

                      return value?.id === Number(historyId)
                        ? JSON.parse(value?.value)
                        : prev;
                    }, {})
                  )
                )}
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};
