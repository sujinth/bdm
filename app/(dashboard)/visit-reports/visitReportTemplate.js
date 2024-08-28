'use client';

import React, { useMemo, useState, useRef, useEffect ,memo} from 'react';
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
import { usePopupContent } from "@/app/contexts/popupContext";
import { useDashboard } from '../../contexts/layoutContext';
import CustomButton from '../../components/commen/FormElements/Button/Button';
import Loader from "../../components/commen/Loader/Loader";
import Styles from './visitreport.module.scss';


const VisitReportTemplate = ({ selectedData }) => {

  const ABSPATH = process.env.NEXT_PUBLIC_APP_PUBLIC_ABSPATH;
  const { selectedReportData, selectedDealer } = selectedData;

  // session
  const session = useSession();
  const router = useRouter();
  // useContext
  const { setPopupContent, handleClick} = usePopupContent();
  const { setGoBackToPage, goBackToPage } = useDashboard();
  // States
  const [isLastTabSelected, setIsLastTabSelected] = useState(false);
  const [visitReportList, setVisitReportList] = useState([])
  const [selectedElement, setSelectedElement] = useState(null);
  const [isActive,setIsActive] = useState(false);
  const [loaderInSideBar, setLoaderInSideBar] = useState(false);
  const [selectedExistingVisitReportData, setSelectedExistingVisitReportData] = useState({})
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isActiveFollowUpReport, setIsActiveFollowUpReport] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [isRemovedSavedData, setIsRemovedSavedData] = useState(false)
  const [recipients, setRecipients] = useState({
    recipientList : [],
    recipientBccList : [],
    recipientCcList : []
  })
  const [imageList, setImageList] = useState({
    image11 : '',
    image12 : '',
    image13 : ''
  })
  
  // useRef
  const liTagNewFormRef = useRef(null);
  const apiHandleRef = useRef({
    visitReportList : false
  })

  // Memoize formData to avoid unnecessary re-renders
  const formData = useMemo(() => selectedReportData, [selectedReportData]);

  // Case flagTabbedView = false  setting the date time and dealership name
  useEffect(()=>{
    if(formData?.flagTabbedView === 'N'){

        // Get the input element by its name attribute
        const txtDateTimeElement = document.querySelector('input[name="txtDateTime"]');
        const txtDealershipNameElement = document.querySelector('input[name="txtDealershipName"]');   
        
        if (txtDateTimeElement) {

            // Format the date and time as DD/MM/YYYY HH:mm:ss
            const now = moment();
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

  // Handle tab state of tab selected
  useEffect(() => {
    if (formData?.flagTabbedView === 'Y') {
        setIsLastTabSelected(false);
    } else {
        setIsLastTabSelected(true);
    }
  }, [formData]);

  useEffect(() => {
    const tabs = document.querySelectorAll('#tb2 li a');
    tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
    
    // Cleanup: Remove event listeners when the component unmounts or dependencies change
    return () => {
      tabs.forEach(tab => tab.removeEventListener('click', handleTabClick));
    };
  },[isActive]);
  
  // Get visit report lists
  useEffect(()=>{
    if(session.data?.user?.id && !apiHandleRef.current.visitReportList){
      apiHandleRef.current.visitReportList = true;
      getVisitReportList()
    }
  },[session.data?.user?.id])
  
  // Initially set saved data from local storage
  useEffect(()=>{
    initiallyFetchSavedFormDataStorage()
  },[session.data?.user?.id,goBackToPage.pageFour,selectedExistingVisitReportData])

  // While canceling the saved data this useEffect will render
  useEffect(()=>{
    if(isRemovedSavedData){
      handleHTMLContent(formData.formInfo, 'root');
      if(selectedReportData.flagTabbedView == 'Y' ){
          setIsLastTabSelected(false);
        }
        setIsRemovedSavedData(false);
        setIsActive(!isActive)
     }
  },[selectedExistingVisitReportData,isRemovedSavedData])

  // Attach recipient existing data to into initial state
  useEffect(()=>{
    if(Object.keys(selectedExistingVisitReportData).length !== 0 && goBackToPage.pageFour){
        if(selectedExistingVisitReportData?.emailaddresslist){
            setRecipients((prev)=>({...prev,recipientList : selectedExistingVisitReportData?.emailaddresslist.split(',')}))
        }
        if(selectedExistingVisitReportData?.emailaddresslistbcc){
          setRecipients((prev)=>({...prev,recipientBccList : selectedExistingVisitReportData?.emailaddresslistbcc.split(',')}))
        }
        if(selectedExistingVisitReportData?.emailaddresslistcc){
          setRecipients((prev)=>({...prev,recipientCcList : selectedExistingVisitReportData?.emailaddresslistcc.split(',')}))
        }
    }
    
  },[selectedExistingVisitReportData,goBackToPage.pageFour])

  useEffect(()=>{
    if((isActiveFollowUpReport && goBackToPage.pageFour) || (isActiveFollowUpReport && formData.flagTabbedView == 'N')){
        handleHTMLContent(selectedExistingVisitReportData.newFormdata, 'root');
        setIsActive(!isActive);
    }
    if(!goBackToPage.pageFour && formData?.flagTabbedView === 'Y'){
       setIsLastTabSelected(false);
    }
    if(Object.keys(selectedExistingVisitReportData).length ==0 && !goBackToPage.pageFour && formData?.flagTabbedView === 'Y'){
      setFormValuesFromLocalStorage();
    }
  },[goBackToPage.pageFour,isActiveFollowUpReport,selectedExistingVisitReportData])
  
  // Function for clear previous image state and recipient state
  const clearPreviousState= () =>{
    setIsActiveFollowUpReport(false);
    setImageList((prev)=>(
      {...prev,image11 : '', image12 : '', image13 : ''}
    ))
    setRecipients((prev)=>(
      {...prev,recipientList : [], recipientBccList : [], recipientCcList : []}
    ))
  }

  // Function for get form element values
  const fetchFormElementValues = async()=>{

      // Retrieve the input value
      let formElementIdList = document.getElementById('strFormControlInfo').value;
      let elementIds = formElementIdList.split(',');


      // Split the input string at '@@1' to get an array of IDs without suffixes
      let cleanIds = elementIds.map(item => item.split('@@'));

      let valuesArray = [];
      let elementContent = '';
      let formElementIdUpdatedList = ''
      // Iterate through the filtered list of IDs
      for (let i = 0; i < cleanIds.length; i++) {
        // Trim any spaces from the ID
        const elementId = cleanIds[i][0].trim();
    
        // Check if the ID starts with 'spn'
        if (elementId.substring(0, 3) === 'spn') {
          formElementIdUpdatedList+=`${elementId}@@,`
          elementContent = document.getElementById(elementId)?.textContent ?? '';
        }else if(elementId.substring(0, 3) === 'chk'){

          let arrLength = cleanIds[i][1];
          let eleId = ''
          for(let j=1; j<=arrLength ; j++){
           
            let chkBox = document.getElementById(`${elementId}${j}`)?.checked ?? false;
            if(chkBox){
              eleId =`${elementId}@@${j},`
              elementContent = chkBox;
              break
            }else{
              eleId =`${elementId}@@${cleanIds[i][1]},`
              elementContent = '';
            }
          }
          formElementIdUpdatedList += eleId
        }else if(elementId.substring(0, 3) === 'tcc'){

          let completedChk = document.getElementById(`${elementId}`)?.checked || '';
          if(completedChk){
           
            elementContent = 'Yes';
          }
          else{
            elementContent = 'No';
          }
          formElementIdUpdatedList += `${elementId}@@,`
        }else if(elementId.substring(0, 2) === 'rd'){
            let arrLength = cleanIds[i][1];
             let eleId = ''
            for(let j=1; j<=arrLength ; j++){
              let element  = document.getElementById(`${elementId}${j}`)
              if(element?.checked){
                eleId =`${elementId}@@${j},`
                // elementId
                elementContent = document.getElementById(`${elementId}${j}`)?.value || '';
                break
              }else{
                eleId =`${elementId}@@${cleanIds[i][1]},`
              }
            }
            formElementIdUpdatedList += eleId
        } else {    
            if(i !== (cleanIds.length -1)){
              formElementIdUpdatedList += `${elementId}@@${cleanIds[i][1]},`
            }else[
              formElementIdUpdatedList += `${elementId}@@${cleanIds[i][1]}`
            ]
            elementContent = document.getElementById(elementId)?.value || '';

        }
        valuesArray.push(elementContent);
      }

      // flagTabbedView === 'N'
      let txtDateTimeElement = '';
      let lstDealershipStatus ='';
      let packExpiryDate = '';
      let txtAttendees = '';

      // flagTabbedView === 'Y'
      let txtDealerSignature = '';
      let txtRMSignature = '';
      let txtScfSignature = '';
      let nextReviewDate = '';
      let totalquestioncount = document.getElementById('totalquestioncount')?.value || ''

      // Case  flagTabbedView === 'N'
      if(formData?.flagTabbedView === 'N'){

          txtDateTimeElement = document.querySelector('input[name="txtDateTime"]')?.value || '';
          lstDealershipStatus = document.getElementById('lstDealershipStatus')?.value || '';
          packExpiryDate  = document.getElementById('txtPackExpiryDate')?.value || '';
          txtAttendees = document.getElementById('txtAttendees')?.value || '';
      }

      // Case  flagTabbedView === 'Y' Last tab compleated report section 
      if(formData?.flagTabbedView === 'Y'){

          txtDealerSignature = document.getElementById('txtDealerSignature')?.value  || '';
          txtRMSignature = document.getElementById('txtRMSignature')?.value  || ''
          txtScfSignature = document.getElementById('txtScfSignature')?.value || '';
          nextReviewDate = document.getElementById('nextReviewDate')?.value || '';
          const now = moment();
          // Format the date and time as DD/MM/YYYY HH:mm:ss
          txtDateTimeElement = now.format('DD/MM/YYYY HH:mm:ss');
      }

      const formControlListId = formElementIdUpdatedList

      // Join the items with `^@^` as the separator
      const formControlResult  = await formatDynamicOutput(valuesArray);

      return {
        formControlListId, 
        formControlResult, 
        txtDateTimeElement, 
        lstDealershipStatus,
        packExpiryDate,
        txtAttendees,
        txtDealerSignature,
        txtRMSignature,
        txtScfSignature,
        nextReviewDate,
        totalquestioncount
      }
  }

  // Function for handle success alert
  const handleSubmitSuccesAlert =()=>{
        router.push("/home");
        handleClick();
  }

  // Function for send email 
  const sendEmailPopUp=()=>{
    setPopupContent((prevState) => ({
      ...prevState,
      titleContent: "",
      duelOption : true,
      detailContent: "Would you like to email these details ?",
      show: true,
      onClickNo : sendEmailNo,
      onClickYes : sendEmailYes
    }));
  }

  // Handle Function while clicking send mail Yes
  function sendEmailYes(){
    let { recipientList} = recipients;
    if(recipientList == ""){
        setPopupContent((prevState) => ({
          ...prevState,
          duelOption : false,
          detailContent: "At least one recepient required.",
          show: true,
          onClick : handleClick
        }));
    }else{
        let sendEmailFlag = true;
        setPopupContent((prevState) => ({
          ...prevState,
          detailContent: "",
          show: false,
        }));
        handleSubmit(sendEmailFlag);
    }
  }

  // Handle Function while clicking send mail No
  function sendEmailNo(){
      let sendEmailFlag = false;
      // handleClick();
      setPopupContent((prevState) => ({
        ...prevState,
        detailContent: "",
        show: false,
      }));
      handleSubmit(sendEmailFlag);
  }

  // Handle form submission
  const handleSubmit = async (sendEmailFlag) => {
    try{
      
      // fetch form values
      const {
        formControlListId, 
        formControlResult, 
        txtDateTimeElement, 
        lstDealershipStatus,
        packExpiryDate,
        txtAttendees,
        txtDealerSignature,
        txtRMSignature,
        txtScfSignature,
        nextReviewDate,
        totalquestioncount
      } = await fetchFormElementValues();

      //---------- user ID
      const userId = session.data?.user?.id;
      if (!userId) {
          throw new Error('User ID not found');
      }


      //--------- recipients
      let { recipientList, recipientBccList, recipientCcList} = recipients;
      recipientList = recipientList.join(',');
      recipientBccList = recipientBccList.join(',');
      recipientCcList = recipientCcList.join(',');

      // Clearing the recipients
      if(!sendEmailFlag){
          recipientList = "";
          recipientBccList = "";
          recipientCcList = ""
      }

      //----------Handle dealership name & dealership id 
      let dealershipName = selectedDealer?.name;
      let dealershipid  = selectedDealer?.id;

      if(selectedDealer.flagdealergroup == 'Y'){
           dealershipid = selectedDealer.dealerGroupId;
           dealershipName = selectedDealer.dealerGroupName
      }

      //----------Convert date format YYYY-MM-DD -> DD/MM/YYYY
      let reviewDate = formValues?.reviewDate;
      if(reviewDate){
        reviewDate = moment(reviewDate,'YYYY-MM-DD').format('DD/MM/YYYY')
      }

      // _____REQUEST BODY______
      let requestBodyObj = {
          userid : userId,
          cartid : selectedExistingVisitReportData?.cartid || "", 
          followUpCartId1 : selectedExistingVisitReportData?.cartid || "", 
          formid1 : selectedReportData?.formId || '',
          formname1  : selectedReportData?.formName || '',
          dealershipid1 : dealershipid || '',
          dealershipname1 : dealershipName || '',
          lstDealershipStatus1 : lstDealershipStatus,
          txtPackExpiryDate1 : packExpiryDate,
          txtAttendees1 : txtAttendees,
          dateandtime1 : txtDateTimeElement,
          formresult1 : formControlResult,
          emailaddresslist1 : recipientList || '',
          emailaddresslistbcc1 : recipientBccList || '',
          emailaddresslistcc1 : recipientCcList || '',
          image11 : imageList.image11?.[0] || '', 
          image12 : imageList.image12?.[0] || '', 
          image13 : imageList.image13?.[0] || '',
          flagtabbedview1 : selectedReportData?.flagTabbedView || '',
          flagHealthCheck1 : selectedReportData?.flagHealthCheck || '',
          txtDealerSignature1 :txtDealerSignature || '',
          txtRMSignature1 : txtRMSignature || '',
          txtScfSignature1 : txtScfSignature || '',
          nextReviewDate1 : nextReviewDate || '',
          flagdealergroup1 : selectedDealer?.flagdealergroup || '',
          reviewdate1 : reviewDate || '',
          reviewperiod1 : formValues?.reviewPeriod || '',
          dealerattendees1 : formValues?.dealerAttendees || '',
          scukattendees1 : formValues?.scukAttendees || '',
          supportStatus1 : '',
          oemAttendees1 : '',
          totalquestioncount1 : totalquestioncount,
          strFormControlInfo1 : formControlListId || '',
          emailContent : true,
          totalresult : 1
        
      }

      // Converting to form data
      let formDatas = new FormData();
      for( let key in requestBodyObj){
          formDatas.append(key, requestBodyObj[key])
      }

      let response = await axios.post('/api/visitReports/postDealershipVisitReport',formDatas);
      if(response.data.result.root.status){
        // Clearing the saved data
        let flag = false
        handleTemplateFormCancelButton(flag);
        setPopupContent((prevState) => ({
          ...prevState,
          duelOption : false,
          detailContent: "Dealership report sent successfully.",
          show: true,
          onClick : handleSubmitSuccesAlert
        }));
      }
      else{
        setPopupContent((prevState) => ({
          ...prevState,
          duelOption : false,
          detailContent: "Dealership report sent faild.",
          show: true,
          onClick : handleClick 
        }));

      }
    }catch(error){
      console.log("eroor ->",error);
    }
  };

  // Function for handle tab click
  const handleTabClick = (event) => {

    event.preventDefault();
    const target = event.target.closest('a');

    if (target) {

      const rel = target.getAttribute('rel');
      const tabs = Array.from(document.querySelectorAll('#tb2 li a'));
      const lastTab = tabs[tabs.length - 1];
      const isSelected = lastTab.classList.contains('selected');
      
      // Check last tab relation & selected tab relation
      if (lastTab.getAttribute('rel') === rel && isSelected) {

          setIsLastTabSelected(isSelected);
      } else if(!isSelected) {

          setIsLastTabSelected(false);
      }
    }
  };

  // Function for handle onchangFunctionality
  const handleFormChange = (name, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Save visit report form in local storage
  const handleLandingFormSaveButton = (e) => {
    try{
      e.preventDefault();
      const userId = session.data?.user?.id;
      if (!userId) {
          throw new Error('User ID not found');
      }
      let savedData = {
            [userId] : formValues
      }
       // Retrieve stored data from localStorage
       let storedSavedData = JSON.parse(localStorage.getItem("visitReportForm")) || {};
       if (storedSavedData[userId]) {
             storedSavedData[userId] = savedData[userId]
       }else {
            // If no user data exists, add the new user with form data
            storedSavedData = {
              ...storedSavedData,
              [userId]: savedData[userId],
            };
      }
      localStorage.setItem('visitReportForm',JSON.stringify(storedSavedData))
    }catch(error){
      console.log("err ->",error.message)
    }
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

  // Fuction for handle exisiting visit report data 
  const handleSelectExistingVisitReportData = (e,item) =>{

    setIsActive(!isActive)
    // Handle style for selected item
    if (selectedElement) {
        selectedElement.classList.remove(Styles.listhead);
    }
    e.currentTarget.classList.add(Styles.listhead);
    setSelectedElement(e.currentTarget);

    // Clear previous state
    clearPreviousState();
    // Store item
    setSelectedExistingVisitReportData(item);

    let formattedReviewDate = item.reviewdate ? moment(item.reviewdate,'DD/MM/YYYY').format('YYYY-MM-DD') : '';

    if(goBackToPage.pageFour){

        // _____________Tabbed view
        if(Object.keys(item).length !== 0){
            setIsReadOnly(true)
            setFormValues((prev) =>({
              ...prev,
              reviewDate : formattedReviewDate,
              txtDealershipName : item.dealershipname || '',
              reviewPeriod :  item.reviewperiod  || "",
              dealerAttendees : item.dealerattendees || '',
              scukAttendees : item.scukattendees || ''
            }))
            setIsLastTabSelected(false);
            handleHTMLContent(item.formdata, 'root');
        }

    }else if(selectedReportData.flagTabbedView == 'N'){

        handleHTMLContent(item.formdata, 'root');

    }else{

        if(Object.keys(item).length !== 0){
            setIsReadOnly(true)
            setFormValues((prev) =>({
              ...prev,
              reviewDate : formattedReviewDate,
              txtDealershipName : item.dealershipname || '',
              reviewPeriod : item.reviewperiod || "",
              dealerAttendees : item.dealerattendees || '',
              scukAttendees : item.scukattendees || ''
            }))
        }
    }
  }

  // Function handle click new form
  const handleClickNewForm = () =>{

    setIsActive(!isActive)
    // Handle li click selected style
    if (selectedElement) {
        selectedElement.classList.remove(Styles.listhead);
    }
    liTagNewFormRef.current.classList.add(Styles.listhead);
    setSelectedElement(liTagNewFormRef.current);

    // Clear previous state
    clearPreviousState();
    setSelectedExistingVisitReportData({});

    if(goBackToPage.pageFour && formData?.formInfo ){
      // __________________Tabbbed view exisiting data_______________
      setIsLastTabSelected(false);
      handleHTMLContent(formData?.formInfo , 'root');
    }else if(selectedReportData.flagTabbedView == 'N'){
      handleHTMLContent(formData?.formInfo , 'root');
    }else{
      setIsReadOnly(false);
      setFormValuesFromLocalStorage();
    }
   
  }

  // Function set value from localstorage
  const setFormValuesFromLocalStorage =()=>{
    try{
        const userId = session.data?.user?.id;
        if (!userId) {
            throw new Error('User ID not found');
        }
        // Fetch saved form data from the local storage
        let getFormData = JSON.parse(localStorage.getItem('visitReportForm')) || {};

        // Format the date as YYYY-MM-DD (or other desired format)
        const now = new Date();
        const formattedToDayDate = now.toISOString().split('T')[0];

        // Dealership name
        let dealershipName =  "";
        if(formData.flagHealthCheck == 'Y'){
          if(selectedDealer.flagdealergroup == 'Y'){
            dealershipName = selectedDealer.dealerGroupName;
          }else{
            dealershipName = selectedDealer.name;
          }
        }

        let dealerAttendees = "";
        let scukAttendees = "";
        let reviewPeriod = "";
        let savedData = getFormData?.[userId]
        if(savedData){
           dealerAttendees = savedData?.dealerAttendees
           scukAttendees =  savedData?.scukAttendees
           reviewPeriod = savedData?.reviewPeriod
        }

        // Set data from locastorage
        setFormValues((prev) => ({
          ...prev,
          reviewDate: formattedToDayDate, // Update the review date with the formatted date
          dealerAttendees: dealerAttendees,
          scukAttendees:  scukAttendees,
          txtDealershipName: dealershipName, // Use the dealership name if available
          reviewPeriod: reviewPeriod,
        }));
    }catch(error){

    }
      

     
  }

  //  Handle continue button
  const handleContinueButton = () =>{
    const {  flagHealthCheck   } = selectedReportData;
    if(formValues.reviewDate.trim() ==''){
        setPopupContent((prevState) => ({
          ...prevState,
          duelOption : false,
          detailContent: "Please select Review Date.",
          show: true,
          onClick : handleClick 
        }));
    }else if(flagHealthCheck == 'N' && formValues.reviewPeriod.trim() ==''){
        setPopupContent((prevState) => ({
          ...prevState,
          duelOption : false,
          detailContent: "Please enter Review Period.",
          show: true,
          onClick : handleClick 
        }));
    }else if(formValues.dealerAttendees.trim() ==''){
        setPopupContent((prevState) => ({
          ...prevState,
          duelOption : false,
          detailContent: "Please enter dealer attendees.",
          show: true,
          onClick : handleClick 
        }));
    }else if(formValues.scukAttendees.trim() ==''){
        setPopupContent((prevState) => ({
          ...prevState,
          duelOption : false,
          detailContent: "Please enter SCUK attendees.",
          show: true,
          onClick : handleClick 
        }));
    }else{
        setGoBackToPage((prev)=>({...prev,pageFour : true}));
        if(Object.keys(selectedExistingVisitReportData).length !==0){
          handleHTMLContent(selectedExistingVisitReportData.formdata, 'root');
          setIsActive(!isActive);
        }else{
          handleHTMLContent(formData.formInfo, 'root');
          setIsActive(!isActive);
        }
    }

  }

  // Handle functiopn follow up report
  const handleFollowUpReport=()=>{
    if (formData?.flagTabbedView === 'Y') {
        setIsLastTabSelected(false);
        setIsActive(!isActive);
    } 
    setIsReadOnly(false);
    setIsActiveFollowUpReport(true);
  }

  // Handle function re-send button 
  const handleReSendButton= async()=>{
    try{
        // User id
        const userId = session.data?.user?.id;
        if (!userId) {
            throw new Error('User ID not found');
        }
        if(recipients.recipientList.length  !== 0){
          
            // _____REQUEST BODY______
            let requestBodyObj = {
              body : {
                  doAction : "sendMail",
                  userid : userId,
                  dealershipVisitreportCartId1 : selectedExistingVisitReportData?.cartid || "", 
                  recepientEmails1 : recipients.recipientList.join(',')  || "", 
                  flagdealergroup1 : selectedDealer?.flagdealergroup || '',
                  flagtabbedview1  : selectedReportData?.flagTabbedView || '',
                  flagHealthCheck1 : selectedReportData.flagHealthCheck || '',
                  dealershipid1    : selectedExistingVisitReportData?.dealershipid || '',
                  totalresult : 1,
                }
            }   

            
            let response = await axios.post('/api/visitReports/sendEmail',requestBodyObj);
            if(response.data.result.root?.emailresend?.[0]?.status ==1){
              // response.data.result.root.emailresend[0].message
              setPopupContent((prevState) => ({
                ...prevState,
                duelOption : false,
                detailContent: "Dealership report sent successfully.",
                show: true,
                onClick : handleClick
              }));
              // alert(response.data.result.root.emailresend[0].message)
            }else{
              setPopupContent((prevState) => ({
                ...prevState,
                duelOption : false,
                detailContent: "Dealership report sent faild.",
                show: true,
                onClick : handleClick
              }));
            }
        }else{
            setPopupContent((prevState) => ({
              ...prevState,
              duelOption : false,
              detailContent: "At least one recepient required.",
              show: true,
              onClick : handleClick
            }));
        }
       
    }catch(error){
      console.log("Erron ->",error.message);
    }

  }

  // Function for handle template form save
  const handleTemplateFormSaveButton =async()=>{
        try{
            // fetch form values
            const {
              formControlListId, 
              formControlResult, 
              txtDateTimeElement, 
              lstDealershipStatus,
              packExpiryDate,
              txtAttendees,
              txtDealerSignature,
              txtRMSignature,
              txtScfSignature,
              nextReviewDate,
              totalquestioncount
            } = await fetchFormElementValues();

            //---------- user ID
            const userId = session.data?.user?.id;
            if (!userId) {
                throw new Error('User ID not found');
            }
            //Case - 1 =While clicking cancel clear storage data data 
            //Case - 2 =While clicking submit clear storage data 
            const { flagdealergroup , id, dealerGroupId} = selectedDealer;
            const { flagTabbedView , flagHealthCheck, formId   } = selectedReportData
    
            let dealershipId  = id;
            if(flagdealergroup  == 'Y'){
                dealershipId = dealerGroupId;
            }

            //-------> Saved object
            const savedData ={
                      [userId] : {
                          [formId]: {
                            userId: String(userId),
                            formId: String(formId),
                            flagDealerGroup: flagdealergroup,
                            flagTabbedView: flagTabbedView,
                            flagHealthCheck: flagHealthCheck,
                            dealershipId: String(dealershipId),
                            txtDateTimeElement: txtDateTimeElement || "",
                            lstDealershipStatus: lstDealershipStatus || "",
                            packExpiryDate: packExpiryDate || "",
                            txtAttendees: txtAttendees || "",
                            txtDealerSignature: txtDealerSignature || "",
                            txtRMSignature: txtRMSignature || "",
                            txtScfSignature: txtScfSignature || "",
                            nextReviewDate: nextReviewDate || "",
                            formcontrolInfo: formControlListId || "",
                            formControlData: formControlResult || "",
                            totalquestioncount: String(totalquestioncount) || "0",
                          },
                      },
            } 

            // Retrieve stored data from localStorage
            let storedSavedData = JSON.parse(localStorage.getItem("savedData")) || {};

            // Check if data for the user already exists
            if (storedSavedData[userId]) {

              // If user exists, check if the formId exists
              if (storedSavedData[userId][formId]) {

                // Update the existing form data for the user
                storedSavedData[userId][formId] = savedData[userId][formId];
              } else {

                // Add new form data under the existing user
                storedSavedData[userId] = {
                  ...storedSavedData[userId],
                  [formId]: savedData[userId][formId],
                };
              }
            } else {

              // If no user data exists, add the new user with form data
              storedSavedData = {
                ...storedSavedData,
                [userId]: savedData[userId],
              };
            }

            // Save the updated data back to localStorage
            localStorage.setItem("savedData", JSON.stringify(storedSavedData));
            
        }catch(err){
          console.log('Error ',err.message);
          
        }
  }

  const handleTemplateFormCancelButton =async(flag)=>{
      try{
          //---------- user ID
          const userId = session.data?.user?.id;
          if (!userId) {
              throw new Error('User ID not found');
          }

          // Retrieve stored data from localStorage
          let storedSavedData = JSON.parse(localStorage.getItem("savedData")) || {};
          const { formId   } = selectedReportData
          // Check if data for the user already exists
          if (storedSavedData[userId]) {

            // If user exists, check if the formId exists
            if (storedSavedData[userId][formId]) {

              delete storedSavedData[userId][formId]
              // Save the updated data back to localStorage
              localStorage.setItem("savedData", JSON.stringify(storedSavedData));
           } 
          } 
          // flag handling updating real dom 
          if(flag){
            setIsRemovedSavedData(true);
          }
      }catch(err){
        console.log("error",err.message);
        
      }
     


  }

  // Function for set form elelement values
  const setSavedFormElementValues =async(formControlId,formControlResult)=>{
      try{
        let formElementIdArray = formControlId.split(',');
        let formElementResultArray = formControlResult.split('^@^');

        // Split the input string at '@@1' to get an array of IDs without suffixes
        let cleanIds = formElementIdArray.map(item => item.split('@@'));

          // Iterate through the filtered list of IDs
        for (let i = 0; i < cleanIds.length; i++) {
          const elementId = cleanIds[i][0].trim();
          if (elementId && formElementResultArray[i] !== undefined) {

              if(elementId.substring(0,3) === 'spn'){
                let element = document.getElementById(elementId);
                if(element){
                  element.textContent = formElementResultArray[i] || ""
                }

              }else if(elementId.substring(0, 3) === 'chk'){
                
                let eleIndex = cleanIds[i][1];
                  let chkBox = document.getElementById(`${elementId}${eleIndex}`)
                  if(chkBox){
                    chkBox.checked = formElementResultArray[i] === 'true';
                  }
              }else if(elementId.substring(0, 3) === 'tcc'){
                  let completedChk = document.getElementById(`${elementId}`)
                  if(completedChk){
                      completedChk.checked = formElementResultArray[i] === 'Yes'
                  }
              }else if(elementId.substring(0, 2) === 'rd'){
                  let eleIndex = cleanIds[i][1]; //example id rd42
                  let element  = document.getElementById(`${elementId}${eleIndex}`);
                  if(element){
                    if(element.value == formElementResultArray[i]){
                      element.checked = true;
                    }

                  }
              }else if(elementId.substring(0, 3) === 'hid'){
                  let element = document.getElementById(elementId);
                  
                  if(element){
                    element.value = formElementResultArray[i]
                      if(element.value !== '0'){

                        let hidElementNum = elementId.split('hid_')
                        // fetching based on the name 
                        let chkElement = document.getElementsByName(`chk_${hidElementNum?.[1]}[]`);
                        for(let ele of chkElement){
                            if(ele.value == formElementResultArray[i]){
                                ele.checked = true
                            }
                        }
                      }
                  }
              }else {             
                let element = document.getElementById(elementId);
                if(element){
                  element.value = formElementResultArray[i]
                }
              }
          }
        }
        
        return null;
      }catch(error){
        
      }
  }

  // Function for fetch and set form values from localstorage
  const initiallyFetchSavedFormDataStorage=async()=>{
    try{
        // Retrieve stored data from localStorage
        let storedSavedData = JSON.parse(localStorage.getItem("savedData")) || {};
        const userId = session.data?.user?.id;
        const { flagTabbedView , flagHealthCheck, formId   } = selectedReportData
        if (!userId) {
            throw new Error('User ID not found');
        }
        if(Object.keys(storedSavedData)?.length !==0 && Object.keys(selectedExistingVisitReportData).length == 0 && formId){
            if(storedSavedData[userId] && storedSavedData[userId][formId]){
              let savedData  =  storedSavedData[userId][formId];

                // Tabbed view = false
                if(flagTabbedView == "N"){
                    const dealershipStatusElement = document.getElementById('lstDealershipStatus');
                    const packExpiryDateElement = document.getElementById('txtPackExpiryDate');
                    const attendeesElement = document.getElementById('txtAttendees');
                    if (dealershipStatusElement) {
                      dealershipStatusElement.value = savedData?.lstDealershipStatus || '';
                    }
                    if (packExpiryDateElement) {
                      packExpiryDateElement.value = savedData?.packExpiryDate || '';
                    }
                    if (attendeesElement) {
                      attendeesElement.value = savedData?.txtAttendees || '';
                    }
                }
                // Tabbed view = true
                if(flagTabbedView == "Y"){
                    const txtDealerSignature  = document.getElementById('txtDealerSignature');
                    const txtRMSignature  = document.getElementById('txtRMSignature');
                    const txtScfSignature  = document.getElementById('txtScfSignature');
                    const nextReviewDate   = document.getElementById('nextReviewDate');
                    if (txtDealerSignature) {
                         txtDealerSignature.value = savedData?.txtDealerSignature || '';
                    }
                    if (txtRMSignature) {
                         txtRMSignature.value = savedData?.txtRMSignature || '';
                    }
                    if (txtScfSignature) {
                         txtScfSignature.value = savedData?.txtScfSignature || '';
                    }
                    if (nextReviewDate) {
                      const now = moment();
                      let currentDate = now.format('DD/MM/YYYY');
                      nextReviewDate.value = currentDate || '';
                    }
                }
                let formControlId = savedData?.formcontrolInfo;
                let formControlResult = savedData?.formControlData;
                await setSavedFormElementValues(formControlId,formControlResult)
            }
        }
    }catch(error){
      console.log("Error ->",error.message);
      
    }

  }

  const handleMiddleFormCancelButton =()=>{
    try{

        const userId = session.data?.user?.id; 
            if (!userId) {
              throw new Error('User ID not found');
          }
        // Retrieve stored data from localStorage
        let storedSavedData = JSON.parse(localStorage.getItem("visitReportForm")) || {};
        // Check if data for the user already exists
        if (storedSavedData?.[userId]) {
            delete storedSavedData[userId]
            // Save the updated data back to localStorage
            localStorage.setItem("visitReportForm", JSON.stringify(storedSavedData));
            setFormValues((prev)=>({...prev, dealerAttendees : "", scukAttendees :"",reviewPeriod : ""})); 
        }else if(!storedSavedData?.[userId] && Object.keys(selectedExistingVisitReportData).length !==0){
            // Format the date as YYYY-MM-DD (or other desired format)
            const now = new Date();
            const formattedToDayDate = now.toISOString().split('T')[0];
             setFormValues((prev)=>({...prev, reviewDate : formattedToDayDate, dealerAttendees : "", scukAttendees :"",reviewPeriod : ""}));
        }
    }catch(error){

    }

  }
  
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
            <MemoisedVisitReportComponent 
                handleContinueButton={handleContinueButton}  
                handleSaveButton={handleLandingFormSaveButton}
                handleFormChange={handleFormChange}
                formValues={formValues} 
                formData={formData}
                isReadOnly={isReadOnly}
                handleFollowUpReport={handleFollowUpReport}
                isAllreadyExistVisitReport={Object.keys(selectedExistingVisitReportData).length !== 0}
                isActiveFollowUpReport={isActiveFollowUpReport}
                handleMiddleFormCancelButton={handleMiddleFormCancelButton}
            />}
            {/* Placeholder for dynamic HTML content */}
            <div id="root"></div>
          </div>
            {/* Footer with Buttons */}
            {isLastTabSelected && <div className={Styles.mainboxfooter}>
                <div className={`${Styles.flex} ${Styles.btnrow}  ${Styles.rowreverse}`}>

                {/* Action Buttons  */}
                {(Object.keys(selectedExistingVisitReportData).length !== 0 && 
                  !isActiveFollowUpReport )
                  ? <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                  {formData.flagRecipient === 'Y' 
                      && 
                    <CustomButton 
                       type="button"
                       onClick={(e)=>handleReSendButton()}
                    >
                       Re-send
                    </CustomButton>}
                    {Object.keys(selectedExistingVisitReportData).length !== 0 
                      &&  selectedReportData.flagTabbedView == 'N' 
                      && !isActiveFollowUpReport 
                      && <CustomButton
                          type="button"
                          onClick={(e)=>handleFollowUpReport()}
                    >
                     Follow Up Report
                  </CustomButton>}
                  </div> :
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                    <CustomButton
                      type="button"
                      onClick={handleTemplateFormSaveButton}
                    >
                      Save
                    </CustomButton>
                    <CustomButton
                      type="button"
                      onClick={()=>{handleTemplateFormCancelButton(true)}}
                    >
                      Cancel
                    </CustomButton>
                  </div>
                  }
                  {/* Image Add Option */}
                  {formData.flagImage === 'Y' && (
                    <div className={Styles.imageaddoption}>
                      <OverlayTrigger
                        trigger="click"
                        placement="top"
                        rootClose
                        overlay={
                          <Popover id={`addImage-popover`}>
                          <Popover.Body>

                          {/* No image found */}
                          {Object.keys(selectedExistingVisitReportData).length !== 0 && 
                            !isActiveFollowUpReport &&
                            selectedExistingVisitReportData?.imageone =='' && 
                            selectedExistingVisitReportData?.imagetwo =='' && 
                            selectedExistingVisitReportData?.imagethree =='' && 
                            <span>No image found.</span>
                          }
                          
                          {/* Image 1 */}
                          {Object.keys(selectedExistingVisitReportData).length !== 0 && 
                          !isActiveFollowUpReport 
                          && selectedExistingVisitReportData?.imageone  && 
                              <img 
                                src={ABSPATH + selectedExistingVisitReportData?.imageone}
                                alt="Visit report image" 
                                style={{ width: '100px', height: '100px' }}
                                className={Styles.addMediaImage} 
                              />
                          }
                 
         
                          {((Object.keys(selectedExistingVisitReportData).length == 0) || (Object.keys(selectedExistingVisitReportData).length !== 0 && isActiveFollowUpReport)) && 
                          <label htmlFor="fileInput11" className={Styles.fileLabel}>
                            {imageList.image11.length > 0 ? (
                              <img  
                                  src={URL.createObjectURL(imageList.image11[0])}
                                  alt="image1 preview" 
                                  style={{ width: '100px', height: '100px' }}
                                  className={Styles.addMediaImage} 
                              />
                            ) : 
                              <img 
                                src="../../addmedia.svg" 
                                alt="Add media" 
                                className={Styles.addMediaImage} 
                              />
                            }
                          </label>
                          }

                          <input
                            type="file"
                            id="fileInput11"
                            onChange={(e)=>{setImageList((prev) => ({ ...prev, image11 : e.target.files }))}}
                            style={{ display: 'none' }}
                          />
        
                          {/* Image 2 */}
                          {Object.keys(selectedExistingVisitReportData).length !== 0 && 
                          !isActiveFollowUpReport 
                          && selectedExistingVisitReportData?.imagetwo  && 
                              <img 
                                src={ABSPATH + selectedExistingVisitReportData?.imagetwo}
                                alt="Visit report image" 
                                style={{ width: '100px', height: '100px' }}
                                className={Styles.addMediaImage} 
                              />
                          }
                          {((Object.keys(selectedExistingVisitReportData).length == 0) || (Object.keys(selectedExistingVisitReportData).length !== 0 && isActiveFollowUpReport)) && 
                          <label htmlFor="fileInput12" className={Styles.fileLabel}>
                              {imageList.image12?.length > 0 ? (
                                  <img  
                                      src={URL.createObjectURL(imageList.image12[0])}
                                      alt="image1 preview" 
                                      style={{ width: '100px', height: '100px' }}
                                      className={Styles.addMediaImage} 
                                  />
                              ) : 
                                  <img 
                                      src="../../addmedia.svg" 
                                      alt="Add media" 
                                      className={Styles.addMediaImage} 
                                  />
                          }
                          </label>}

                          <input
                            type="file"
                            id="fileInput12"
                            onChange={(e)=>{setImageList((prev) => ({ ...prev, image12 : e.target.files }))}}
                            style={{ display: 'none' }}
                          />

                          {/* Image 3 */}
                          {Object.keys(selectedExistingVisitReportData).length !== 0 && 
                          !isActiveFollowUpReport 
                          && selectedExistingVisitReportData?.imagethree  && 
                              <img 
                                src={ABSPATH + selectedExistingVisitReportData?.imagethree}
                                alt="Visit report image" 
                                style={{ width: '100px', height: '100px' }}
                                className={Styles.addMediaImage} 
                              />
                          }
                          {((Object.keys(selectedExistingVisitReportData).length == 0) || (Object.keys(selectedExistingVisitReportData).length !== 0 && isActiveFollowUpReport)) && 
                          <label htmlFor="fileInput13" className={Styles.fileLabel}>
                            {imageList.image13?.length >0 ? (
                                <img  
                                    src={URL.createObjectURL(imageList.image13[0])}
                                    alt="image1 preview" 
                                    style={{ width: '100px', height: '100px' }}
                                    className={Styles.addMediaImage} 
                                />
                            ) : 
                                <img 
                                    src="../../addmedia.svg" 
                                    alt="Add media" 
                                    className={Styles.addMediaImage} 
                                />
                            }
                          </label> }
                          <input
                            type="file"
                            id="fileInput13"
                            onChange={(e)=>{setImageList((prev) => ({ ...prev, image13 : e.target.files }))}}
                            style={{ display: 'none' }}
                          />

                          </Popover.Body>
                          </Popover>
                        }
                      >
                        <Button  className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex} `}>
                        {Object.keys(selectedExistingVisitReportData).length !== 0 && !isActiveFollowUpReport ? `View Images` : `Add Images`} <img src="../../addimage.svg" alt="message.svg" />
                        </Button>
                      </OverlayTrigger>
                    </div>


                  )}
                </div>
                
                <div className={`${Styles.flex} ${Styles.btnrow}`}>
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                      {formData.flagRecipient === 'Y' && (
                      <>
                        <div className={Styles.searchbox}>
                          <PopoverComponent 
                            id="addRecipientsBtn" 
                            label={Object.keys(selectedExistingVisitReportData).length !== 0 && !isActiveFollowUpReport ? `View Recipients` : `Add Recipients`} 
                            recipients={recipients} 
                            setRecipients={setRecipients} 
                            flag={'ADD_RECIPIENT'} 
                            recipientList={recipients.recipientList} 
                            isAllredyExistVisitReport={Object.keys(selectedExistingVisitReportData).length !== 0 && !isActiveFollowUpReport}/>
                        </div>
                        <div className={Styles.searchbox}>
                          <PopoverComponent 
                            id="addBccBtn" 
                            label={Object.keys(selectedExistingVisitReportData).length !== 0 
                              && !isActiveFollowUpReport 
                              ? `View Bcc` : `Add Bcc`}  
                            recipients={recipients} 
                            setRecipients={setRecipients} 
                            flag={'ADD_BCC'} 
                            recipientList={recipients.recipientBccList}
                            isAllredyExistVisitReport={Object.keys(selectedExistingVisitReportData).length !== 0 && !isActiveFollowUpReport}/>
                        </div>
                        <div className={Styles.searchbox}>
                          <PopoverComponent 
                            id="addCcBtn" 
                            label={Object.keys(selectedExistingVisitReportData).length !== 0  
                              && !isActiveFollowUpReport 
                              ? `View Cc` : `Add Cc`} 
                            recipients={recipients} 
                            setRecipients={setRecipients} 
                            flag={'ADD_CC'} 
                            recipientList={recipients.recipientCcList} 
                            isAllredyExistVisitReport={Object.keys(selectedExistingVisitReportData).length !== 0 && !isActiveFollowUpReport}/>
                        </div>
                      </>
                      )}
                  </div>
                  {(Object.keys(selectedExistingVisitReportData).length == 0 
                  || isActiveFollowUpReport ) &&
                  <CustomButton type="submit"      onClick={(e)=>formData.flagRecipient === 'Y' ? sendEmailPopUp() : handleSubmit(false)}>
                      Submit
                  </CustomButton>}
                </div>
               
              </div>}
        </div>
      </div>
    </div>
  );
};

export default VisitReportTemplate;


function VisitReportForm({handleContinueButton, handleSaveButton,
handleFormChange, formValues, formData, isReadOnly, handleFollowUpReport, isAllreadyExistVisitReport, isActiveFollowUpReport, handleMiddleFormCancelButton}){


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
                      value={formData.flagHealthCheck === 'Y'  ? formValues.txtDealershipName : formValues.reviewPeriod } 
                      readOnly={((formData.flagHealthCheck == 'Y') || (isAllreadyExistVisitReport && formData.flagHealthCheck == 'N' && !isActiveFollowUpReport))}
                      type="text" 
                      onChange={(e) => handleFormChange(formData.flagHealthCheck === 'Y' ? 'txtDealershipName' : 'reviewPeriod', e.target.value)}
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
                <div className={`${Styles.flex} ${Styles.btnrow} ${Styles.rowreverse}`}>
                  {/* Action Buttons */}
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                   {isAllreadyExistVisitReport && !isActiveFollowUpReport && <CustomButton
                      type="button"
                      onClick={(e)=>handleFollowUpReport()}
                    >
                      Follow Up Report
                    </CustomButton>}
                    {(!isAllreadyExistVisitReport || (isAllreadyExistVisitReport && isActiveFollowUpReport)) && <>
                      <CustomButton
                        type="button"
                        onClick={handleSaveButton}
                      >
                        Save
                      </CustomButton>
                      <CustomButton
                        type="button"
                        onClick={handleMiddleFormCancelButton}
                      >
                        Cancel
                      </CustomButton>
                    </>}
                    
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
const MemoisedVisitReportComponent = memo(VisitReportForm);

const PopoverComponent = ({ id, label, recipients, setRecipients, flag, recipientList, isAllredyExistVisitReport}) => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [showPopover, setShowPopover] = useState(false); 
  
 

  // Function for add recipient
  const addRecipient=(e)=>{
    try{
      e.preventDefault()
      if (inputValue.trim() === '') return;
      let listName = '';
      let updatedList = [];
      switch (flag) {
        case 'ADD_RECIPIENT':
          listName = 'recipientList';
          
          updatedList = [...recipients.recipientList];
          break;
        case 'ADD_BCC':
          listName = 'recipientBccList';
          updatedList = [...recipients.recipientBccList];
          break;
        case 'ADD_CC':
          listName = 'recipientCcList';
          updatedList = [...recipients.recipientCcList];
          break;
        default:
          console.log("Unknown flag");
      }

      if(updatedList.includes(inputValue)){
        setErrorMessage(`${inputValue} already exists.`);
      }else{
        updatedList.push(inputValue);
        setRecipients((prev)=>(
          {...prev,[listName] : updatedList}
        ))
        setInputValue("")
        setErrorMessage(''); 
      }
    }catch(err){
        console.log("error ->",error);
        
    }
  }
  // Funvtion for remove recipient 
  const removeRecipient=(recipient)=>{
    let listName = '';
    switch (flag) {
      case 'ADD_RECIPIENT':
        listName = 'recipientList';
        break;
      case 'ADD_BCC':
        listName = 'recipientBccList';
        break;
      case 'ADD_CC':
        listName = 'recipientCcList';
        break;
      default:
        console.log("Unknown flag");
    }
    const filteredData = recipientList.filter((item)=> item !== recipient);

    setRecipients((prev)=>(
      {...prev,[listName] : filteredData}
    ));
    
  }
  // Handle popover toggle (open/close)
  const handleToggle = (nextShow) => {
    setShowPopover(nextShow);
    if (!nextShow) {
      // If popover is closing, reset state
      setErrorMessage('');
      setInputValue('');
    }
  };
  return (
    <>
        <OverlayTrigger
          trigger="click"
          placement="top"
          rootClose
          onToggle={handleToggle}
          show={showPopover}
          overlay={
            <Popover id={`${id}-popover`}>
              <Popover.Body>
                <div className={`${Styles.flex} ${Styles.addsearchrow} `} >
                  <form onSubmit={addRecipient} className='d-flex'>
                    <input type="email"  value={inputValue}   onChange={(e)=>setInputValue(e.target.value.trim())} placeholder="Add Recipients" />
                    <button type='submit'   className={Styles.addbtn}>Add</button>
                  </form>
                </div>
                {errorMessage && <div className={Styles.errorMessage}>{errorMessage}</div>}
                <div className={Styles.boxmailcontent}>
                    {recipientList?.length!==0 && recipientList?.map((recipient,index)=>(
                      <div key={index} className={`${Styles.flex} ${Styles.mailtext} `}>
                        <div>{recipient}</div>
                        <button type='button' onClick={()=>removeRecipient(recipient)}><img src="../../close-border.svg" alt="close" />
                        </button>
                    </div>
                    ))}
                    {/* {recipientList?.length == 0 && isAllredyExistVisitReport && <span>No data found.</span>} */}
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <Button  className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex} `}>
            {label} <img  src="../../message.svg" alt="message.svg" />
          </Button>
        </OverlayTrigger>
    </>
   
  );
};
