
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { signOut ,useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// Style
import Styles from './home.module.scss';

const Home = () => {        
    const session = useSession();
    const router = useRouter();
    const loggedIn = !!session.data;
    //Variable to show or hide modal
    const [show, setShow] = useState(false);
    //Functionn to hide modal
    const handleClose = () => setShow(false);
    //Functionn to show modal
    const handleShow = () => setShow(true);

    useEffect(()=>{
        document.body.style.overflow = "auto";
    },[])

    const menuClick = ()=>{
        document.getElementById("menupopup").style.display = "block";
        document.body.style.overflow = "hidden";
    }
    const menuClose = ()=>{
        document.getElementById("menupopup").style.display = "none";
        document.body.style.overflow = "auto";
    }
    const logOut = () =>{
        signOut();
        router.push('/home');
    }
    return (
        <> 
        <div className={Styles.header}> 
            <div className={Styles.container}> 
                <div className={Styles.flex}> 
                    <div><a href="#"><img className={Styles.logoimage} src="/logo.png" alt="logo" /></a></div> 
                    <div className={`${Styles.flex} ${Styles.colgp15} `}> 
                        <div className={Styles.whttxt}>MI Business App</div>
                        <div ><img className={Styles.logoimage} src="/user.svg" alt="user" onClick={() => menuClick()} />
                            <div id="menupopup" className={Styles.headermenu}><button type="button" className={Styles.btncancel}  onClick={() => menuClose()}><img className={Styles.logoimage} src="/closelight.svg" alt="close" /></button>
                            <div className={`${Styles.pd20} ${Styles.sidebarmenu} `}>
                                <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/home">Home</Link></div>
                                <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/visit-reports">Visit Reports</Link></div>
                                <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/actions">Actions</Link></div>
                                <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/coaching">Coaching</Link></div>
                                <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/resources">Resources</Link></div>
                                <div className={`${Styles.clrgry} ${Styles.alignlft} ${Styles.pdTB20} ${Styles.menulist}`}><Link href="/update-password">Change password</Link></div>
                            </div>
                            </div>
                        </div>
                         {loggedIn && <Button onClick={logOut} variant="light">Logout</Button>}
                    </div> 
                </div>
            </div>
        </div>
        <div className={Styles.container}> 
            <div className={Styles.pd10}>Welcome to MI Business App</div>
        </div>
        <div className={Styles.bgcolor}>
        <div className={Styles.container}> 
        <div className={Styles.pdTB70}> 
        <div className={Styles.flex}>
            <div className={Styles.lftbxcntnt}>
                <img className={`${Styles.logoimage} ${Styles.brdradius} ${Styles.brdgry} ${Styles.desktopbanner}`} src="/midbar.jpg" alt="banner" />
                <img className={`${Styles.logoimage} ${Styles.brdradius} ${Styles.brdgry} ${Styles.tabbanner}`} src="/tabbanner.jpg" alt="banner" />
            </div>
            <div className={`${Styles.whtbg} ${Styles.pd20} ${Styles.rghtbxcntnt} ${Styles.brdgry} ${Styles.brdradius}`}>
                <div >
                    <div className={`${Styles.notificationtitle} ${Styles.pdB10} `}>Notifications</div>
                    <div className={`${Styles.fntw700} ${Styles.pdTB10} `}>Visit Reports</div>
                    <div className={`${Styles.fntclgry} ${Styles.pdT10} ${Styles.fnt13}`}>Submit in the app only</div>
                    <div className={`${Styles.fntclrd} ${Styles.pdTB5} ${Styles.fnt13}`}>
                        <button onClick={() => handleShow()}  className={Styles.fntclrd}>[Tap to read more]</button>                   
                    </div>
                    <Modal show={show} onHide={handleClose} 
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header>
                            <button type="button" className={Styles.btncancel}  onClick={() => handleClose()}>
                                <img className={Styles.logoimage} src="/close.svg" alt="cloe" />
                            </button>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="readmore">
                                <div>                        
                                    <div>
                                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>            
                    </Modal>
                    <div className={Styles.fntclgry}>22/11/2023</div>
                    
                </div>
            </div>
        </div> 
        <div className={`${Styles.flex} ${Styles.pdT50}  ${Styles.clgp20}`}>
            <div className={Styles.cntntbox}>
                <Link href="/visit-reports"><div className={`${Styles.flex} ${Styles.brdradius} ${Styles.bgred}  ${Styles.clgp10}`}> 
                    <div className={`${Styles.bgwht} ${Styles.iconbrborderradius} `}><img className={`${Styles.pd10} ${Styles.borderdrk} ${Styles.iconbrborderradius}`} src="/report.svg" alt="report" /></div>
                    <div className={`${Styles.whttxt} ${Styles.pd10} ${Styles.fntw600}`}>Visit Reports</div>
                    </div>
                </Link>
                <div className={`${Styles.whtbg} ${Styles.brdgry} ${Styles.boxtxt}  ${Styles.mrgT15}  ${Styles.brdradius} ${Styles.pd10}`}>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. </div>
            </div>
            <div className={Styles.cntntbox}>
                <Link href="/actions">
                    <div className={`${Styles.flex} ${Styles.brdradius} ${Styles.bgred}  ${Styles.clgp10}`}> 
                        <div className={`${Styles.bgwht} ${Styles.iconbrborderradius} `}><img className={`${Styles.pd10} ${Styles.borderdrk} ${Styles.iconbrborderradius}`} src="/action.svg" alt="Actions" /></div>
                        <div className={`${Styles.whttxt} ${Styles.pd10} ${Styles.fntw600}`}>Actions</div>
                    </div>
                </Link>
                <div className={`${Styles.whtbg} ${Styles.brdgry} ${Styles.mrgT15} ${Styles.boxtxt} ${Styles.brdradius} ${Styles.pd10}`}>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. </div>
            </div>
            <div className={Styles.cntntbox}>
                <Link href="/coaching">
                    <div className={`${Styles.flex} ${Styles.brdgry} ${Styles.brdradius} ${Styles.bgred}  ${Styles.clgp10}`}> 
                        <div className={`${Styles.bgwht} ${Styles.iconbrborderradius} `}><img className={`${Styles.pd10} ${Styles.borderdrk} ${Styles.iconbrborderradius}`} src="/communication.svg" alt="Coaching" /></div>
                        <div className={`${Styles.whttxt} ${Styles.pd10} ${Styles.fntw600}`}>Coaching</div>
                    </div>
                </Link>
                <div className={`${Styles.whtbg} ${Styles.boxtxt}  ${Styles.mrgT15}  ${Styles.brdgry} ${Styles.brdradius} ${Styles.pd10}`}>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. </div>
            </div>
            <div className={Styles.cntntbox}>
                <Link href="/resources">
                    <div className={`${Styles.flex} ${Styles.brdgry} ${Styles.brdradius} ${Styles.bgred}  ${Styles.clgp10}`}> 
                        <div className={`${Styles.bgwht} ${Styles.iconbrborderradius} `}><img className={`${Styles.pd10} ${Styles.borderdrk} ${Styles.iconbrborderradius}`} src="/resources.svg" alt="report" /></div>
                        <div className={`${Styles.whttxt} ${Styles.pd10} ${Styles.fntw600}`}>Resources</div>
                    </div>
                </Link>
                <div className={`${Styles.whtbg} ${Styles.boxtxt}  ${Styles.mrgT15}  ${Styles.brdgry} ${Styles.brdradius} ${Styles.pd10}`}>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. </div>
            </div>
        </div>
        </div>
        </div>
        </div>
      
        
         </>

         
        // <div className={Styles.bgcolor}>
        //     <div  className={`${Styles.container} ${Styles.loginpg}`}>
        //     </div>
        // </div>
    );
};

export default Home;
