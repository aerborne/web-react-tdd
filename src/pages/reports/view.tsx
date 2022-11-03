import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocumentByIdAPI } from "../../components/api/index";

export default () => {
  const { id } = useParams();
  const [document, setDocument] = useState();
  useEffect(() => {
    const fetchAPI = async () => {
      console.log({ id });
      const result = await getDocumentByIdAPI(id);
      console.log({ result });
      if (result?.status === 200) {
        setDocument(result?.data?.result || []);
      }
    };
    fetchAPI();
  }, [setDocument]);
  return (
    <Container>
      <Row>
        <Col>Report View ID: {id}</Col>
        <Col>{JSON.stringify(document)}</Col>
      </Row>
    </Container>
  );
};
