'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import moment from 'moment';
import { Button } from 'react-bootstrap';
// Pages
import { handleHTMLContent } from '../../utils/htmlUtils';
import { formatDynamicOutput } from '../../utils/commenController'
import Loader from "../../components/commen/Loader/Loader";
import { useDashboard } from '../../contexts/layoutContext';
import CustomButton from '../../components/commen/FormElements/Button/Button';
import Styles from './visitreport.module.scss';
import { resolve } from 'path';

const VisitReportTemplate = ({ selectedData }) => {
  // session
  const session = useSession();
  const router = useRouter();
  const { selectedReportData, selectedDealer } = selectedData;
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [isLastTabSelected, setIsLastTabSelected] = useState(false);
  const [visitReportList, setVisitReportList] = useState([])
  const [selectedElement, setSelectedElement] = useState(null);
  const [isActive,setIsActive] = useState(false);
  const [formValues, setFormValues] = useState({
    txtDealershipName : selectedDealer.name,
  });
  const [loaderInSideBar, setLoaderInSideBar] = useState(false);
  const [selectedExistingVisitReportData, setSelectedExistingVisitReportData] = useState({})
  const [isReadOnly, setIsReadOnly] = useState(false);
  // useRef
  const liTagNewFormRef = useRef(null);
  const apiHandleRef = useRef({
    visitReportList : false
  })
  // useContext
  const { setGoBackToPage, goBackToPage } = useDashboard();

  // Toggle the display of the image popup
  const menuClick = () => {
    const imagePopup = document.getElementById('addimagepopup');
    if (imagePopup.style.display === 'block') {
      imagePopup.style.display = 'none';
      document.body.classList.remove(Styles.bodyOverlayActive);
    } else {
      imagePopup.style.display = 'block';
      document.body.classList.add(Styles.bodyOverlayActive);
    }
  };

  // Toggle the display of the search popup
  const btnClick = () => {
    const searchPopup = document.getElementById('searchboxpopup');
    if (searchPopup.style.display === 'none') {
      searchPopup.style.display = 'block';
    } else {
      searchPopup.style.display = 'none';
    }
  };

  // Hide the image options and close the image popup
  const cancel = () => {
    document.getElementsByClassName('imageoption').style.display = 'none';
    setImagePopupVisible(false);
  };

  // Memoize formData to avoid unnecessary re-renders
  const formData = useMemo(() => selectedReportData, [selectedReportData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      // let formInputValue = 'txt1@@1,ta2@@,chk3@@1,chk3@@2,chk3@@3,rd4@@2,lst5@@1,lbl6@@1'
      // Retrieve the input value
      let formInputValue = document.getElementById('strFormControlInfo').value;
      let elementIds = formInputValue.split(',');
      // Split the input string at '@@1' to get an array of IDs without suffixes
      let cleanIds = elementIds.map(item => item.split('@@'));
      //   let cleanIds = [
      //     [
      //         "txt1",
      //         "1"
      //     ],
      //     [
      //         "ta2",
      //         ""
      //     ],
      //     [
      //         "chk3",
      //         "1"
      //     ],
      //     [
      //       "chk3",
      //       "2"
      //     ],
      //      [
      //       "chk3",
      //       "3"
      //     ],
      //     [
      //         "rd4",
      //         "2"
      //     ],
      //     [
      //         "lst5",
      //         "1"
      //     ],
      //     [
      //         "lbl6",
      //         "1"
      //     ]
      // ]
    
      let valuesArray = [];
      let elementContent = '';
    
      // Iterate through the filtered list of IDs
      for (let i = 0; i < cleanIds.length; i++) {
        // Trim any spaces from the ID
        const elementId = cleanIds[i][0].trim();
    
        // Check if the ID starts with 'spn'
        if (elementId.substring(0, 3) === 'spn') {

          elementContent = document.getElementById(elementId)?.textContent ?? '';
        }else if(elementId.substring(0, 3) === 'chk'){

          let arrLength = cleanIds[i][1];
          for(let i=1; i<=arrLength ; i++){

            let chkBox = document.getElementById(`${elementId}${i}`)?.checked ?? false;
            if(chkBox){

              elementContent = chkBox;
            }else{

              elementContent = '';
            }
          }
        }else if(elementId.substring(0, 3) === 'tcc'){

          let completedChk = document.getElementById(`${elementId}`)?.checked || '';
          if(completedChk){

            elementContent = 'Yes';
          }
          else{

            elementContent = 'No';
          }
        }else if(elementId.substring(0, 2) === 'rd'){

            let arrLength = cleanIds[i][1];
            for(let i=1; i<=arrLength ; i++){

              elementContent = document.getElementById(`${elementId}${i}`)?.value || '';
            }
        } else {    

            elementContent = document.getElementById(elementId)?.value || '';

        }
        valuesArray.push(elementContent);
      }
      // flagTabbedView === 'N'
      let txtDateTimeElement = '';
      let txtDealershipNameElement = '';
      let lstDealershipStatus ='';
      let packExpiryDate = '';
      let txtAttendees = '';

      // flagTabbedView === 'Y'
      let txtDealerSignature = '';
      let txtScfSignature = '';
      let nextReviewDate = '';
      let totalquestioncount = document.getElementById('totalquestioncount')?.value || ''

      // Case  flagTabbedView === 'N'
      if(formData?.flagTabbedView === 'N'){

          txtDateTimeElement = document.querySelector('input[name="txtDateTime"]')?.value || '';
          txtDealershipNameElement = document.querySelector('input[name="txtDealershipName"]')?.value || '';
          lstDealershipStatus = document.getElementById('lstDealershipStatus')?.value || '';
          packExpiryDate  = document.getElementById('txtPackExpiryDate')?.value || '';
          txtAttendees = document.getElementById('txtAttendees')?.value || '';
      }

      // Case  flagTabbedView === 'Y' Last tab compleated report section 
      if(formData?.flagTabbedView === 'Y'){

          txtDealerSignature = document.getElementById('txtDealerSignature')?.value  || '';
          txtScfSignature = document.getElementById('txtScfSignature')?.value || '';
          nextReviewDate = document.getElementById('nextReviewDate')?.value || '';
          const now = moment();
          // Format the date and time as DD/MM/YYYY HH:mm:ss
          txtDateTimeElement = now.format('DD/MM/YYYY HH:mm:ss');
      }

      const formControlListId = formInputValue
      // Join the items with `^@^` as the separator
      const formControlResult  = await formatDynamicOutput(valuesArray)
      // output
      console.log('formControlListId',formControlListId);
      console.log("formControlResult",formControlResult);
      const userId = session.data?.user?.id;
      if (!userId) {
          throw new Error('User ID not found');
      }
      let dealershipid  = selectedDealer?.id;
      let dealershipname = selectedDealer?.name;
      if(selectedDealer?.flagdealergroup  == 'Y'){
        dealershipid = selectedDealer.dealerGroupId
        dealershipname = selectedDealer.dealerGroupName
      }
      let reviewDate = formValues?.reviewDate
      if(reviewDate){
        reviewDate = moment(reviewDate,'YYYY-MM-DD').format('DD/MM/YYYY')
      }
      // _____REQUEST BODY______
      let requestBodyObj = {
        body : {
          userid : userId,
          formid1 : selectedReportData?.formId || '',
          formname1  : selectedReportData?.formName || '',
          dealershipid1 : dealershipid || '',
          dealershipname1 : dealershipname || '',
          lstDealershipStatus1 : lstDealershipStatus,
          txtPackExpiryDate1 : packExpiryDate,
          txtAttendees1 : txtAttendees,
          dateandtime1 : txtDateTimeElement,
          formresult1 : formControlResult,
          emailaddresslist1 : '',
          emailaddresslistbcc1 : '',
          emailaddresslistcc1 : '',
          flagtabbedview1 : selectedReportData?.flagTabbedView || '',
          flagHealthCheck1 : selectedReportData?.flagHealthCheck || '',
          txtDealerSignature1 :txtDealerSignature || '',
          txtRMSignature1 : '',
          txtScfSignature1 : txtScfSignature || '',
          nextReviewDate1 : nextReviewDate || '',
          flagdealergroup1 : selectedDealer?.flagdealergroup || '',
          reviewdate1 : reviewDate || '',
          reviewperiod1 : '',
          dealerattendees1 : formValues?.dealerAttendees || '',
          scukattendees1 : formValues?.scukAttendees || '',
          supportStatus1 : '',
          oemAttendees1 : '',
          totalquestioncount1 : totalquestioncount,
          strFormControlInfo1 : formControlListId || '',
          emailContent : false,
          totalresult : 1
        }
      }
      console.log("request obj",requestBodyObj);
      
      let response = await axios.post('/api/visitReports/postDealershipVisitReport',requestBodyObj);
      if(response.data.result.root.status){
        router.push("/home");
      }
    }catch(error){
      console.log("eroor ->",error);
    }
  };
  
  useEffect(()=>{
    if(formData?.flagTabbedView === 'N'){

        // Get the input element by its name attribute
        const txtDateTimeElement = document.querySelector('input[name="txtDateTime"]');
        const txtDealershipNameElement = document.querySelector('input[name="txtDealershipName"]');   
        
        if (txtDateTimeElement) {

            const now = moment();
            // Format the date and time as DD/MM/YYYY HH:mm:ss
            const formattedDateTime = now.format('DD/MM/YYYY HH:mm:ss');
            txtDateTimeElement.value = formattedDateTime;
        }
        if(txtDealershipNameElement){

            txtDealershipNameElement.value = formData?.formName;
        }
    }
  })

  // Handle HTML content injection on formData change
  useEffect(() => {
    if (formData?.formInfo && (!goBackToPage.pageFour && selectedReportData.flagTabbedView == 'N')) {

        handleHTMLContent(formData.formInfo, 'root');
    }
    if((!goBackToPage.pageFour && selectedReportData.flagTabbedView == 'Y')){

      let rootId  =  document.getElementById('root')
      rootId.innerHTML = ''
    }
  }, [formData?.formInfo,goBackToPage.pageFour]);

  useEffect(() => {
    if (formData?.flagTabbedView === 'Y') {
        setIsLastTabSelected(false);
    } else {
        setIsLastTabSelected(true);
    }
  }, [formData]);

  // Function for handle tab click
  const handleTabClick = (event) => {
    event.preventDefault();
    console.log("Tab Clicked*-----------------------");

    const target = event.target.closest('a');
    if (target) {
      const rel = target.getAttribute('rel');
      const tabs = Array.from(document.querySelectorAll('#tb2 li a'));
      const lastTab = tabs[tabs.length - 1];

      const isSelected = lastTab.classList.contains('selected');
      if (lastTab.getAttribute('rel') === rel && isSelected) {
        setIsLastTabSelected(isSelected);
      } else {
        setIsLastTabSelected(false);
      }
    }
  };

  useEffect(() => {
    const tabs = document.querySelectorAll('#tb2 li a');
    tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
    
    // Cleanup: Remove event listeners when the component unmounts or dependencies change
    return () => {
      tabs.forEach(tab => tab.removeEventListener('click', handleTabClick));
    };
  },[isActive]);

  // useEffect(() => {
  //   const handleTabClick = (event) => {
  //     event.preventDefault(); 
  //     console.log("Tab Clicked*-----------------------");

  //     const target = event.target.closest('a');
  //     if (target) {
  //       const rel = target.getAttribute('rel');
  //       const tabs = Array.from(document.querySelectorAll('#tb2 li a'));
  //       const lastTab = tabs[tabs.length - 1];

  //       const isSelected = lastTab.classList.contains('selected');
  //       if (lastTab.getAttribute('rel') === rel && isSelected) {
  //         setIsLastTabSelected(isSelected);
  //       } else {
  //         setIsLastTabSelected(false);
  //       }
  //     }
  //   };

  //   if (formData?.flagTabbedView === 'Y') {
  //     const tabs = document.querySelectorAll('#tb2 li a');
  //     tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
      
  //     // Cleanup: Remove event listeners when the component unmounts or dependencies change
  //     return () => {
  //       tabs.forEach(tab => tab.removeEventListener('click', handleTabClick));
  //     };
  //   } else {
  //     setIsLastTabSelected(true);
  //   }
  // });
  
  
  // Handle Review date
  useEffect(() => {
    const now = new Date();
    // Format the date as YYYY-MM-DD (or other desired format)
    const formattedDate = now.toISOString().split('T')[0];
    // Set the value of the input field to the current date
    if (Object.keys(selectedExistingVisitReportData).length ==0) {
      setFormValues((prev)=>({...prev, reviewDate : formattedDate}))
    }
  }, [goBackToPage.pageFour]); 

  // Function for handle onchangFunctionality
  const handleFormChange = (name, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Save visit report form in local storage
  const handleVisitReortFormSaveButton = (e) => {
    e.preventDefault();
    localStorage.setItem('visitReportForm',JSON.stringify(formValues))
  };
  
  // For fetching the visit report list
  async function getVisitReportList(){
      try {

        const userId = session.data?.user?.id;
        if (!userId) {
            throw new Error('User ID not found');
        }
        // selectedReportData selectedDealer
        const { flagdealergroup, id, dealerGroupId} = selectedDealer
        const { flagTabbedView , flagHealthCheck, formId   } = selectedReportData

        let dealershipid  = id;
        if(selectedDealer?.flagdealergroup  == 'Y'){
          dealershipid = dealerGroupId;
        }

        let requestBodyObj = {
          body : {
            flagdealergroup: flagdealergroup,
            flagtabbedview: flagTabbedView,
            flagHealthCheck: flagHealthCheck,
            formid: formId,
            dealershipid: dealershipid,
          }
        };
        setLoaderInSideBar(true);
        const response = await axios.post(`/api/visitReports/visitReportsList?userId=${userId}`,requestBodyObj);
       
        if (response.data.result?.root.status == '1') {
          setVisitReportList(response.data.result.root.reportLists)
        }
      } catch (error) {
          console.log("Error:->", error.message);
      }finally{
        setLoaderInSideBar(false);
      }
  }

  // Visit report lists
  useEffect(()=>{
    if(session.data?.user?.id && !apiHandleRef.current.visitReportList){
      apiHandleRef.current.visitReportList = true;
      getVisitReportList()
    }
  },[session.data?.user?.id])

  // Fuction for handle exisiting visit report data 
  const handleSelectExistingVisitReportData = (e,item) =>{
    setIsActive(!isActive)

    // Add class 
    if (selectedElement) {
      selectedElement.classList.remove(Styles.listhead);
    }

    e.currentTarget.classList.add(Styles.listhead);
    setSelectedElement(e.currentTarget);

    if(goBackToPage.pageFour){

        // _____________Tabbed view
        setIsLastTabSelected(false);
        handleHTMLContent(item.formdata, 'root');

    }else if(selectedReportData.flagTabbedView == 'N'){

        handleHTMLContent(item.formdata, 'root');

    }else{

        let formattedReviewDate = item.reviewdate ? moment(item.reviewdate,'DD/MM/YYYY').format('YYYY-MM-DD') : '';
        if(Object.keys(item).length !== 0){
            setSelectedExistingVisitReportData(item);
            setIsReadOnly(true)
            setFormValues((prev) =>({
              ...prev,
              reviewDate : formattedReviewDate,
              txtDealershipName : item.dealershipname || '',
              dealerAttendees : item.dealerattendees || '',
              scukAttendees : item.scukattendees || ''
            }))
        }
      
    }
  }


  const handleClickNewForm = () =>{

    setIsActive(!isActive)
    console.log("New form clicked");
    
    // Handle li click selected style
    if (selectedElement) {
      selectedElement.classList.remove(Styles.listhead);
    }

      liTagNewFormRef.current.classList.add(Styles.listhead);
      setSelectedElement(liTagNewFormRef.current);

    if(goBackToPage.pageFour && formData?.formInfo ){
      // __________________Tabbbed view exisiting data_______________
      setIsLastTabSelected(false);
      handleHTMLContent(formData?.formInfo , 'root');
    }else if(selectedReportData.flagTabbedView == 'N'){
      handleHTMLContent(formData?.formInfo , 'root');
    }else{
      
      const now = new Date();
      // Format the date as YYYY-MM-DD (or other desired format)
      const formattedDate = now.toISOString().split('T')[0];
      setSelectedExistingVisitReportData({});
      setIsReadOnly(false);
      let txtDealershipName = selectedDealer.name;
      if(selectedDealer.flagdealergroup = 'Y'){
        txtDealershipName = selectedDealer.dealerGroupName
      }
      setFormValues((prev) =>({
        ...prev,
        reviewDate : formattedDate,
        txtDealershipName :  txtDealershipName,
        dealerAttendees :  '',
        scukAttendees :  ''
      }))  
    }
  }

  useEffect(() => {
    // Select "New  Form li tag" by default
    if (liTagNewFormRef.current) {
        liTagNewFormRef.current.classList.add(Styles.listhead);
        setSelectedElement(liTagNewFormRef.current);
    }

    // Fetch saved form data from the local storage
    let getFormData = JSON.parse(localStorage.getItem('visitReportForm'));
    const now = new Date();
    // Format the date as YYYY-MM-DD (or other desired format)
    const formattedDate = now.toISOString().split('T')[0];
    let txtDealershipName = selectedDealer.name;
    if(selectedDealer.flagdealergroup = 'Y'){
      txtDealershipName = selectedDealer.dealerGroupName
    }
    setFormValues((prev) => ({
      ...prev,
      reviewDate: getFormData?.reviewDate || formattedDate,
      dealerAttendees: getFormData?.dealerAttendees ,
      scukAttendees: getFormData?.scukAttendees,
      txtDealershipName: getFormData?.txtDealershipName || txtDealershipName
    }));

  }, []);

  // Continue button
  const handleContinueButton = () =>{
    setGoBackToPage((prev)=>({...prev,pageFour : true}));
    if(Object.keys(selectedExistingVisitReportData).length !==0){
      
      handleHTMLContent(selectedExistingVisitReportData.formdata, 'root');
      setIsActive(!isActive);
    }else{

      handleHTMLContent(formData.formInfo, 'root');
      setIsActive(!isActive);
    }
  }
console.log("selectedDealer",selectedDealer);

  return (
    <div className={Styles.bgcolor}>
      <div className={`${Styles.container} ${Styles.innerpgcntnt}`}>
        {/* Visit Name Section */}
        <div className={Styles.visitnamebx}>
          <div className={Styles.titlebx}>Visit Name</div>
          <div className={Styles.listitems}>
            <ul className={`${Styles.listcntnt} ${Styles.listiconhide}`}>
              <li onClick={handleClickNewForm} ref={liTagNewFormRef}  className={`${Styles.listhead} ${Styles.toplist}`}><a>New Form</a></li>
              {loaderInSideBar ? (
                <Loader />
              ) : (
                visitReportList.length !== 0 && (
                  <ul>
                    {visitReportList?.map((item, index) => (
                      <li key={index} onClick={(e) => handleSelectExistingVisitReportData(e, item)}>
                        {item.dateandtime} - Sent
                      </li>
                    ))}
                  </ul>
                )
              )}

        
            </ul>
          </div>
        </div>
        {/* Form Detail Section */}
        <div className={Styles.detailbx}>
        <div className={Styles.titlebx}>
          {`${selectedDealer?.name || selectedDealer?.dealerGroupName} - ${selectedReportData?.formName}`}
        </div>
          <div className={`${Styles.contentwhtbx} ${Styles.contentwhtbxfooter}`}>
            {/* Visit report form */}
            {(!goBackToPage.pageFour && selectedReportData.flagTabbedView == 'Y') && 
            <VisitReportForm 
              handleContinueButton={handleContinueButton}  
              handleSaveButton={handleVisitReortFormSaveButton}
              handleFormChange={handleFormChange}
              formValues={formValues} 
              formData={formData}
              isReadOnly={isReadOnly}
            />}
            <div id="root"></div>
            {(goBackToPage.pageFour || (!goBackToPage.pageFour && selectedReportData.flagTabbedView == 'N')) && <>
              {/* Placeholder for dynamic HTML content */}
              {/* Footer with Buttons */}
              {isLastTabSelected && <div className={Styles.mainboxfooter}>
                <div className={`${Styles.flex} ${Styles.btnrow}`}>
                  {/* Image Add Option */}
                  {formData.flagImage == 'Y' && <div className={Styles.imageaddoption}>
                    <CustomButton
                      type="button" 
                      onClick={menuClick}
                      className={`${Styles.imagechoosebtn}  ${Styles.flex}`}
                    >
                      Add Images <img src="../../addimage.svg" alt="message.svg" />
                    </CustomButton>
                    <div id="addimagepopup" className={Styles.addimagepopup}>
                      <div className={`${Styles.flex} ${Styles.imageoption}`}>
                        {['top', 'top', 'top'].map((placement) => (
                          <OverlayTrigger
                            trigger="click"
                            key={placement}
                            placement={placement}
                            overlay={
                              <Popover id={`popover-positioned-${placement}`}>
                                <Popover.Body>
                                  <div>
                                    <button
                                      id="addimagecntntlink"
                                      type="button"
                                    >
                                      Camera Roll
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      id="addimagecntntlink"
                                      type="button"
                                    >
                                      Take A Photo
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      id="addimagecntntlink"
                                      className={Styles.addimagecntntlink}
                                      onClick={cancel}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </Popover.Body>
                              </Popover>
                            }
                          >
                            <button type='button'>
                              <img src="../../addmedia.svg" alt="" />
                            </button>
                          </OverlayTrigger>
                        ))}
                      </div>
                    </div>
                  </div>}          
                </div>

                {/* Recipient Options */}
                <div className={`${Styles.flex} ${Styles.btnrow}`}>
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                    {/* Add Recipients Button */}
                    {formData.flagRecipient === 'Y' && (
                      <div className={Styles.searchbox}>
                        {['top'].map((placement) => (
                          <OverlayTrigger
                            trigger="click"
                            key={placement}
                            placement={placement}
                            overlay={
                              <Popover id={`searchpopover-positioned`}>
                                <Popover.Body>
                                  <div className={`${Styles.flex} ${Styles.addsearchrow}`}>
                                    <div className={Styles.searchrow}>
                                      <input type="search" placeholder="Search" />
                                    </div>
                                    <button type="button" className={Styles.addbtn}>
                                      Add
                                    </button>
                                  </div>
                                  <div className={Styles.boxmailcontent}>
                                    <div className={`${Styles.flex} ${Styles.mailtext}`}>
                                      <div>babyruwqivrpqbhzme@cwmxc.com</div>
                                      <button type="button">
                                        <img src="../../close-border.svg" alt="close" />
                                      </button>
                                    </div>
                                  </div>
                                </Popover.Body>
                              </Popover>
                            }
                          >
                          <CustomButton
                              type="button"
                              id="recipientsbtn"
                              className={`${Styles.recipientsbtn} ${Styles.flex}`}
                            >
                              Add Recipients <img src="../../message.svg" alt="message" />
                            </CustomButton>
                          </OverlayTrigger>
                        ))}
                      </div>
                    )}

                    {/* Add Bcc Button */}
                    {formData.flagRecipient == 'Y' &&<div className={Styles.searchbox}>
                      {['top'].map((placement) => (
                        <OverlayTrigger
                          trigger="click"
                          key={placement}
                          placement={placement}
                          overlay={
                            <Popover id={`searchpopover-positioned`}>
                              <Popover.Body>
                                <div className={`${Styles.flex} ${Styles.addsearchrow}`}>
                                  <div className={Styles.searchrow}>
                                    <input type="search" placeholder='Search' />
                                  </div>
                                  <button
                                    type="button"
                                    className={Styles.addbtn}
                                  >
                                    Add
                                  </button>
                                </div>
                                <div className={Styles.boxmailcontent}>
                                  <div className={`${Styles.flex} ${Styles.mailtext}`}>
                                    <div>babyruwqivrpqbhzme@cwmxc.com</div>
                                    <button type="button">
                                      <img src="../../close-border.svg" alt="close" />
                                    </button>
                                  </div>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                           <CustomButton
                            type="button"
                            className={`${Styles.recipientsbtn}  ${Styles.flex}`}
                          >
                            Add Bcc <img src="../../message.svg" alt="message.svg" />
                          </CustomButton>
                        </OverlayTrigger>
                      ))}
                    </div>}

                    {/* Add Cc Button */}
                    {formData.flagRecipient == 'Y' &&<div className={Styles.searchbox}>
                      {['top'].map((placement) => (
                        <OverlayTrigger
                          trigger="click"
                          key={placement}
                          placement={placement}
                          overlay={
                            <Popover id={`searchpopover-positioned`}>
                              <Popover.Body>
                                <div className={`${Styles.flex} ${Styles.addsearchrow}`}>
                                  <div className={Styles.searchrow}>
                                    <input type="search" placeholder='Search' />
                                  </div>
                                  <button
                                    type="button"
                                    className={Styles.addbtn}
                                  >
                                    Add
                                  </button>
                                </div>
                                <div className={Styles.boxmailcontent}>
                                  <div className={`${Styles.flex} ${Styles.mailtext}`}>
                                    <div>babyruwqivrpqbhzme@cwmxc.com</div>
                                    <button type="button">
                                      <img src="../../close-border.svg" alt="close" />
                                    </button>
                                  </div>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                           <CustomButton
                            type="button"
                            className={`${Styles.recipientsbtn}  ${Styles.flex}`}
                          >
                            Add Cc <img src="../../message.svg" alt="message.svg" />
                          </CustomButton>
                        </OverlayTrigger>
                      ))}
                    </div>}
                  </div>

                  {/* Action Buttons */}
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                  <CustomButton
                      type="button"
                    >
                      Save
                    </CustomButton>
                    <CustomButton
                      type="button"
                    >
                      Cancel
                    </CustomButton>
                    <CustomButton type="submit"      onClick={handleSubmit}>
                      Submit
                    </CustomButton>
                  </div>
                </div>
              </div>}
            </>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitReportTemplate;


function VisitReportForm({handleContinueButton, handleSaveButton,
handleFormChange,formValues,formData,isReadOnly}){
console.log("formValues",formValues);

  return(
    <>
        <form >
          <table className={Styles.detailtbl}>
            <tbody>
              <tr>
                <td>Review Date</td>
                <td>
                   <input 
                      className={Styles.tblinputbx} 
                      type="date"  
                      value={formValues.reviewDate}
                      readOnly={isReadOnly}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleFormChange('reviewDate', e.target.value)}
                   />
                </td>
              </tr>
              <tr>
                <td>{formData.flagHealthCheck == 'Y' ? 'Dealer' : 'Review Period'}</td>
                <td>
                   <input 
                      className={Styles.tblinputbx} 
                      value={formValues.txtDealershipName} 
                      readOnly 
                      type="text" 
                    />
                </td>
              </tr>
              <tr>
                <td>Dealer Attendees</td>
                <td>
                  <textarea 
                    className={Styles.tblinputbx} 
                    type="text"
                    value={formValues.dealerAttendees}
                    readOnly={isReadOnly}
                    onChange={(e) => handleFormChange('dealerAttendees', e.target.value)}
                  />     
                </td>
              </tr>
              <tr>
                <td>SCUK Attendees</td>
                <td>
                <textarea 
                  className={Styles.tblinputbx} 
                  type="text"
                  value={formValues.scukAttendees}
                  readOnly={isReadOnly}
                  onChange={(e) => handleFormChange('scukAttendees', e.target.value)}
                />
                </td>
              </tr>
              {/* Footer */}
              <div className={Styles.mainboxfooter}>
                <div className={`${Styles.flex} ${Styles.btnrow}`}>
                  {/* Action Buttons */}
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                    <CustomButton
                      type="button"
                      onClick={handleSaveButton}
                    >
                      Save
                    </CustomButton>
                    <CustomButton
                      type="button"
                    >
                      Cancel
                    </CustomButton>
                    <CustomButton
                      type="button"
                      onClick={handleContinueButton}
                    >
                      Continue
                    </CustomButton>
                  </div>
                </div>
              </div>
            </tbody>
          </table>
        </form>

    </>
  )
}