import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import List from "./reports/list";

export default function () {
  return (
    <Container fluid>
      <Row>
        <Col>This is Home</Col>
      </Row>
      <Row>
        <Col>
          <List />
        </Col>
      </Row>
    </Container>
  );
}
