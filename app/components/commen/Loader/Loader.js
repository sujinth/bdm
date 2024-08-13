import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import loadingimage from "../../../../public/defaultLoader.svg";

function Loader() {
  return (
    <Container>
      <Row>
        <Col classNAme="text-center">
          <Image
            src={loadingimage}
            width="250"
            height="250"
            alt="Loader Image"
            priority="high"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Loader;
