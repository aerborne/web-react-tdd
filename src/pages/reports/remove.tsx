import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  getDocumentByIdAPI,
  deleteDocumentByIdAPI,
} from "../../components/api/index";
import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import Loader from "../../components/shared/loader";

export default (props) => {
  const { id } = useParams();
  console.log({ id, props });
  const navigate = useNavigate();
  const [document, setDocument] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getDocumentByIdAPI(id);
      if (result?.status === 200) {
        setDocument(result?.data?.result || []);
      }
    };
    console.log("REPEAT?");
    fetchAPI();
  }, [setDocument]);

  const handleClose = () => {
    navigate("/report");
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteDocumentByIdAPI(id);
    setLoading(false);
    handleClose();
  };
  return (
    <Modal title="Remove Report" show onHide={handleClose}>
      {/* <Modal.Dialog> */}
      <Modal.Header closeButton>
        <Modal.Title>Remove Report</Modal.Title>
      </Modal.Header>
      {document ? (
        <>
          <Modal.Body>
            <div>
              Remove Document -{" "}
              <span className="font-weight-bold">{document?.subject}</span>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              disabled={loading}
              onClick={() => handleClose()}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="danger"
              onClick={() => handleDelete()}
            >
              {loading ? "Loading..." : `Remove Document`}
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <div className="my-3">
          <Loader />
        </div>
      )}
      {/* </Modal.Dialog> */}
    </Modal>
  );
};
