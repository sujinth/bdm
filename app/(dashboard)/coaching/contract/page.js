"use client";
import React, { useState, useEffect } from "react";
import Styles from "../Coaching.module.scss";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Modal from "react-bootstrap/Modal";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";

const contract = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select menu");
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeContentTab, setActiveContentTab] = useState(0); // State for active contenttab index
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const options = [
    "Select menu",
    "QADG-QA Dealer Group",
    "2011112-QA Dealer 2011112",
  ];

  // Add or remove a class from the body based on the dropdown state
  useEffect(() => {
    if (isOpen) {
      setShowOverlay(true);
      document.body.classList.add("modal-open");
    } else {
      setShowOverlay(false);
      document.body.classList.remove("modal-open");
    }
    const btnClick = () => {
      // document.getElementById("addimagepopup").style.display = "block";
      var searchpopup = document.getElementById("searchboxpopup");
      if (searchpopup.style.display === "none") {
        searchpopup.style.display = "block";
      } else {
        searchpopup.style.display = "none";
      }
    };
    const cancel = () => {
      document.getElementsByClassName("imageoption").style.display = "none";
    };
    // Clean up function
    return () => {
      setShowOverlay(false);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);
  const handleNextButtonClick = () => {
    setActiveContentTab((prevIndex) => prevIndex + 1); // Show next contenttab
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    // 👇️ add class to the body element
    //document.body.classList.add('bg-salmon');

    // 👇️ toggle class on the body element
    document.body.classList.toggle("bg-dark");
  };
  return (
    <div className={Styles.bgcolor}>
      <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
        <div className={Styles.visitnamebx}>
          <div className={Styles.titlebx}>Visit Reports</div>
          <div
            className={`${Styles.bgwhite} ${Styles.pd15} ${Styles.lftmenucol} `}
          >
            <ul>
              <li>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old
              </li>
            </ul>
          </div>
        </div>
        <div className={Styles.detailbx}>
          <div className={Styles.titlebx}>Incomplete Actions</div>
          <div
            className={`${Styles.contentwhtbx} ${Styles.innercontentformbx} `}
          >
            <div
              className={Styles.contenttab}
              style={{ display: activeContentTab === 0 ? "block" : "none" }}
            >
              <div className={Styles.ftw500}>Please enter the details</div>
              <Form className="contractform">
                <Row className="mb-2 mt-4">
                  <Form.Group as={Col} md="10" className="flex labelinput">
                    <Form.Label as={Col} md="4" className={Styles.ftw500}>
                      Dealership
                    </Form.Label>
                    <div className="position-relative">
                      <div
                        className="form-select"
                        onClick={handleToggle}
                        role="button"
                        tabIndex="0"
                      >
                        {selectedOption}
                      </div>
                      <div
                        className={`custom-select-dropdown ${
                          isOpen ? "show" : ""
                        }`}
                        onBlur={() => setIsOpen(false)}
                      >
                        {options.map((option) => (
                          <div
                            key={option}
                            className="dropdown-item"
                            onClick={() => handleSelect(option)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      {showOverlay && <div className="overlay" />}
                    </div>
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Form.Group as={Col} md="10" className="flex labelinput">
                    <Form.Label as={Col} md="4" className={Styles.ftw500}>
                      Date to visit
                    </Form.Label>
                    <Form.Control
                      type="datetime-local "
                      placeholder="06/07/2024 12:00:54"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Form.Group as={Col} md="10" className="flex labelinput">
                    <Form.Label as={Col} md="4" className={Styles.ftw500}>
                      Name
                    </Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Form.Group as={Col} md="10" className="flex labelinput">
                    <Form.Label as={Col} md="4" className={Styles.ftw500}>
                      Position
                    </Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Row>
                <Row className="mb-2 primarybtnrow">
                  <Form.Group
                    as={Col}
                    md="12"
                    className="flex labelinput submitbtn"
                  >
                    <Button type="submit">Submit</Button>
                  </Form.Group>
                </Row>
                <div className={`${Styles.nextbtn} ${Styles.primarybtnrow} `}>
                  <Button type="button" onClick={handleNextButtonClick}>
                    Next
                  </Button>
                </div>
                <div className={Styles.mobbtnrow}>
                  <Form.Group
                    as={Col}
                    md="12"
                    className="flex labelinput submitbtn"
                  >
                    <Button type="submit">Submit</Button>
                  </Form.Group>
                  <div className={Styles.nextbtn}>
                    <Button type="button" onClick={handleNextButtonClick}>
                      Next
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
            <div
              className={`${Styles.contenttab} ${Styles.contentscroll} `}
              style={{ display: activeContentTab === 1 ? "block" : "none" }}
            >
              <div className={Styles.modulecontent}>
                <div>
                  <iframe
                    src="../IOT-SignedAccounts2013.pdf"
                    width="100%"
                    height="700px"
                  />
                </div>

                {/* <><img src="../coverimage.jpg" alt="" /></> */}
                <div className={Styles.modulepgnumber}> 1 of 15</div>
                {/* <><img src="../page1.jpg" alt="" /></> */}
              </div>
              <div className={Styles.footerbtnrow}>
                <div className={Styles.nextbtn}>
                  <Button
                    className={Styles.redbtn}
                    type="button"
                    onClick={handleShow}
                  >
                    Open
                  </Button>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="coachingmodalcontent"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Coaching Modules</Modal.Title>
                      <Button onClick={handleClose}>Close</Button>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <iframe
                          src="../IOT-SignedAccounts2013.pdf"
                          width="100%"
                          height="400px"
                        />
                      </div>
                    </Modal.Body>
                  </Modal>

                  <Button type="button" onClick={handleNextButtonClick}>
                    Test
                  </Button>
                </div>
              </div>
            </div>
            <div
              className={`${Styles.contenttab} ${Styles.contentscroll} ${Styles.testform} `}
              style={{ display: activeContentTab === 2 ? "block" : "none" }}
            >
              <Form className="testform">
                <Row>
                  <div className={`${Styles.formtitle} ${Styles.ftw700} `}>
                    Lorem Ipsum
                  </div>
                </Row>
                <div>
                  <div className={`${Styles.formquestions} ${Styles.ftw700} `}>
                    Lorem Ipsum
                  </div>
                  <div>
                    <Row>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-2">
                          <Form.Check
                            label="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                            name="group1"
                            type={type}
                            className="customcheckbox"
                          />
                        </div>
                      ))}
                    </Row>
                    <Row>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-2">
                          <Form.Check
                            label="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                            name="group2"
                            type={type}
                            className="customcheckbox"
                          />
                        </div>
                      ))}
                    </Row>
                    <Row>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-2">
                          <Form.Check
                            label="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                            name="group3"
                            type={type}
                            className="customcheckbox"
                          />
                        </div>
                      ))}
                    </Row>
                    <Row>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            label="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                            name="group4"
                            type={type}
                            className="customcheckbox"
                          />
                        </div>
                      ))}
                    </Row>
                  </div>
                </div>
                <div>
                  <div className={`${Styles.formquestions} ${Styles.ftw700} `}>
                    Lorem Ipsum
                  </div>
                  <div>
                    <Row>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-2">
                          <Form.Check
                            label="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                            name="group1"
                            type={type}
                            className="customcheckbox"
                          />
                        </div>
                      ))}
                    </Row>
                    <Row>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-2">
                          <Form.Check
                            label="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                            name="group2"
                            type={type}
                            className="customcheckbox"
                          />
                        </div>
                      ))}
                    </Row>
                    <Row>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-2">
                          <Form.Check
                            label="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                            name="group3"
                            type={type}
                            className="customcheckbox"
                          />
                        </div>
                      ))}
                    </Row>
                    <Row>
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            label="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                            name="group4"
                            type={type}
                            className="customcheckbox"
                          />
                        </div>
                      ))}
                    </Row>
                  </div>
                </div>
                <Row className="mb-2 mt-2 ">
                  <Form.Group
                    as={Col}
                    md="12"
                    className="flex labelinput submitbtn mobflex"
                  >
                    <Button type="submit">Submit</Button>
                    <Button
                      type="button"
                      className="nextbtn"
                      onClick={handleNextButtonClick}
                    >
                      Next
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            </div>
            <div
              className={`${Styles.contenttab} ${Styles.contentscroll} ${Styles.marksheet} `}
              style={{ display: activeContentTab === 3 ? "block" : "none" }}
            >
              <Form className="marksheetform">
                <Row>
                  <div className={Styles.formtitle}>Lorem Ipsum</div>
                </Row>
                <Table size="sm">
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>Jacob</td>
                    </tr>
                    <tr>
                      <td>Score:</td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                </Table>
                <FloatingLabel controlId="floatingTextarea2">
                  <div className={Styles.labelred}>Items discussed</div>
                  <Form.Control as="textarea" style={{ height: "150px" }} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea2">
                  <div className={Styles.labelred}>Actions agreed</div>
                  <Form.Control as="textarea" style={{ height: "150px" }} />
                </FloatingLabel>
                <div className={Styles.footerbtnrow}>
                  <Form.Group className="flex labelinput submitbtn mobflex">
                    <div className={Styles.searchbox}>
                      {["top"].map((placement) => (
                        <OverlayTrigger
                          trigger="click"
                          key={placement}
                          placement={placement}
                          overlay={
                            <Popover id={`searchpopover-positioned`}>
                              <Popover.Body>
                                <div
                                  className={`${Styles.flex} ${Styles.addsearchrow} `}
                                >
                                  <div className={Styles.searchrow}>
                                    <input type="search" placeholder="Search" />
                                  </div>
                                  <button
                                    type="button"
                                    className={Styles.addbtn}
                                  >
                                    Add
                                  </button>
                                </div>
                                <div className={Styles.boxmailcontent}>
                                  <div
                                    className={`${Styles.flex} ${Styles.mailtext} `}
                                  >
                                    <div>babyruwqivrpqbhzme@cwmxc.com</div>
                                    <button>
                                      <img
                                        src="../close-border.svg"
                                        alt="close"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <Button
                            variant="secondary"
                            className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex} ${Styles.imagebtn} `}
                            onClick={handleClick}
                          >
                            {" "}
                            Add Recipients
                            <img src="../message.svg" alt="message.svg" />
                          </Button>
                        </OverlayTrigger>
                      ))}
                    </div>
                    <Button
                      type="submit"
                      className="flex imagebtn mobflex"
                      onClick={() => handleShow("contract")}
                    >
                      Submit
                      <img
                        className={Styles.bgwht}
                        src="../player.svg"
                        alt="Submit"
                      />
                    </Button>
                  </Form.Group>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default contract;
