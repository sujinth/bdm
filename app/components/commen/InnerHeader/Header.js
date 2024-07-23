'use client'
import React from 'react';
import { useRouter } from 'next/navigation' 
import Styles from './Innerheader.module.scss';

const InnerHeader = () => {
    const router = useRouter();

    // Go back to url
    const handleGoBack = () => {
        router.back();
      };
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
