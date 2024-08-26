//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                       File for popup context custom hook                     //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////

"use client";
import React, { createContext, useContext, useState } from "react";
const PopupContext = createContext();

// Function for popup data provider
export const PopupProvider = ({ children }) => {
  // Function for set in default onclick value
  const handleClick = () => {
    setPopupContent({
      titleContent: "",
      detailContent: "",
      responseValue: true,
      duelOption: false,
      show: false,
      onClick: handleClick,
      onClickYes: handleClick,
      onClickNo: handleClick,
    });
  };

  const [popupContent, setPopupContent] = useState({
    titleContent: "",
    detailContent: "",
    responseValue: true,
    duelOption: false,
    show: false,
    onClick: handleClick,
    onClickYes: handleClick,
    onClickNo: handleClick,
  });

  return (
    <PopupContext.Provider value={{ popupContent, setPopupContent, handleClick }}>
      {children}
    </PopupContext.Provider>
  );
};

// Exporting custom hook
export const usePopupContent = () => useContext(PopupContext);
