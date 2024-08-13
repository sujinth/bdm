import React from "react";
import Styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={Styles.header}>
      <div className={Styles.container}>
        <img className={Styles.logoimage} src="/logo_transparent.png" alt="logo" />
        <div className={`${Styles.whttxt} ${Styles.headertext} `}>
          MI Business Portal
        </div>
      </div>
    </div>
  );
};

export default Header;
