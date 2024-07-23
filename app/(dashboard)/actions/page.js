'use client'
import { useState } from 'react';
import Link from 'next/link'
import Styles from './Action.module.scss';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Action = () => {
    const [key, setKey] = useState('Dealer Group');
     return (   
        <>
        <div className={Styles.bgcolor}>
        <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
            <div className={`${Styles.visitnamebx} ${Styles.tabcontent} `}>
            <div className={Styles.titlebx}>Dealers Group</div>
            <>
            <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="tabbtn"
      >
        <Tab eventKey="Dealer Group" title="Dealer Group" >
          <div className={`${Styles.listitems} ${Styles.tablist1} `}>
                
                <div className={Styles.listtoptitle}>My Dealers Group</div>
                <ul className={Styles.listcntnt}>
                <li><Link href="/actions/visit-reports">QADG-QA Dealer Group</Link></li>
                </ul>
            </div>
        </Tab>
        <Tab eventKey="Dealer" title="Dealer">
        <div className={`${Styles.listitems} ${Styles.tablist2} `}>
                
                <div className={Styles.listtoptitle}>My Dealers</div>
                <ul className={Styles.listcntnt}>
                <li><a href="#">QADG-QA Dealers</a></li>
                </ul>
            </div>
        </Tab>
      </Tabs>

            
            </>
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

    
      </>
    );
};

export default Action;
