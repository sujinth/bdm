'use client'
import {useEffect, useState} from 'react';
import { signOut ,useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import Link from 'next/link'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useDashboard } from '../../../contexts/layoutContext';
import Styles from './Innerheader.module.scss';

const InnerHeader = () => {
    const [show, setShow] = useState(false);
    const session = useSession();
    const router = useRouter();
    const pathName  = usePathname();
    const loggedIn = !!session.data;
    const { handleGoBack } = useDashboard();

    useEffect(()=>{
        document.body.style.overflow = "auto";
    },[])

    const menuClick = ()=>{
        document.getElementById("menupopup").style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.classList.add("menuopen");
    }
    const menuClose = ()=>{
        document.getElementById("menupopup").style.display = "none";
        document.body.style.overflow = "auto";
        document.body.classList.remove("menuopen");
    }
    const logOut = () =>{
        signOut({ callbackUrl: '/login' , redirect:true});
    }
    let isHomePage = false
    if(pathName == '/home' || pathName == '/'){
        isHomePage = true;
    }else{
        isHomePage = false;
    }
    return (
        <>
        <div className={Styles.header}> 
        <div className={Styles.container}> 
            <div className={`${Styles.flex} ${Styles.homeheader}`}> 
                <div><a href="#"><img className={Styles.logoimage} src="/logo.png" alt="logo" /></a></div> 
                <div className={`${Styles.flex} ${Styles.colgp15} `}> 
                    <div className={`${Styles.whttxt} ${Styles.headertext} `}>MI Business App</div>
                    {loggedIn && <Button onClick={logOut} variant="light">Logout</Button>}
                    <div ><img title="Menu" className={Styles.logoimage} src="/menu.svg" alt="user" onClick={() =>   menuClick()} />
                        <div id="menupopup" className={Styles.headermenu}><button type="button" className={Styles.btncancel}  onClick={() => menuClose()}><img className={Styles.logoimage} src="/close.svg" alt="close" /></button>
                        <div className={`${Styles.pd20} ${Styles.sidebarmenu} `}>
                            <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/home">Home</Link></div>
                            <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/visit-reports">Visit Reports</Link></div>
                            <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/actions">Actions</Link></div>
                            <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/coaching">Coaching</Link></div>
                            <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/resources">Resources</Link></div>
                            <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/update-password">Change password</Link></div>
                            
                            <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><button className={Styles.userGuideBtn} type='button' onClick={() => setShow(true)}>User guide</button></div>
                            <UserGuide show={show} setShow={setShow} />
                        </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    {(!isHomePage && pathName !=='/login') &&<div className={Styles.headerbottom}>
    <div className={Styles.container}>
        <div >
            <div className={Styles.backbtn}><button onClick={handleGoBack}>Back</button></div>
        </div>
        <div className={Styles.innerheadertxt}>Dealership Visits Reports</div>
    </div>
    </div>}
    </>
  
    );
};

export default InnerHeader;

// User guide
function UserGuide({show, setShow}) {

    return (
      <>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            
          </Modal.Header>
          <Modal.Body>
          <iframe 
            src='/santander.pdf'
            style={{ width: '100%', height: '600px', border: 'none' }} 

            ></iframe>
          </Modal.Body>
        </Modal>
      </>
    );
  }