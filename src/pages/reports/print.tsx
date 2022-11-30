import { useCallback, useRef } from "react";
import HeaderImg from "../../assets/pllo-header.png";
import FooterImage from "../../assets/pllo-footer.png";
import Loader from "../../components/shared/loader";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { getDocumentByIdAPI } from "../../components/api/index";
import reportFields from "../../components/utils/report-fields";

export default function PrintPage() {
  const { id } = useParams();
  const [document, setDocument] = useState();

  const setDoc = useCallback((state) => setDocument(state), [setDocument]);

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getDocumentByIdAPI(id);
      if (result?.status === 200) {
        setDoc(result?.data?.result || []);
        setTimeout(() => {
          window.print();
        }, 500);
      }
    };
    fetchAPI();
  }, [setDoc, getDocumentByIdAPI]);

  const renderDetails = (document) => {
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
              <>
                <tr key={field}>
                  <td className="text-left print-header-label">{`${label}:`}</td>
                  <td className="px-3">{document[field]}</td>
                </tr>
              </>
            );
          }
        }
      );
  };

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
          if (
            ![
              "subject",
              "session_title",
              "session_status",
              "session_end",
              "session_resume",
            ].includes(field)
          ) {
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
        }
      );
  };

  return !!document ? (
    <>
      <div className="mx-auto my-5 print-page" id="document-print">
        <div id="section-to-print">
          <div className="page-header">
            <img src={HeaderImg} className="header-img" />
          </div>

          <div className="page-footer">
            <img src={FooterImage} className="footer-img" />
          </div>

          <table>
            <thead>
              <tr>
                <td>
                  <div className="page-header-space">
                    <img src={HeaderImg} className="header-img print-hidden" />
                  </div>
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div className="page">
                    <div className="content">
                      <table className="print-table">
                        <tbody>{renderDetails(document)}</tbody>
                      </table>
                      <div className="divider-line my-3" />
                      <div className="print-fields">
                        {renderFields(document)}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td>
                  <div className="page-footer-space">
                    <img
                      src={FooterImage}
                      className="footer-img print-hidden"
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
}
