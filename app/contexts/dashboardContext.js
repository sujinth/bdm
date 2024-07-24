'use client'
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation' 
const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const router = useRouter();
    const [goBackToPage, setGoBackToPage] = useState({
            pageOne : false,
            pageTwo : false,
            pageThree : false
    });
    

    // Go back to url
    const handleGoBack = () => {
        if(goBackToPage.pageTwo){
            setGoBackToPage((prev)=>({...prev,pageOne : true,pageTwo : false}))
        }else if(goBackToPage.pageThree){
            setGoBackToPage((prev)=>({...prev,pageTwo : true,pageThree : false}))
        }else{
            router.back();
        }
        
        
      };
 
    return (
        <DashboardContext.Provider value={{ setGoBackToPage,goBackToPage,handleGoBack }}>
            {children}
        </DashboardContext.Provider>
    );
};
export const useDashboard = () => useContext(DashboardContext);