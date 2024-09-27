'use client'
import React,{ useEffect, useState } from "react";
import Styles from "./Footer.module.scss";

const Footer = () => {
  const [correntYear, setCorrentYear] = useState('')
  useEffect(()=>{
    let year = new Date().getFullYear() 
    setCorrentYear(year)
  },[])
  return (
    <div className={Styles.footer}>
      <div className={Styles.copyright}>&copy; {correntYear} Santander Consumer (UK) plc</div>
    </div>
  );
};

export default Footer;
