import { useCallback, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeaderImg from "../../assets/pllo-header.png";
import Loader from "../../components/shared/loader";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { getDocumentByIdAPI } from "../../components/api/index";
import reportFields from "../../components/utils/report-fields";
import html2pdf from "html2pdf-jspdf2";
import html2canvas from "html2canvas";

export default function PrintPage() {
  const { id } = useParams();
  const [document, setDocument] = useState();
  const canvassRef = useRef([]);

  // const renderPages = () => {
  //   return pages.map((page, index) => {
  //     return (
  //       <div className="print-tb-margin">
  //         <img
  //           ref={(el) => (canvassRef.current[index] = el)}
  //           className="print-img"
  //           src={page}
  //         />
  //       </div>
  //     );
  //   });
  // };

  const setDoc = useCallback((state) => setDocument(state), [setDocument]);
  const printPageRef = useRef();

  const convertToPDF = useCallback(() => {
    const element = window.document.getElementById("document-print");
    if (element && document) {
      const worker = html2pdf()
        .from(element)
        .save(`${document?.subject || ""}`.split(" ").join(""));
    }
    console.log({ element });
  }, [html2pdf]);

  const convertToImage = async () => {
    const element = window.document.getElementById("document-print");
    if (element) {
      const canvas = await html2canvas(element);
      const originalCTX = canvas.getContext("2d");
      const imageData = canvas.toDataURL("image/png", 1);
      const printCanvass = window.document.getElementById("print-canvas");
      if (printCanvass) {
        const originalHeight = element.clientHeight;
        const originalWidth = element.clientWidth;
        const pageHeight = 930.52;
        const pageHeightPadded = 1122.52;
        const ratio = Math.ceil(originalHeight / 738.52);
        const OverallHeight = pageHeightPadded * ratio;
        printCanvass.width = element.clientWidth;
        printCanvass.height = element.clientHeight;
        const ctx = printCanvass.getContext("2d");
        // const img = new Image();
        // img.src = imageData;
        // img.onload = () => {
        //   ctx.drawImage(img, 0, 0);
        // };

        // pageHeight minus the padding top and bottom     297mm - 101.6mm = 195.4mm === 738.520 px
        printCanvass.height = pageHeightPadded * ratio;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, originalWidth, OverallHeight);
        let counter = 0;
        const images = [];

        while (counter < ratio) {
          let imageData = originalCTX.getImageData(
            0,
            pageHeight * counter,
            originalWidth,
            pageHeight
          );
          images.push(imageData);
          counter += 1;
        }

        images.map((image, index) => {
          let offsetY = index * pageHeight + (index === 0 ? 96 : 192);
          console.log({ offsetY, image });
          ctx.putImageData(image, 0, offsetY);
        });
        console.log({ canvas, imageData, images });
      }

      // toPng(element).then(function (dataUrl) {
      //   console.log({ dataUrl });
      //   console.log({ myCanvas });
      //   if (myCanvas) {
      //     myCanvas.width = element.clientWidth;
      //     myCanvas.height = element.clientHeight;
      //     const ctx = myCanvas.getContext("2d");
      //     const img = new Image();
      //     img.src = dataUrl;
      //     img.onload = () => {
      //       ctx.drawImage(img, 0, 0);
      //     };

      //     const originalHeight = element.clientHeight;
      //     const originalWidth = element.clientWidth;
      //     // pageHeight minus the padding top and bottom     297mm - 101.6mm = 195.4mm === 738.520 px
      //     const pageHeight = 738.52;
      //     const pageHeightPadded = 1122.52;
      //     const ratio = Math.ceil(originalHeight / 738.52);
      //     let counter = 0;
      //     const images = [];

      //     while (counter < ratio) {
      //       let imageData = ctx.getImageData(
      //         0,
      //         pageHeight * counter,
      //         originalWidth,
      //         pageHeight
      //       );
      //       images.push(imageData);
      //       counter += 1;
      //     }
      //     ctx.clearRect(0, 0, originalWidth, originalWidth);
      //     myCanvas.height = pageHeightPadded * ratio;
      //     ctx.fillStyle = "#fff";
      //     ctx.fillRect(0, 0, originalWidth, pageHeightPadded * ratio);

      //     ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      //     console.log({ originalHeight, newHeight: pageHeightPadded * ratio });

      //     console.log({ images });
      //     // images.map((image, index) => {
      //     //   let offsetY = index * pageHeight + (index === 0 ? 96 : 192);
      //     //   console.log({ offsetY, image });
      //     //   ctx.putImageData(image, 0, offsetY);
      //     // });
      //   }
      // });
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getDocumentByIdAPI(id);
      if (result?.status === 200) {
        setDoc(result?.data?.result || []);
        setTimeout(() => {
          window.print();
        });
        // convertToPDF();
        // convertToImage();
      }
    };
    fetchAPI();
  }, [setDoc, getDocumentByIdAPI, convertToPDF]);

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
                  <td className="text-left print-header-label">{label}:</td>
                  {/* <td>:</td> */}
                  <td>{document[field]}</td>
                </tr>
              </>
            );
            // return (
            //   <div key={field} className="print-header mb-1">
            //     <div className="print-header-label">{label}:</div>
            //     <div className="print-header-value">{document[field]}</div>
            //   </div>
            // );
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
      <div
        ref={printPageRef}
        className="mx-auto my-5 print-page"
        id="document-print"
      >
        <div id="section-to-print">
          {/* <Row>
          <Col xs={12}>
            <img src={HeaderImg} className="header-img" />
            {console.log({ document })}
          </Col>
        </Row> */}
          <table className="print-table">
            <tbody>{renderDetails(document)}</tbody>
          </table>
          <div className="divider-line my-4" />
          <Row>{renderFields(document)}</Row>
        </div>
      </div>
      {/* <canvas id="print-canvas"></canvas>
      <canvas id="print-canvas2"></canvas> */}
      {/* {renderPages()} */}
    </>
  ) : (
    <Loader />
  );
}
