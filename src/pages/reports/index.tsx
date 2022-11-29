import { Container, Row, Col } from "react-bootstrap";
import List from "./list2";

export default function () {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <List />
        </Col>
      </Row>
    </Container>
  );
}
