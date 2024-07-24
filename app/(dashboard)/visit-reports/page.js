'use client'
import React,{useEffect, useMemo, useState} from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
// Pages
import Styles from './visitreport.module.scss';
import VisitReportTemplate from './visitReportTemplate';
import { useDashboard } from '../../contexts/dashboardContext';

const visitreport = () => {
    const session = useSession();
    const { setGoBackToPage, goBackToPage } = useDashboard();
    const [visitReports, setVisitReports] = useState([]);
    const [selectedReportData, setSelectedReportData] = useState({});
    const [selectedDealer, setSelectedDealerData] = useState({});
    const [dealers, setDealers] = useState([]);
    const [isReportsSelected, setReportsSelected] = useState(false);


    // Function for fetching dealers
    async function getDealersDetails(){
        try{
            let userId = session.data?.user?.id;
            if (!userId) {
                throw new Error('user id not found');
            }
            const response = await axios.get(`/api/dealers?userid=${userId}`);
            if (response.data.result?.length !== 0 && response.data.result.dealership[0]?.status !=='0') {
                setDealers(response.data.result.dealership);
            }
        }catch (error){
            console.log("error",error.message);
        }

    } 
    const selectedVisitReportData = useMemo(()=>{
            return selectedReportData;
    },[selectedReportData])
    // Function for  fetch dealer ship visit reports
    async function getVisitReports(){
        const response = await axios.get('/api/visitReports');
        if (response.data.result?.length !== 0) {
            setVisitReports(response.data.result.root);
        }
    } 
    useEffect(()=>{
        setGoBackToPage((prev)=>({...prev,pageOne : true}))
        getVisitReports();
    },[])
    useEffect(()=>{
        if(goBackToPage.pageTwo){
            setReportsSelected(false)
        }
    },[goBackToPage.pageTwo])
    
    const handleVisitReportsData = (item) =>{
        setSelectedReportData(item);
        getDealersDetails();
        setReportsSelected(true);
        setGoBackToPage((prev)=>({...prev,pageOne : false,pageTwo : true}))
    }
    // Function for handle click dealer item
    const handleClickDealer = (item) =>{
        setSelectedDealerData(item);
        setGoBackToPage((prev)=>({...prev,pageOne : false,pageTwo : false,pageThree : true}))
    }

    return (
        <>
            {(Object.keys(selectedDealer).length !== 0 && goBackToPage.pageThree) ?
              <VisitReportTemplate  selectedVisitReportData={selectedVisitReportData}/> 
            :
            <div className={Styles.bgcolor}>
            <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
                <div className={Styles.visitnamebx}>
                    <div className={Styles.titlebx}>{(!isReportsSelected && goBackToPage.pageOne) ? 'Visit Name': 'My Dealer'}</div>
                    <div className={Styles.listitems}>
                    <ul className={Styles.listcntnt}>
                        {!isReportsSelected && goBackToPage.pageOne && visitReports.length !==0 && 
                            visitReports?.map((item,idx)=>(
                                <li key={idx} onClick={() => handleVisitReportsData(item)}>
                                        {item?.formName}
                                </li>
                        )) }
                        {!isReportsSelected && goBackToPage.pageTwo &&  dealers.length !==0 && 
                            dealers?.map((item,idx)=>(
                                <li key={idx} onClick={() =>handleClickDealer(item)}>{item.name}</li>
                        )) }
            
                    </ul>
                </div>
                </div>
                <div className={Styles.detailbx}>
                <div className={Styles.titlebx}>{(!isReportsSelected && goBackToPage.pageOne) ? 'Details' : 'Account Closure Form'}</div>
                <div className={`${Styles.contentwhtbx} ${Styles.innercontentwhtbx} `}>
                    <div>
                        <img className={Styles.logoimage} src="/logo.png" alt="logo" />
                        <div className={`${Styles.textcntr} ${Styles.pdT20} ${Styles.ftw600} `}>{(!isReportsSelected && goBackToPage.pageOne) ? 'Select a report from the left' : 'Select a dealership from the left'}</div>
                    </div>
                </div>
                </div>
            </div>
            </div>}
        </> 
    );
};

export default visitreport;
