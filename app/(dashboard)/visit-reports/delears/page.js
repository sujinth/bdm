'use client'
import React,{useEffect,useState} from 'react';
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Styles from '../visitreport.module.scss';


const Dealer = () => {
    const session = useSession();
    const [dealers, setDealers] = useState([]);

    // Function for fetching dealers
    async function getDealersDetails(){
        try{
            let userId = session.data?.user?.id;
            if (!userId) {
                throw new Error('user id not found');
            }
            console.log("userid",userId);
            const response = await axios.get(`/api/dealers?userid=${userId}`);
            if (response.data.result?.length !== 0 && response.data.result.dealership[0]?.status !=='0') {
                console.log("response.data.result.dealership",response.data.result.dealership);
                setDealers(response.data.result.dealership);
            }
        }catch (error){
            console.log("error",error.message);
        }

    } 

    useEffect(()=>{
        getDealersDetails();
    },[session])
    
    return (
        <div className={Styles.bgcolor}>
        <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
            <div className={Styles.visitnamebx}>
            <div className={Styles.titlebx}>My Dealer</div>
            <div className={Styles.listitems}>
                {dealers?.length !==0 ?
                <ul className={Styles.listcntnt}>
                    {dealers?.map((item,idx)=>(
                        <li><Link href="/visit-reports/qa-dealers">{item.name}</Link></li>
                    ))}
                </ul>
                : 
                <>
                        <span>No data found</span>
                </>
                }
            </div>
            </div>
            <div className={Styles.detailbx}>
            <div className={Styles.titlebx}>Account Closure Form</div>
            <div className={`${Styles.contentwhtbx} ${Styles.innercontentwhtbx} `}>
                <div>
                    <img className={Styles.logoimage} src="/logo.png" alt="logo" />
                    <div className={`${Styles.textcntr} ${Styles.pdT20} ${Styles.ftw600} `}> Select a dealership from the left</div>
                </div>
            </div>
            </div>
        </div>
  </div>
    );
};

export default Dealer;
