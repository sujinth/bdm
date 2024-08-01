'use client'
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation' 
const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const router = useRouter();
    const [goBackToPage, setGoBackToPage] = useState({
            pageOne : false,
            pageTwo : false,
            pageThree : false,
            pageFour : false
    });
    

    // Go back to url
    const handleGoBack = () => {
        if(goBackToPage.pageTwo){
            setGoBackToPage((prev)=>({...prev,pageOne : true,pageTwo : false}));
        }else if(goBackToPage.pageThree && !goBackToPage.pageFour){
            setGoBackToPage((prev)=>({...prev,pageTwo : true,pageThree : false}));
        }else if(goBackToPage.pageFour){
            setGoBackToPage((prev)=>({...prev,pageFour : false}));
        }else{
            router.back();
        }
      };
    return (
        <LayoutContext.Provider value={{ setGoBackToPage,goBackToPage,handleGoBack }}>
            {children}
        </LayoutContext.Provider>
    );
};
export const useDashboard = () => useContext(LayoutContext);