import React from 'react';
import Styles from './Header.module.scss';

const Header = () => {
    return (
        <div className={Styles.header}> 
        <div className={Styles.container}> 
        <img className={Styles.logoimage} src="/logo.png" alt="logo" />  
        </div>
      </div>
    );
};

export default Header;
