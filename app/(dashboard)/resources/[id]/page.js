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
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Styles from "../resources.module.scss";
import Loader from "@/app/components/commen/Loader/Loader";

// Default function for resource module
const ResourcesList = () => {
  const session = useSession();
  const params = useParams();
  const resourceId = params.id;
  const [resourcesList, setResourcesList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);

  useEffect(() => {
    getResources();
  }, [session.data?.user?.id]);

  // Function for memorise resources data
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

  // Function for get resources data
  async function getResources() {
    try {
      let userId = session.data?.user?.id;
      if (!userId) {
        throw new Error("User id not found.");
      }
      setPageLoader(true);
      const response = await axios.post("/api/resorces", { userId });
      setPageLoader(false);
      if (response.data.result?.length !== 0) {
        setResourcesList(response.data?.result);
      }
    } catch (error) {
      console.log(error.message);
      if (error.message != "User id not found.") {
        setPageLoader(false);
      }
    }
  }

  // Function for download file
  const selectedModule = (item, idx) => {
    if (item.doctype == "pdf") {
      const form = document.createElement("form");
      form.method = "GET";
      form.action = item.path;
      form.target = "_blank"; // Open in a new tab to trigger download
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } else {
      window.location.href = item.path;
    }
  };

  return (
    <>
      <div className={Styles.bgcolor}>
        <div
          className={`${Styles.container} ${Styles.innerpgcntnt} ${Styles.innerpgtab}`}
        >
          <Tab.Container id="left-tabs-example">
            <Row className="tabrow">
              <Col className="visitnamebx splvisitnamebx">
                <div className={Styles.titlebx}>
                  {resources.filterParentResources?.[0]?.name}
                </div>
                <div className={Styles.listitems}>
                  {resources.filterChildResources?.length == 0 && pageLoader ? (
                    <Loader />
                  ) : null}
                  {resources.filterChildResources?.length > 0 || pageLoader ? (
                    <Nav variant="pills" className=" ">
                      {resources.filterChildResources.map((item, idx) => (
                        <Nav.Item key={idx} className={Styles.lfttabs}>
                          <Nav.Link
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
                            {item.doctype === "powerpoint" && (
                              <span>
                                <img src="/powerpoint.png" alt="powerpoint" />
                              </span>
                            )}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  ) : (
                    <div className={Styles.nodata}>No data available</div>
                  )}
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};

export default ResourcesList;
