//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                      File for showing resources module                       //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////


"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ExcelViewer from "./ExcelViewer";
import Wordviewer from "./WordViewer";
import Styles from "../resources.module.scss";

// Default function for resource module
const AddonProducts = () => {
  const session = useSession();
  const params = useParams();
  const [show, setShow] = useState(false);
  const resourceId = params.id;
  const [resourcesList, setResourcesList] = useState([]);
  const [activeModule, setActiveModule] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeTabContent, setActiveTabContent] = useState("");
  const [eventKey, setEventKey] = useState(1);
  const [showPopover1, setShowPopover1] = useState(false);
  const [showPopover2, setShowPopover2] = useState(false);
  const [showPopover3, setShowPopover3] = useState(false);
  const [showPopover4, setShowPopover4] = useState(false);
  const [showPopover5, setShowPopover5] = useState(false);
  const [showPopover6, setShowPopover6] = useState(false);
  const [showModalOnLoad, setShowModalOnLoad] = useState(false);
  const [moduleStatus, setModuleStatus] = useState({
    contract: false,
    customerOpt: false,
    customerOptin: false,
    productknowledge: false,
    testModule: false,
  });
  const [selectedModuleData, setSelectedModule] = useState({});

  useEffect(() => {
    getResources();
  }, [session]);

  useEffect(() => {
    if (resources.filterChildResources.length !== 0) {
      setSelectedModule(resources.filterChildResources[0]);
    }
  }, []);

  const resources = useMemo(() => {
    if (resourceId) {
      const filterParentResources = resourcesList?.filter(
        (item) => item.id === resourceId && item?.type === "resourcelist"
      );
      const filterChildResources = resourcesList?.filter(
        (item) => item.parentid === resourceId
      );
      return { filterParentResources, filterChildResources };
    }
    return { filterParentResources: [], filterChildResources: [] };
  }, [resourceId, resourcesList]);


  let file = useMemo(() => {
    return {
      name: selectedModuleData.name,
      path: selectedModuleData.path,
    };
  }, [selectedModuleData]);

    
  const handleClose = (status) => {
    setShow(false);
    setModuleStatus((prev) => ({ ...prev, [activeModule]: status }));
  };

  const handleShow = (modulename) => {
    setShow(true);
    setActiveModule(modulename);
  };
  
  async function getResources() {
    try {
      let userId = session.data?.user?.id;
      if (!userId) {
        throw new Error("Something went wrong");
      }
      const response = await axios.post("/api/resorces", { userId });
      if (response.data.result?.length !== 0) {
        setResourcesList(response.data?.result);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // Function for open view modal
  const handleOpenModal = (contentKey) => {
    const contentMap = {
      eventKey1: (
        <iframe
          src="https://192.168.200.6:11443/~sangeeth/santenderbdm/sysimgdocs/docs/027-Digital-Opt-in-aid_rs474_1.pdf"
          width="100%"
          height="700px"
        />
      ),
      // Add more keys and corresponding content as needed
    };
    setActiveTabContent(contentMap[`eventKey${contentKey}`]);
    setShowModal(true);
  };

  const handleTogglePopover = (setShowPopover, showPopover) => () =>
    setShowPopover(!showPopover);


  const handleCloseModal = () => setShowModalOnLoad(false);

  const selectedModule = (item, idx) => {
    setEventKey(idx);
    setSelectedModule(item);
  };

  return (
    <>
      <Modal
        size="sm"
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modalbox modalendbtn"
      >
        <Modal.Body>
          <div className={Styles.modaltitle}>Lorem Ipsum</div>
          <div className={Styles.modalbodycntnt}>
            <p>Are you sure?</p>
            <p>Note: Document stored offline within the app will be removed.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={() => handleClose(true)}>
            Yes
          </Button>
          <Button type="submit" onClick={() => handleClose(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={Styles.bgcolor}>
        <div
          className={`${Styles.container} ${Styles.innerpgcntnt} ${Styles.innerpgtab}`}
        >
          <Tab.Container id="left-tabs-example" defaultActiveKey={1}>
            <Row className="tabrow">
              <Col className="visitnamebx">
                <div className={Styles.titlebx}>
                  {resources.filterParentResources?.[0]?.name}
                </div>
                <div className={Styles.listitems}>
                  <ul
                    className={`${Styles.listcntnt} ${Styles.listiconhide} ${Styles.tablist}`}
                  >
                    <li className={Styles.listhead}>
                      <span>Module Name</span>
                      {/* <span>Available offline</span> */}
                    </li>
                  </ul>
                  
                  {resources.filterChildResources?.length > 0 && (
                    <Nav variant="pills" className="flex-column flex-nowrap">
                      {resources.filterChildResources.map((item, idx) => (
                        <Nav.Item key={idx} className={Styles.lfttabs}>
                          <Nav.Link
                            eventKey={idx + 1}
                            onClick={() => selectedModule(item, idx + 1)}
                          >
                            <span className={Styles.tabmenu}>{item.name}</span>
                            {item.doctype === "pdf" && (
                              <span>
                                <img src="/pdf.svg" alt="pdf" />
                              </span>
                            )}
                            {item.doctype === "Word Document" && (
                              <span>
                                <img src="/word.svg" alt="word" />
                              </span>
                            )}
                            {item.doctype === "excel" && (
                              <span>
                                <img src="/excel.svg" alt="excel" />
                              </span>
                            )}
                            {/* <Button
                              type="button"
                              onClick={() => handleShow("contract")}
                            >
                              {item.offlineavailability === "on" ? "Yes" : "No"}
                            </Button> */}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  )}
                </div>
              </Col>
              <Col className="detailbx">
                <div className={Styles.titlebx}>Details</div>
                <Tab.Content className="tabcontentbox">
                  {selectedModuleData &&
                    Object.keys(selectedModuleData).length !== 0 && (
                      <Tab.Pane eventKey={eventKey}>
                        <div
                          className={`${Styles.contentwhtbx} ${Styles.innercontentwhtbx} ${Styles.innertabwhtbx}`}
                        >
                          <div className={Styles.tabcontainer}>

                            {selectedModuleData.doctype === "pdf" && (
                              <iframe
                                src={selectedModuleData.path}
                                style={{
                                  width: "100%",
                                  height: "600px",
                                  border: "none",
                                }}
                                frameBorder="0"
                              ></iframe>
                            )}

                            {selectedModuleData.doctype === "excel" && (
                              <ExcelViewer file={file} />
                            )}

                            {selectedModuleData.doctype === "Word Document" && (
                              // <ExcelViewer files={[{ name: selectedModuleData.name, path: selectedModuleData.path }]} />
                              // <Wordviewer files={[
                              //     { name: 'File2', path: 'https://192.168.200.6:11443/~sangeeth/santenderbdm/sysimgdocs/docs/Expected-Gift-Card-1-_rs5_1.docx' }
                              // ]} />
                              <iframe
                                src={selectedModuleData.path}
                                width="100%"
                                height="600px"
                                frameBorder="0"
                              ></iframe>
                            )}
                            
                          </div>
                        </div>
                        <div className={Styles.footerbtns}>
                          <button
                            className={Styles.footerredbtns}
                            onClick={() => handleOpenModal(eventKey)}
                          >
                            Download
                          </button>
                         
                        </div>
                      </Tab.Pane>
                    )}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>{activeTabContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalOnLoad} centered className="offlinemodal">
        <Modal.Body>Please make the document available offline.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddonProducts;
