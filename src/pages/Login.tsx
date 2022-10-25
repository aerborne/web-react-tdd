import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function () {
  return (
    <Container>
      <Row>
        <Col xs={6}>test</Col>
        <Col xs={6}>
          <div className="paper">
            <div className="form-group">
              <div className="input-group">
                <label className="">Email</label>
                <input className="form-input" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
