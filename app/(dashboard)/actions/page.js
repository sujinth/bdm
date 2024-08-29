//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                       File for showing action functionality                  //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////

"use client";
import { useEffect, useState } from "react";
import Styles from "./Action.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useDashboard } from "../../contexts/layoutContext";
import Button from "../../components/commen/FormElements/Button/Button";
import { useRouter } from "next/navigation";
import { handleHTMLContent } from "../../utils/htmlUtils";
import { usePopupContent } from "@/app/contexts/popupContext";
import Loader from "../../components/commen/Loader/Loader";
import Loader2 from "@/app/components/commen/Loader/Loader2";

// Action component
const Action = () => {
  const [pageName, setPageName] = useState("Visit Name");
  const [pageTitle, setPageTitle] = useState("Details");
  const [delearshipVisitReport, setDelearshipVisitReport] = useState([]);
  const [dealerGroup, setDealerGroup] = useState([]);
  const [incompleteActions, setIncompleteActions] = useState([]);
  const [currentIncompleteAction, setCurrentIncompleteAction] = useState();
  const [flagDealergroup, setFlagDealergroup] = useState("Y");
  const [flagTabbedView, setFlagTabbedView] = useState("");
  const [flagHealthCheck, setFlagHealthCheck] = useState("");
  const [selectedFormId, setSelectedFormId] = useState("");
  const [dealerGroupId, setDealerGroupId] = useState();
  const [dealership, setDealership] = useState([]);
  const [cartId, setCartId] = useState();
  const { setGoBackToPage, goBackToPage } = useDashboard();
  const { setPopupContent } = usePopupContent();
  const [loaderInSideBar, setLoaderInSideBar] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [triggerApi, setTriggerApi] = useState(false);
  const session = useSession();
  const router = useRouter();

  // Function for render at the time of change in goBackToPage state.
  useEffect(() => {
    let pageNameData = pageName;
    if (goBackToPage.pageOne) {
      setPageTitle("Details");
      setPageName("Visit Name");
      pageNameData = "Visit Name";
    } else if (goBackToPage.pageTwo) {
      setPageName("Dealer Groups");
      pageNameData = "Dealer Groups";
    } else if (goBackToPage.pageThree) {
      setPageTitle("Incomplete Actions");
      setPageName("Visit Reports");
      pageNameData = "Visit Reports";
    }
    getVisitName(pageNameData);
  }, [goBackToPage, session.data?.user?.id, triggerApi]);

  // Handle HTML content injection on formData change
  useEffect(() => {
    if (incompleteActions[currentIncompleteAction]?.formdata) {
      handleHTMLContent(
        incompleteActions[currentIncompleteAction]?.formdata,
        "root"
      );
    }
  }, [incompleteActions[currentIncompleteAction]?.formdata]);

  // Function for fetching visit name
  async function getVisitName(pageNameData) {
    try {
      setLoaderInSideBar(true);
      let userId = session.data?.user?.id;
      if (!userId) {
        throw new Error("user id not found");
      }

      // Cases for each api call
      switch (pageNameData) {
        case "Visit Name":
          // Update previous data
          setIncompleteActions([]);
          setCurrentIncompleteAction();

          // API call to next server for delearship visit report
          const visitNameResponse = await axios.post(
            `/api/actions/dealershipVisitReports`,
            {
              userId,
              lastupdatedttm: "2012-03-12 05:49:32",
            }
          );
          setLoaderInSideBar(false);
          // Setting response to the state
          if (
            visitNameResponse?.data?.result?.root &&
            visitNameResponse?.data?.result?.root?.length !== 0
          ) {
            setDelearshipVisitReport(visitNameResponse.data.result.root);
          }

          break;

        case "Dealer Groups":
          // Update previous data
          setIncompleteActions([]);
          setCurrentIncompleteAction();

          // API call to next server for incomplete delearship report
          const dealerGroupResponse = await axios.post(
            `/api/actions/incompleteDealership`,
            {
              userId,
              lastupdatedttm: "2012-03-12 05:49:32",
            }
          );
          setLoaderInSideBar(false);

          // Setting response to the state
          if (
            dealerGroupResponse?.data?.result?.dealergroup?.[0]?.dealergroup &&
            selectedFormId
          ) {
            let filteredDealerGroupData =
              dealerGroupResponse.data.result.dealergroup[0].dealergroup.filter(
                (value) => value.formId === selectedFormId
              );
            setDealerGroup(filteredDealerGroupData);
          }
          if (dealerGroupResponse?.data?.result?.dealership && selectedFormId) {
            let filteredDealerData =
              dealerGroupResponse.data.result.dealership.filter(
                (data) => data.formId === selectedFormId
              );
            setDealership(filteredDealerData);
          }

          break;

        case "Visit Reports":
          // API call to next server for incompleted actions report
          const incompleteActions = await axios.post(
            `/api/actions/incompleteActions`,
            {
              userId,
              lastupdatedttm: "2012-03-12 05:49:32",
              formid: selectedFormId,
              flagDealergroup,
              flagTabbedView,
              flagHealthCheck,
              selectedFormId,
              dealerGroupId,
            }
          );
          setLoaderInSideBar(false);
          // Setting response to the state
          if (
            incompleteActions?.data?.result?.root?.reportLists &&
            Array.isArray(incompleteActions?.data?.result?.root?.reportLists)
          ) {
            setIncompleteActions(
              incompleteActions.data.result.root.reportLists
            );
          }

          break;
        default:
          break;
      }
    } catch (error) {
      console.log("error", error.message);
      setLoaderInSideBar(false);
    }
  }

  // Function for set selected value in dealer groups
  const handleSelect = (eventKey) => {
    if (eventKey === "Dealer Group") {
      setFlagDealergroup("Y");
    } else if (eventKey === "Dealer") {
      setFlagDealergroup("N");
    }
  };

  // Function for submit data
  function submitData(flagSave) {
    try {
      let stringFieldValues =
        document.getElementById("strFormControlInfo")?.value || "";
      let fieldValuesArray = [];
      let strPostData = "";
      let submitFlag = false;
      if (stringFieldValues) {
        fieldValuesArray = stringFieldValues.split("^@^");
        fieldValuesArray.map((id, index) => {
          let idBasedPostData = document.getElementById(id);
          if (idBasedPostData?.checked) {
            submitFlag = true;
            if (fieldValuesArray.length > index + 1) {
              strPostData += "true^@^";
            } else {
              strPostData += "true";
            }
          } else {
            if (fieldValuesArray.length > index + 1) {
              strPostData += "^@^";
            } else {
              strPostData += "";
            }
          }
        });
      }

      if (submitFlag || flagSave == "Y") {
        // Data submit in to api
        dataPostInToApi(stringFieldValues, strPostData, flagSave);
      } else {
        setPopupContent((prevState) => ({
          ...prevState,
          duelOption: false,
          titleContent: "",
          detailContent: "Please select at least one action.",
          show: true,
        }));
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  // Function for data submit in to api
  async function dataPostInToApi(stringFieldValues, strPostData, flagSave) {
    try {
      let userId = session.data?.user?.id;
      if (!userId) {
        throw new Error("user id not found");
      }
      setSubmitLoader(true);
      // API call to next server for delearship visit report
      const visitNameResponse = await axios.post(
        `/api/actions/incompleteUpdateActionStatus`,
        {
          userId,
          cartId,
          formId: selectedFormId,
          dealershipId: dealerGroupId,
          strFormControlInfo: stringFieldValues,
          postData: strPostData,
          flagSave,
        }
      );
      setSubmitLoader(false);
      // Setting response to the state
      if (visitNameResponse?.data?.result?.status) {
        if (flagSave == "N") {
          setPopupContent((prevState) => ({
            ...prevState,
            titleContent: "",
            duelOption: false,
            detailContent: "Actions updated successfilly.",
            show: true,
            onClick: clickOk,
          }));
        }
      } else {
        if (flagSave == "N") {
          setPopupContent((prevState) => ({
            ...prevState,
            titleContent: "",
            duelOption: false,
            detailContent:
              visitNameResponse?.data?.result?.message ||
              "Something went wrong, please try again later.",
            show: true,
            onClick: clickOk,
          }));
        }
      }
      if (flagSave == "Y") {
        setTriggerApi(!triggerApi);
      }
    } catch (error) {
      console.log("error in api call : ", error);
      let errorMessage;
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = "Something went wrong, please try again later.";
      }
      if (flagSave == "N") {
        setPopupContent((prevState) => ({
          ...prevState,
          duelOption: false,
          titleContent: "",
          detailContent: errorMessage,
          show: true,
          onClick: clickOk,
        }));
      }
    }
  }

  // Function for set set default onclick value
  const handleClick = () => {
    setPopupContent({
      titleContent: "",
      detailContent: "",
      responseValue: true,
      duelOption: false,
      show: false,
      onClick: handleClick,
    });
  };

  // Function for set in modal ok button
  const clickOk = () => {
    setPopupContent({
      titleContent: "",
      detailContent: "",
      responseValue: true,
      duelOption: false,
      show: false,
      onClick: handleClick,
    });
    setPageName("Visit Name");
    setGoBackToPage({ pageOne: true, pageTwo: false, pageThree: false });
    router.push("/home");
  };

  return (
    <>
      <div className={Styles.bgcolor}>
        <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
          <div className={`${Styles.visitnamebx} ${Styles.tabcontent} `}>
            <div className={Styles.titlebx}>{pageName}</div>

            {/* Content need to show in visit name side bar */}
            {pageName == "Visit Name" ? (
              <>
                {loaderInSideBar ? (
                  <Loader />
                ) : (
                  <div className={Styles.listitems}>
                    {delearshipVisitReport?.length ? (
                      <ul className={Styles.listcntnt}>
                        {delearshipVisitReport.map((item, index) => (
                          <li
                            key={index + "visitName"}
                            onClick={() => {
                              setGoBackToPage({
                                pageOne: false,
                                pageTwo: true,
                                pageThree: false,
                              });
                              setPageName("Dealer Groups");
                              setFlagTabbedView(item?.flagTabbedView);
                              setFlagHealthCheck(item?.flagHealthCheck);
                              setSelectedFormId(item?.formId);
                              setPageTitle(item?.formName);
                            }}
                          >
                            {item?.formName}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div
                        className={`${Styles.listitems} ${Styles.nodata} `}
                      >
                        No data available
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : null}

            {/* Content need to show in dealer group side bar */}
            {pageName == "Dealer Groups" ? (
              <>
                {loaderInSideBar ? (
                  <Loader />
                ) : (
                  <Tabs
                    id="controlled-tab-example"
                    className="tabbtn"
                    onSelect={handleSelect}
                  >
                    <Tab eventKey="Dealer Group" title="Dealer Group">
                      {dealerGroup?.length ? (
                        <div
                          className={`${Styles.listitems} ${Styles.tablist1} `}
                        >
                          <div className={Styles.listtoptitle}>
                            My Dealers Group
                          </div>
                          <ul className={Styles.listcntnt}>
                            {dealerGroup.map((item, index) => (
                              <li
                                key={index + "dealerGroup"}
                                onClick={(e) => {
                                  setGoBackToPage({
                                    pageOne: false,
                                    pageTwo: false,
                                    pageThree: true,
                                  });
                                  setPageName("Visit Reports");
                                  setDealerGroupId(e?.target?.value);
                                }}
                                value={item?.dealerGroupId}
                              >
                                {item?.dealerGroupName}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div
                          className={`${Styles.listitems} ${Styles.nodata} `}
                        >
                          No data available
                        </div>
                      )}
                    </Tab>
                    <Tab eventKey="Dealer" title="Dealer">
                      {dealership.length ? (
                        <div
                          className={`${Styles.listitems} ${Styles.tablist2} `}
                        >
                          <div className={Styles.listtoptitle}>My Dealers</div>
                          <ul className={Styles.listcntnt}>
                            {dealership.map((item, index) => (
                              <li
                                key={index + "dealer"}
                                onClick={(e) => {
                                  setGoBackToPage({
                                    pageOne: false,
                                    pageTwo: false,
                                    pageThree: true,
                                  });
                                  setPageName("Visit Reports");
                                  setDealerGroupId(e?.target?.value);
                                }}
                                value={item?.id}
                              >
                                {item?.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div
                          className={`${Styles.listitems} ${Styles.nodata} `}
                        >
                          No data available
                        </div>
                      )}
                    </Tab>
                  </Tabs>
                )}
              </>
            ) : null}

            {/* Content need to show in visit report side bar */}
            {pageName == "Visit Reports" ? (
              <>
                {loaderInSideBar ? (
                  <Loader />
                ) : (
                  <div className={Styles.listitems}>
                    {incompleteActions?.length ? (
                      <ul className={Styles.listcntnt}>
                        {incompleteActions.map((item, index) => (
                          <li
                            key={index + "visitReports"}
                            className={selectedItem == index + "visitReports" ? Styles.selectedItem : null}
                            onClick={(e) => {
                              setCurrentIncompleteAction(e?.target?.value);
                              setCartId(item.cartid);
                              setSelectedItem(index + "visitReports");
                            }}
                            value={index}
                          >
                            {item?.dateandtime}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className={Styles.nodata}>No data available</div>
                    )}
                  </div>
                )}
              </>
            ) : null}
          </div>

          {/* Content need to show under details */}
          <div className={Styles.detailbx}>
            <div className={Styles.titlebx}>{pageTitle}</div>
            {submitLoader ? <Loader2 /> : null}
            <div
              className={`${Styles.contentwhtbx} ${Styles.innercontentwhtbx} `}
            >
              {/* Placeholder for dynamic HTML content */}
              {pageName == "Visit Reports" &&
              incompleteActions[currentIncompleteAction]?.formdata ? (
                <div>
                  <div id="root"></div>
                  <div className={Styles.mainboxfooter}>
                    <Button onClick={() => submitData("Y")} children="Save" />
                    <Button onClick={() => submitData("N")} children="Submit" />
                  </div>
                </div>
              ) : (
                <div
                  className={`${Styles.contentwhtbx} ${Styles.innercontentwhtbx}`}
                >
                  {/* Empty selected body */}
                  <div
                    className={`${Styles.textcntr} ${Styles.logobottomtext} ${Styles.pdB20} ${Styles.ftw600}`}
                  >
                    {goBackToPage.pageTwo
                      ? "Select a dealership from the left"
                      : "Select a report from the left"}
                  </div>
                  <div className={Styles.detailbximage}>
                    <img src="/select-image.png" alt="Select a report" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Action;
