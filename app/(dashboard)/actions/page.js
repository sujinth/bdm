                //////////////////////////////////////////////////////////////////////////////////       
                //                                                                              //           
                //                       File for showing action functionality                  //
                //                                                                              //
                //////////////////////////////////////////////////////////////////////////////////

'use client'
import { useEffect, useState } from 'react';
import Styles from './Action.module.scss';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useDashboard } from '../../contexts/dashboardContext';

// Action component
const Action = () => {
    const [pageName, setPageName] = useState('Visit Name');
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
    const { setGoBackToPage, goBackToPage } = useDashboard();
    const session = useSession();

    // Function for render at ṭhe time of change in session value and at the time of change in page name.
    useEffect(()=>{
        getVisitName();
    },[pageName, session])

    // Function for render at the time of change in goBackToPage state.
    useEffect(()=>{
        if(goBackToPage.pageOne && pageName != 'Visit Name'){
            setPageName('Visit Name');
        } else if(goBackToPage.pageTwo && pageName != 'Dealer Groups'){
            setPageName('Dealer Groups');
        } else if(goBackToPage.pageThree && pageName != 'Visit Reports'){
            setPageName('Visit Reports');
        }
    },[goBackToPage])

    // Function for fetching visit name
    async function getVisitName(){
        try{
            let userId = session.data?.user?.id;
            if (!userId) {
                throw new Error('user id not found');
            }

            // Cases for each api call
            switch(pageName){

                case 'Visit Name':
                    
                    // Set page number for back button
                    setGoBackToPage(()=>({pageOne : true, pageTwo : false, pageThree : false}));

                    // API call to next server for delearship visit report
                    const visitNameResponse = await axios.post(`/api/actions/dealershipVisitReports`,{
                        userId,
                        lastupdatedttm : '2012-03-12 05:49:32'
                    });
                    
                    // Setting response to the state
                    if (visitNameResponse?.data?.result?.root && visitNameResponse?.data?.result?.root?.length !== 0) {
                        setDelearshipVisitReport(visitNameResponse.data.result.root);
                    }

                    break;

                case 'Dealer Groups':

                    // Set page number for back button
                    setGoBackToPage(()=>({pageOne : false, pageTwo : true, pageThree : false}));

                    // API call to next server for incomplete delearship report
                    const dealerGroupResponse = await axios.post(`/api/actions/incompleteDealership`,{
                        userId,
                        lastupdatedttm : '2012-03-12 05:49:32'
                    });
                    
                    // Setting response to the state
                    if(dealerGroupResponse?.data?.result?.dealergroup?.[0]?.dealergroup && selectedFormId){
                        let filteredDealerGroupData = dealerGroupResponse.data.result.dealergroup[0].dealergroup.filter(value => value.formId === selectedFormId);
                        setDealerGroup(filteredDealerGroupData);
                    }
                    if(dealerGroupResponse?.data?.result?.dealership && selectedFormId){
                        let filteredDealerData = dealerGroupResponse.data.result.dealership.filter(data => data.formId === selectedFormId);
                        setDealership(filteredDealerData);
                    }

                    break;
                
                case 'Visit Reports':

                    // Update previous data
                    setIncompleteActions([]);
                    setCurrentIncompleteAction();

                    // Set page number for back button
                    setGoBackToPage(()=>({pageOne : false, pageTwo : false, pageThree : true}));

                    // API call to next server for incompleted actions report
                    const incompleteActions = await axios.post(`/api/actions/incompleteActions`,{
                        userId,
                        lastupdatedttm : '2012-03-12 05:49:32',
                        formid : selectedFormId,
                        flagDealergroup,
                        flagTabbedView,
                        flagHealthCheck,
                        selectedFormId,
                        dealerGroupId
                    });
                    
                    // Setting response to the state
                    if (incompleteActions?.data?.result?.root?.reportLists && Array.isArray(incompleteActions?.data?.result?.root?.reportLists)) {
                        setIncompleteActions(incompleteActions.data.result.root.reportLists);
                    }

                    break;
            }


        }catch (error){
            console.log("error",error.message);
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

    return (   
        <>
            <div className={Styles.bgcolor}>
                <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
                    <div className={`${Styles.visitnamebx} ${Styles.tabcontent} `}>
                        <div className={Styles.titlebx}>{pageName}</div>

                        {/* Content need to show in visit name side bar */}
                        {pageName == "Visit Name" ? 
                            <div className={Styles.listitems}>
                                <ul className={Styles.listcntnt}>
                                    {delearshipVisitReport.map((item)=>(
                                        <li onClick={()=> {
                                            setPageName("Dealer Groups"); 
                                            setFlagTabbedView(item?.flagTabbedView);
                                            setFlagHealthCheck(item?.flagHealthCheck);
                                            setSelectedFormId(item?.formId);
                                        }}>
                                            {item?.formName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        : null }
                        
                        {/* Content need to show in dealer group side bar */}
                        {pageName == "Dealer Groups" ? 
                            <>
                                <Tabs
                                    id="controlled-tab-example"
                                    className="tabbtn"
                                    onSelect={handleSelect}
                                >
                                    <Tab eventKey="Dealer Group" title="Dealer Group">
                                        <div className={`${Styles.listitems} ${Styles.tablist1} `}>
                                            <div className={Styles.listtoptitle}>My Dealers Group</div>
                                            <ul className={Styles.listcntnt}>
                                                {dealerGroup.map((item)=>(
                                                    <li onClick={(e)=> {setPageName("Visit Reports"); setDealerGroupId(e?.target?.value)}} value={item?.dealerGroupId}>{item?.dealerGroupName}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Dealer" title="Dealer">
                                        <div className={`${Styles.listitems} ${Styles.tablist2} `}> 
                                            <div className={Styles.listtoptitle}>My Dealers</div>
                                            <ul className={Styles.listcntnt}>
                                                {dealership.map((item)=>(
                                                    <li onClick={(e)=> {setPageName("Visit Reports"); setDealerGroupId(e?.target?.value)}} value={item?.id}>{item?.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </>
                        : null}

                        {/* Content need to show in visit report side bar */}
                        {pageName == "Visit Reports" ?
                            <div className={Styles.listitems}>
                                <ul className={Styles.listcntnt}>
                                    {incompleteActions.map((item, index)=>(
                                        <li onClick={(e)=> {setCurrentIncompleteAction(e?.target?.value);}} value={index}>{item?.dateandtime}</li>
                                    ))}
                                </ul>
                            </div>
                        : null} 

                    </div>

                    {/* Content need to show under details */}
                    <div className={Styles.detailbx}>
                        <div className={Styles.titlebx}>Details</div>
                        <div className={`${Styles.contentwhtbx} ${Styles.innercontentwhtbx} `}>
                            {pageName == "Visit Reports" && incompleteActions[currentIncompleteAction]?.formdata ?
                                <div dangerouslySetInnerHTML={{ __html: incompleteActions[currentIncompleteAction]?.formdata }} />
                            :
                                <div>
                                    <img className={Styles.logoimage} src="/logo.png" alt="logo" />
                                    <div className={`${Styles.textcntr} ${Styles.pdT20} ${Styles.ftw600} `}> Select a report from the left</div>
                                </div>
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default Action;
