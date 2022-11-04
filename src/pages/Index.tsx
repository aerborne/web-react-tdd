import { Container, Row, Col } from "react-bootstrap";
import List from "./reports/list";
import Panel from "../components/shared/panel";

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
