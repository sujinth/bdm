'use client'
import React, { useState } from 'react';
import { Button} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Styles from './visitreport.module.scss';
import DynamicForm  from '../../components/commen/FormElements/dynamicForm'

    const VisitReportTemplate = ({selectedVisitReportData}) => {
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
        
        const controls = [
            {formFieldId : '1', },
            {formFieldId : '2', answer : 'label'},
            {formFieldId : '3', },
            {formFieldId : '4', },
            {formFieldId : '5', },
            {formFieldId : '6', },
            // { type: "5", options: ["Option 1", "Option 2"] },
            // { type: "3", options: ["Checkbox 1", "Checkbox 2"] },
            // { type: "4", options: ["Radio 1", "Radio 2"] },
        ];
        const initialValues = {
          1: 'Existing Value 1' || "",
          2: "" ,
          3 : "Existing Value3" || ""
          // ctrl1: 'Existing Value 2',
          // Add other initial values here
        };


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
        <div dangerouslySetInnerHTML={{ __html: selectedVisitReportData?.formInfo }} />
    </>
    <div className={Styles.overlay}>
    </div>
    </div>
    </div>
    </div>
    </div>
);
};

export default VisitReportTemplate;