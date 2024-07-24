'use client'
import React from 'react';
import { useDashboard } from '../../../contexts/dashboardContext';
import Styles from './Innerheader.module.scss';

const InnerHeader = () => {
    const { handleGoBack } = useDashboard();
    return (
        <div className={Styles.innerheader}> 
            <div className={Styles.innerheadercntnt}> 
                <div className={Styles.backbtn}> <button onClick={handleGoBack}>Back</button></div>
                <div className={Styles.innerheadertxt}>Dealership Visits Reports</div>
            </div>
      </div>
    );
};

export default InnerHeader;
