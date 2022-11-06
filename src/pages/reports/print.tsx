import { Container, Row, Col } from "react-bootstrap";
import HeaderImg from "../../assets/pllo-header.png";

export default function PrintPage() {
  return (
    <div className="print-page">
      <Container>
        <Row>
          <Col>
            <img src={HeaderImg} className="header-img" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
