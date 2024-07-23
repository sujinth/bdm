'use client'
import React, { useState, useEffect  } from 'react';
import Styles from '../visitreport.module.scss';
import { Button, Row, Col, Form, InputGroup} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import Overlay from 'react-bootstrap/Overlay';

    const QADealer = () => {
      const [imagePopupVisible, setImagePopupVisible] = useState(false);
    const menuClick = ()=>{
      // document.getElementById("addimagepopup").style.display = "block";
      var imagepopup = document.getElementById("addimagepopup");
      if (imagepopup.style.display === "block") {
      imagepopup.style.display = "none";
      document.body.classList.remove(Styles.bodyOverlayActive);
      } else {
      imagepopup.style.display = "block";
      document.body.classList.add(Styles.bodyOverlayActive);
      }
    
      }
        const btnClick = ()=>{
            // document.getElementById("addimagepopup").style.display = "block";
            var searchpopup = document.getElementById("searchboxpopup");
            if (searchpopup.style.display === "none") {
                searchpopup.style.display = "block";
            } else {
                searchpopup.style.display = "none";
            }
            }
      
        const cancel = ()=>{
        document.getElementsByClassName("imageoption").style.display = "none";
        setImagePopupVisible(false); // Close the image popup

        }
        
    return (
      
    <div className={Styles.bgcolor}>
    <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
        <div className={Styles.visitnamebx}>
            <div className={Styles.titlebx}>My Dealer</div>
            <div className={Styles.listitems}>
                <ul className={`${Styles.listcntnt} ${Styles.listiconhide} `}>
                <li className={Styles.listhead}><a>New Form</a></li>
                <li><a href="#">14/12/2023 16:11:04 - Sent</a></li>
                <li><a href="#">21/12/2023 13:11:04 - Sent</a></li>
                <li><a href="#">02/08/2023 01:11:04 - Sent</a></li>
                <li><a href="#">18/12/2023 15:11:04 - Sent</a></li>
                </ul>
            </div>
        </div>
    <div className={Styles.detailbx}>
        <div className={Styles.titlebx}>Account Closure Form</div>
        <div className={`${Styles.contentwhtbx} ${Styles.contentwhtbxfooter} `}>
        <>
        <form>
            <table className={Styles.detailtbl}>
            <tbody>
                <tr>
                <td>Date and Time</td>
                <td><input className={Styles.tblinputbx} type="text" placeholder='dd/mm/yyyy 00:00:00' /></td>
                </tr>
                <tr>
                <td>Dealership Name</td>
                <td><input className={Styles.tblinputbx} type="text" /></td>
                </tr>
                <tr>
                <td>Completion Date</td>
                <td><input className={Styles.tblinputbx} type="text" /></td>
                </tr>
                <tr>
                <td>Attendees</td>
                <td><input className={Styles.tblinputbx} type="text" /></td>
                </tr>
                </tbody>
            </table>
            <div className={Styles.cntnttitle}>Areas for discussion</div>
            <div className={Styles.checbxcntnt}>
                <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
                <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
            </div>
            <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
            <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
    </div>
    <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
    <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
    </div>
    <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
    <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
    </div>
    <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
    <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
    </div>
    <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
    <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
    </div>
    <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
    <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
    </div>
    <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
    <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
    </div>
    <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
    <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
    </div>
    <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
    <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
    </div>
    <div className={`${Styles.flex} ${Styles.chcklabletxt} `}>
    <label className={Styles.checklabel}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    <input type="checkbox"  /><span className={Styles.checkmark}></span></label>
    </div>
    </div>
    <div className={Styles.mainboxfooter}>
    <div className={`${Styles.flex} ${Styles.btnrow} `}>
    <div className={Styles.imageaddoption}>
        <>
        <button  type="button" onClick={() => menuClick()}
        className={`${Styles.imagechoosebtn} ${Styles.mainboxfooterbtn}  ${Styles.flex}`}>
        Add Images <img  src="../../addimage.svg" alt="message.svg" />
        </button>
        </>
        <div id="addimagepopup" className={Styles.addimagepopup}>
            <div className={`${Styles.flex} ${Styles.imageoption} `}>
            <>
            {['top', 'top', 'top'].map((placement) => (
            <OverlayTrigger
            trigger="click"
            key={placement}
            placement={placement}
            overlay={
            <Popover id={`popover-positioned-${placement}`}>
                <Popover.Body>
                <div><button id="addimagecntntlink" >Camera Roll</button></div>
                <div><button id="addimagecntntlink" >Take A Photo</button></div>
                <div><button id="addimagecntntlink" className={Styles.addimagecntntlink} onClick={() => cancel()} >Cancel</button></div>
                </Popover.Body>
            </Popover>
            }
            >

            <Button variant="secondary"><img src="../../addmedia.svg" alt="" /></Button>
            </OverlayTrigger>
            ))}
            </>
        </div>
    </div>
    </div>
    <div className={`${Styles.flex} ${Styles.rowrhtbtn} `}>
    <button type="button" className={Styles.mainboxfooterbtn}>Save</button>
    <button type="button" className={Styles.mainboxfooterbtn}>Cancel</button>
    </div>
    </div>
    <div className={`${Styles.flex} ${Styles.btnrow} `}>
    <div className={`${Styles.flex} ${Styles.rowrhtbtn} `}>
    <div className={Styles.searchbox}>
        {['top'].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`searchpopover-positioned`}>
              
              <Popover.Body>
              <div className={`${Styles.flex} ${Styles.addsearchrow} `}>
                <div  className={Styles.searchrow}><input type="search" placeholder='Search' /></div>
                <button  className={Styles.addbtn}>Add</button>
                </div>
                <div className={Styles.boxmailcontent}>
                    <div className={`${Styles.flex} ${Styles.mailtext} `}>
                        <div>babyruwqivrpqbhzme@cwmxc.com</div>
                        <button><img src="../../close-border.svg" alt="close" /></button>
                    </div>
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary" className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex} `}> Add Recipients
          <img  src="../../message.svg" alt="message.svg" /></Button>
        </OverlayTrigger>
      ))}
    </div>
    <div className={Styles.searchbox}>
        {['top'].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`searchpopover-positioned`}>
              
              <Popover.Body>
              <div className={`${Styles.flex} ${Styles.addsearchrow} `}>
                <div  className={Styles.searchrow}><input type="search" placeholder='Search' /></div>
                <button  className={Styles.addbtn}>Add</button>
                </div>
                <div className={Styles.boxmailcontent}>
                    <div className={`${Styles.flex} ${Styles.mailtext} `}>
                        <div>babyruwqivrpqbhzme@cwmxc.com</div>
                        <button><img src="../../close-border.svg" alt="close" /></button>
                    </div>
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary" className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex} `}> Add Bcc
          <img  src="../../message.svg" alt="message.svg" /></Button>
        </OverlayTrigger>
      ))}
    </div>
    <div className={Styles.searchbox}>
        {['top'].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`searchpopover-positioned`}>
              
              <Popover.Body>
              <div className={`${Styles.flex} ${Styles.addsearchrow} `}>
                <div  className={Styles.searchrow}><input type="search" placeholder='Search' /></div>
                <button  className={Styles.addbtn}>Add</button>
                </div>
                <div className={Styles.boxmailcontent}>
                    <div className={`${Styles.flex} ${Styles.mailtext} `}>
                        <div>babyruwqivrpqbhzme@cwmxc.com</div>
                        <button><img src="../../close-border.svg" alt="close" /></button>
                    </div>
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary" className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex} `}> Add Cc
          <img  src="../../message.svg" alt="message.svg" /></Button>
        </OverlayTrigger>
      ))}
    </div>
    </div>
    <div className={`${Styles.flex} ${Styles.rowrhtbtn} `}>
    <button type="submit" className={Styles.mainboxfooterbtn}>Submit</button>
    </div>
    </div>
    </div>
    </form>
    </>
    <div className={Styles.overlay}>
    </div>
    </div>
    </div>
    </div>
    </div>
);
};

export default QADealer;