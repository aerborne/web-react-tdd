import { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeaderImg from "../../assets/pllo-header.png";
import Loader from "../../components/shared/loader";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { getDocumentByIdAPI } from "../../components/api/index";
import reportFields from "../../components/utils/report-fields";

export default function PrintPage() {
  const { id } = useParams();
  const [document, setDocument] = useState();
  const printPageRef = useRef();

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
          console.log({ field });
          if (
            [
              "subject",
              "session_title",
              "session_status",
              "session_end",
              "session_resume",
            ].includes(field)
          ) {
            return (
              <div key={field} className="print-header mb-1">
                <div className="print-header-label">{label}:</div>
                <div className="print-header-value">{document[field]}</div>
              </div>
            );
          }
          return (
            <Fragment>
              <div key={field} className="report-group mb-1">
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
            </Fragment>
          );
        }
      );
  };

  return !!document ? (
    <div ref={printPageRef} className="print-page">
      <Container>
        {/* <Row>
          <Col xs={12}>
            <img src={HeaderImg} className="header-img" />
            {console.log({ document })}
          </Col>
        </Row> */}
        <Row>{renderFields(document)}</Row>
      </Container>
    </div>
  ) : (
    <Loader />
  );
}
