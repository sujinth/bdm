import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import loadingimage from "../../../../public/defaultLoader.svg";

function Loader() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <Image
            src={loadingimage}
            width="120"
            height="120"
            alt="Loader Image"
            priority="high"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Loader;
