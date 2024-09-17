//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                     File for showing inner header module                     //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////

"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import { useDashboard } from "../../../contexts/layoutContext";
import Styles from "./Innerheader.module.scss";

// Default function for inner header component
const InnerHeader = () => {
  const [show, setShow] = useState(false);
  const session = useSession();
  const pathName = usePathname();
  const [headerText, setHeaderText] = useState("");
  const loggedIn = !!session.data;
  const { handleGoBack } = useDashboard();

  // Function for style on component load
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const menuClick = () => {
    document.getElementById("menupopup").style.display = "block";
    document.body.style.overflow = "hidden";
    document.body.classList.add("menuopen");
    window.scrollTo(0, 0);
    // Add event listener to detect clicks outside of the menu
    document.addEventListener("mousedown", handleClickOutside);
  };

  // Function for menu close
  const menuClose = () => {
    document.getElementById("menupopup").style.display = "none";
    document.body.style.overflow = "auto";
    document.body.classList.remove("menuopen");

    // Remove event listener when the menu is closed
    document.removeEventListener("mousedown", handleClickOutside);
  };

  const handleClickOutside = (event) => {
    const menuPopup = document.getElementById("menupopup");
    if (menuPopup && !menuPopup.contains(event.target)) {
      menuClose(); // Close the menu if the click is outside the menu popup
    }
  };

  useEffect(() => {
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Setting hedding text in header
  useEffect(() => {
    console.log("recag");
    switch (pathName) {
      case "/actions":
        setHeaderText("Visits Reports Actions");
        break;
      case "/resources":
        setHeaderText("Resources");
        break;
      case "/visit-reports":
        setHeaderText("Visits Reports");
        break;
    }
  }, [pathName]);

  // Function for logout
  const logOut = () => {
    signOut({ callbackUrl: "/login", redirect: true });
  };

  let isHomePage = false;
  if (pathName == "/home" || pathName == "/") {
    isHomePage = true;
  } else {
    isHomePage = false;
  }

  return (
    <>
      <div className={Styles.header}>
        <div className={Styles.container}>
          <div className={`${Styles.flex} ${Styles.homeheader}`}>
            <div>
              <Link href="/home">
                <img
                  className={Styles.logoimage}
                  src="/logo_transparent.png"
                  alt="logo"
                />
              </Link>
            </div>

            <div className={`${Styles.flex} ${Styles.colgp15} `}>
              <div className={`${Styles.whttxt} ${Styles.headertext} `}>
                MI Business Portal
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={Styles.headerbottom}>
          <div className={`${Styles.container} ${Styles.innerheaderbottom} `}>
            {!isHomePage && pathName !== "/login" && (
              <>
                <div className={Styles.backbtn}>
                  <span onClick={handleGoBack}>Back</span>
                </div>

                <div className={Styles.innerheadertxt}>{headerText}</div>
              </>
            )}

            {loggedIn && (
              <div className={Styles.menuRight}>
                <span onClick={logOut} className={Styles.logOut}>
                  Logout
                </span>

                <div className={Styles.menuimg}>
                  <img
                    title="Menu"
                    className={Styles.menuImage}
                    src="/menu.svg"
                    alt="user"
                    onClick={() => menuClick()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="menupopup" className={Styles.headermenu}>
          <div className={Styles.btncancel} onClick={() => menuClose()}>
            <img className={Styles.closeButton} src="/close.svg" alt="close" />
          </div>
          <div className={`${Styles.pd20} ${Styles.sidebarmenu} `}>
            <div
              className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}
            >
              <Link href="/home" onClick={menuClose}>
                Home
              </Link>
            </div>
            <div
              className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}
            >
              <Link href="/visit-reports" onClick={menuClose}>
                Visit Reports
              </Link>
            </div>
            <div
              className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}
            >
              <Link href="/actions" onClick={menuClose}>
                Actions
              </Link>
            </div>
            <div
              className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}
            >
              <Link
                href="https://santander.learnondemand.co.uk/login/"
                onClick={menuClose}
              >
                Coaching
              </Link>
            </div>
            <div
              className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}
            >
              <Link href="/resources" onClick={menuClose}>
                Resources
              </Link>
            </div>
            <div
              className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}
            >
              <Link href="/update-password" onClick={menuClose}>
                Change password
              </Link>
            </div>
            <div
              className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}
            >
              <button
                className={Styles.userBtn}
                type="button"
                onClick={() => {
                  setShow(true);
                  menuClose();
                }}
              >
                User guide
              </button>
            </div>
            <UserGuide show={show} setShow={setShow} />
            <div
              className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}
            >
              <Link href="#" onClick={menuClose}>
                About
              </Link>
            </div>
            <div
              className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}
            >
              <Link href="#" onClick={menuClose}>
                Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerHeader;

// User guide
function UserGuide({ show, setShow }) {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className={Styles.userguidepopup}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <iframe
            src="/santander.pdf"
            style={{ width: "100%", height: "600px", border: "none" }}
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}
