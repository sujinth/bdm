"use client";
import { useState } from "react";
import Link from "next/link";
import Styles from "./Coaching.module.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Coaching = () => {
  const [key, setKey] = useState("Dealer Group");
  const [show, setShow] = useState(false);
  // Setting module status
  const [moduleStatus, setModuleStatus] = useState({
    contract: true,
    customerOpt: false,
    customerOptin: false,
    productknowledge: false,
    testModule: false,
  });
  const [activeModule, setActiveModule] = useState("");
  const handleClose = (status) => {
    setShow(false);
    setModuleStatus((prev) => ({ ...prev, [activeModule]: status }));
  };
  const handleShow = (modulename) => {
    setShow(true);
    setActiveModule(modulename);
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
            <p>Are You sure?</p>
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
        <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
          <div className={Styles.visitnamebx}>
            <div className={Styles.titlebx}>My Dealer</div>
            <div className={Styles.listitems}>
              <ul className={`${Styles.listcntnt} ${Styles.listiconhide} `}>
                <li className={Styles.listhead}>
                  <span>Module Name</span>
                  <span>Avialable offline</span>
                </li>
                <li>
                  <Link href="/coaching/contract">
                    A Focus on contract Hire
                  </Link>
                  <Button type="button" onClick={() => handleShow("contract")}>
                    {moduleStatus.contract ? "Yes" : "No"}
                  </Button>
                </li>
                <li>
                  <a href="#">Customer Opt In</a>
                  <Button
                    type="button"
                    onClick={() => handleShow("customerOpt")}
                  >
                    {moduleStatus.customerOpt ? "Yes" : "No"}
                  </Button>
                </li>
                <li>
                  <a href="#">Customer Opt In</a>
                  <Button
                    type="button"
                    onClick={() => handleShow("customerOptin")}
                  >
                    {moduleStatus.customerOptin ? "Yes" : "No"}
                  </Button>
                </li>
                <li>
                  <a href="#">Product Knowledge</a>
                  <Button
                    type="button"
                    onClick={() => handleShow("productknowledge")}
                  >
                    {moduleStatus.productknowledge ? "Yes" : "No"}
                  </Button>
                </li>
                <li>
                  <a href="#">Test Module</a>
                  <Button
                    type="button"
                    onClick={() => handleShow("testModule")}
                  >
                    {moduleStatus.testModule ? "Yes" : "No"}
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className={Styles.detailbx}>
            <div className={Styles.titlebx}>Details</div>
            <div
              className={`${Styles.contentwhtbx} ${Styles.innercontentwhtbx} `}
            >
              <div>
                <img className={Styles.logoimage} src="/logo.png" alt="logo" />
                <div
                  className={`${Styles.textcntr} ${Styles.pdT20} ${Styles.ftw600} `}
                >
                  {" "}
                  Select a module from the left
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Coaching;
