import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocumentByIdAPI } from "../../components/api/index";
import reportFields from "../../components/utils/report-fields";
import Panel from "../../components/shared/panel";
import Loader from "../../components/shared/loader";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

export default () => {
  const { id } = useParams();
  const [document, setDocument] = useState();
  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getDocumentByIdAPI(id);
      if (result?.status === 200) {
        setDocument(result?.data?.result || []);
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
    <Container className="mt-5">
      <Panel
        title="Report Details"
        panelOptions={[
          {
            title: "Print Report",
            to: `/report/view/${id}/print`,
            icon: faPrint,
          },
        ]}
      >
        {document ? <Row>{renderFields(document)}</Row> : <Loader />}
      </Panel>
    </Container>
  );
};
