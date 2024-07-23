'use client'
import React from 'react';
import Link from 'next/link'
import Styles from './visitreportlisit.module.scss';



const Visitreportlisit = () => {
     return (   
        <div className={Styles.bgcolor}>
        <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
            <div className={Styles.visitnamebx}>
            <div className={Styles.titlebx}>Visit Reports</div>
            <div className={Styles.listitems}>
                <ul className={Styles.listcntnt}>
                <li><Link href="/actions/incomplete-actions">07/01/2024 00:00:00</Link></li>
                    <li><a href="#">17/05/2024 00:00:00</a></li>
                    <li><a href="#">23/06/2024 00:00:00</a></li>
                    <li><a href="#">19/07/2024 00:00:00</a></li>
                    <li><a href="#">20/11/2024 00:00:00</a></li>
                </ul>
            </div>
            </div>
            <div className={Styles.detailbx}>
            <div className={Styles.titlebx}>Incomplete Actions</div>
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

export default Visitreportlisit;
