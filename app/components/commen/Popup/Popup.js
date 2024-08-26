//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                              File for popup component                        //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////

"use client";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { usePopupContent } from "@/app/contexts/popupContext";
// Style
import Styles from "./Popup.module.scss";

// Function for popup component
const Popup = () => {
  const { popupContent } = usePopupContent();

  return (
    <>
      <Modal
        show={popupContent.show}
        onHide={popupContent.onClick}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className={Styles.modalbodywrap}>
          <div id="readmore">
            <div>
              <div>
                <b>{popupContent.titleContent}</b>
                <p>{popupContent.detailContent}</p>
              </div>
            </div>
          </div>
          <Row>
            {popupContent.duelOption && (
              <>
                <Col>
                  <button type="button" className={Styles.modalbutton} onClick={popupContent.onClickYes}>
                    Yes
                  </button>{" "}
                </Col>
                <Col>
                  <button
                    type="button"
                    className={Styles.modalbutton}
                    onClick={popupContent.onClickNo}
                  >
                    No
                  </button>
                </Col>
              </>
            )}
            {!popupContent.duelOption && (
              <>
                <Col>
                  <button
                    type="button"
                    className={Styles.modalOkButton}
                    onClick={popupContent.onClick}
                  >
                    OK
                  </button>
                </Col>
              </>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Popup;
