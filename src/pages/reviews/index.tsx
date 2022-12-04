import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import List from "./list";

export default function () {
  return (
    <>
      <div className="app-breadcrumb">
        <Container>
          <Row className="pt-3">
            <Col className="align-items-center">
              <Breadcrumb>
                <Breadcrumb.Item href="/reviews">Reviews</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="">
        <Row>
          <Col>
            <List />
          </Col>
        </Row>
      </Container>
    </>
  );
}
