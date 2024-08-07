'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
// Pages
import Styles from './visitreport.module.scss';
import VisitReportTemplate from './visitReportTemplate';
import { useDashboard } from '../../contexts/layoutContext';

const VisitReport = () => {
    const session = useSession();
    const { setGoBackToPage, goBackToPage } = useDashboard();
    const [visitReports, setVisitReports] = useState([]);
    const [selectedReportData, setSelectedReportData] = useState({});
    const [selectedDealer, setSelectedDealerData] = useState({});
    const [dealers, setDealers] = useState([]);
    const [isReportsSelected, setReportsSelected] = useState(false);
    const [isLoaderActive , setIsLoaderActive] = useState(false);

    // Fetch dealers' details based on user ID
    async function getDealersDetails() {
        try {
            const userId = session.data?.user?.id;
            if (!userId) {
                throw new Error('User ID not found');
            }

            const response = await axios.get(`/api/dealers?userid=${userId}`);
            if (response.data.result?.length !== 0 && response.data.result.dealership[0]?.status !== '0') {
                setDealers(response.data.result.dealership);
            }
        } catch (error) {
            console.log("Error:", error.message);
        }
    }

    const selectedData = useMemo(() => {
     return { selectedReportData, selectedDealer}
    }, [selectedReportData,selectedDealer]);;

    // Fetch visit reports based on user ID
    async function getVisitReports() {
        try {
            const userId = session.data?.user?.id;
            if (!userId) {
                throw new Error('User ID not found');
            }
            setIsLoaderActive(true)
            // await new Promise(resolve => setTimeout(resolve,3000))
            const response = await axios.get(`/api/visitReports?userId=${userId}`);
            if (response.data.result?.length !== 0) {
                setVisitReports(response.data.result.root);
                setIsLoaderActive(false)
            }
        } catch (error) {
            console.log("Error:->", error.message);
        }
    }

    useEffect(() => {
        setGoBackToPage((prev) => ({ ...prev, pageOne: true }));
        getVisitReports();
    }, [session.data?.user?.id]);

    useEffect(() => {
        if (goBackToPage.pageTwo) {
            setReportsSelected(false);
        }
    }, [goBackToPage.pageTwo]);

    const handleVisitReportsData = (item) => {
        setSelectedReportData(item);
        getDealersDetails();
        setReportsSelected(true);
        setGoBackToPage((prev) => ({ ...prev, pageOne: false, pageTwo: true }));
    };

    // Handle click on a dealer item
    const handleClickDealer = (item) => {
        setSelectedDealerData(item);
        setGoBackToPage((prev) => ({ ...prev, pageOne: false, pageTwo: false, pageThree: true }));
    };

    return (
        <>
            {Object.keys(selectedDealer).length !== 0 && goBackToPage.pageThree ? (
                <VisitReportTemplate selectedData={selectedData} />
            ) : (
                <div className={Styles.bgcolor}>
                    <div className={`${Styles.container} ${Styles.innerpgcntnt}`}>
                        <div className={Styles.visitnamebx}>
                            <div className={Styles.titlebx}>
                                {(!isReportsSelected && goBackToPage.pageOne) ? 'Visit Name' : 'My Dealer'}
                            </div>
                            <div className={Styles.listitems}>
                      
                                <ul className={Styles.listcntnt}>
                                    {!isReportsSelected && goBackToPage.pageOne && visitReports.length !== 0 &&
                                        visitReports.map((item, idx) => (
                                            <li key={idx} onClick={() => handleVisitReportsData(item)}>
                                                {item?.formName}
                                            </li>
                                        ))
                                    }
                                    {!isReportsSelected && goBackToPage.pageTwo && dealers.length !== 0 &&
                                        dealers.map((item, idx) => (
                                            <li key={idx} onClick={() => handleClickDealer(item)}>
                                                {item.name}
                                            </li>
                                        ))
                                    }
                            
                                </ul>
                   
                            </div>
                        </div>
                        <div className={Styles.detailbx}>
                            <div className={Styles.titlebx}>
                                {(!isReportsSelected && goBackToPage.pageOne) ? 'Details' : 'Account Closure Form'}
                            </div>
                            <div className={`${Styles.contentwhtbx} ${Styles.innercontentwhtbx}`}>
                                {/* Body */}
                                <div>
                                    <img className={Styles.logoimage} src="/logo.png" alt="logo" />
                                    <div className={`${Styles.textcntr} ${Styles.logobottomtext} ${Styles.pdT20} ${Styles.ftw600}`}>
                                        {(!isReportsSelected && goBackToPage.pageOne) ? 'Select a report from the left' : 'Select a dealership from the left'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VisitReport;
