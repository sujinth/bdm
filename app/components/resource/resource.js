"use client";
import React from 'react'
import Link from 'next/link'
import Styles from './resources.module.scss';

function resourceList({resorces,isTypeResourceList}) {

  return (
    <div className={Styles.bgcolor}>
    <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
        <div className={Styles.visitnamebx}>
        <div className={Styles.titlebx}>Visit Name</div>
        <div className={Styles.listitems}>
            {resorces?.length !==0 && <ul className={Styles.listcntnt}>
                {resorces?.map((item,key)=>(
                    <>
                     {isTypeResourceList ? <li><Link href={`/resources/${item?.id}`}>{item.name}</Link></li> : <li>{item.name}</li> }
                    </>
                ))}
            </ul>}
        </div>
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
);
}

export default resourceList