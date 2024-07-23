'use client'
import React,{useEffect, useState} from 'react';
import Link from 'next/link'
import Styles from './visitreport.module.scss';
import axios from 'axios';

const visitreport = () => {
    const [visitReports, setVisitReports] = useState([])

    // Function for  fetch dealer ship visit reports
    async function getVisitReports(){
        const response = await axios.get('/api/visitReports');
        if (response.data.result?.length !== 0) {
            setVisitReports(response.data.result.root);
        }
    } 
    useEffect(()=>{
        getVisitReports();
    },[])
    
    return (
        <div className={Styles.bgcolor}>
        <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
            <div className={Styles.visitnamebx}>
            <div className={Styles.titlebx}>Visit Name</div>
            <div className={Styles.listitems}>
                <ul className={Styles.listcntnt}>
                {visitReports.length !==0 && 
                    visitReports.map((item,idx)=>(
                            <li key={idx}><Link href="/visit-reports/delears">{item?.formName}</Link> </li>
                    )) }
                </ul>
            </div>
            </div>
            <div className={Styles.detailbx}>
            <div className={Styles.titlebx}>Details</div>
            <div className={`${Styles.contentwhtbx} ${Styles.innercontentwhtbx} `}>
                <div>
                    <img className={Styles.logoimage} src="/logo.png" alt="logo" />
                    <div className={`${Styles.textcntr} ${Styles.pdT20} ${Styles.ftw600} `}> Select a report from the left</div>
                </div>
            </div>
            </div>
        </div>
  </div>
    );
};

export default visitreport;
