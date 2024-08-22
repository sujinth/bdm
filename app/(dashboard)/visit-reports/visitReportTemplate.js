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
  console.log("selectedData",selectedData);

  // session
  const session = useSession();
  const router = useRouter();
  const { setPopupContent } = usePopupContent();
  const { selectedReportData, selectedDealer } = selectedData;

  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [isLastTabSelected, setIsLastTabSelected] = useState(false);
  const [visitReportList, setVisitReportList] = useState([])
  const [selectedElement, setSelectedElement] = useState(null);
  const [isActive,setIsActive] = useState(false);
  const [loaderInSideBar, setLoaderInSideBar] = useState(false);
  const [selectedExistingVisitReportData, setSelectedExistingVisitReportData] = useState({})
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isActiveFollowUpReport, setIsActiveFollowUpReport] = useState(false);
  const [formValues, setFormValues] = useState({
    txtDealershipName : selectedDealer.name,
  });
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
  // useContext
  const { setGoBackToPage, goBackToPage } = useDashboard();


  const clearPreviousState= () =>{
    setIsActiveFollowUpReport(false);
    setImageList((prev)=>(
      {...prev,image11 : '', image12 : '', image13 : ''}
    ))
    setRecipients((prev)=>(
      {...prev,recipientList : [], recipientBccList : [], recipientCcList : []}
    ))

  }

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

      //---------- user ID
      const userId = session.data?.user?.id;
      if (!userId) {
          throw new Error('User ID not found');
      }

      //----------Handle dealership name & dealership id 
      let dealershipid  = selectedDealer?.id;
      let dealershipname = selectedDealer?.name;
      if(selectedDealer?.flagdealergroup  == 'Y'){
        dealershipid = selectedDealer.dealerGroupId
        dealershipname = selectedDealer.dealerGroupName
      }
      
      //----------Convert date format YYYY-MM-DD -> DD/MM/YYYY
      let reviewDate = formValues?.reviewDate
      if(reviewDate){
        reviewDate = moment(reviewDate,'YYYY-MM-DD').format('DD/MM/YYYY')
      }

      //--------- recipients
      let { recipientList, recipientBccList, recipientCcList} = recipients;
      recipientList = recipientList.join(',');
      recipientBccList = recipientBccList.join(',');
      recipientCcList = recipientCcList.join(',');

      // _____REQUEST BODY______
      let requestBodyObj = {

          userid : userId,
          cartid : selectedExistingVisitReportData?.cartid || "", 
          followUpCartId1 : selectedExistingVisitReportData?.cartid || "", 
          formid1 : selectedReportData?.formId || '',
          formname1  : selectedReportData?.formName || '',
          dealershipid1 : dealershipid || '',
          dealershipname1 : dealershipname || '',
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
      console.log("request obj",requestBodyObj);
      let formDatas = new FormData();
      for( let key in requestBodyObj){
          formDatas.append(key, requestBodyObj[key])
      }
      let response = await axios.post('/api/visitReports/postDealershipVisitReport',formDatas);
      if(response.data.result.root.status){
      //   setPopupContent((prevState) => ({
      //     ...prevState,
      //     titleContent: "MI Business",
      //     detailContent: "Please Select At Least One Action",
      //     show: true,
      //   }));
        router.push("/home");
      }
      // else{
      //   setPopupContent((prevState) => ({
      //     ...prevState,
      //     titleContent: "MI Business",
      //     detailContent:  "Something went wrong, please try again later.",
      //     show: true,
      //     onClick: clickOk,
      //   }));
      // }
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
    const target = event.target.closest('a');

    if (target) {

      const rel = target.getAttribute('rel');
      const tabs = Array.from(document.querySelectorAll('#tb2 li a'));
      const lastTab = tabs[tabs.length - 1];
      const isSelected = lastTab.classList.contains('selected');
      console.log("lastTab",lastTab);
      console.log("isSelected",isSelected);
      console.log("rel",rel);
      
      console.log("Case",lastTab.getAttribute('rel') === rel);
      
      // Check last tab relation & selected tab relation
      if (lastTab.getAttribute('rel') === rel && isSelected) {
        console.log("Welecome");
        
        setIsLastTabSelected(isSelected);
      } else if(!isSelected) {
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
    console.log("item =>",item);
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

    if(goBackToPage.pageFour){

        // _____________Tabbed view
        if(Object.keys(item).length !== 0){
            setIsLastTabSelected(false);
            handleHTMLContent(item.formdata, 'root');
        }

    }else if(selectedReportData.flagTabbedView == 'N'){

        handleHTMLContent(item.formdata, 'root');

    }else{

        let formattedReviewDate = item.reviewdate ? moment(item.reviewdate,'DD/MM/YYYY').format('YYYY-MM-DD') : '';
        if(Object.keys(item).length !== 0){
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
      const now = new Date();
      // Format the date as YYYY-MM-DD (or other desired format)
      const formattedDate = now.toISOString().split('T')[0];
      setIsReadOnly(false);
      let txtDealershipName = selectedDealer.name;
      if(selectedDealer.flagdealergroup == 'Y'){
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
    if(selectedDealer.flagdealergroup == 'Y'){
      txtDealershipName = selectedDealer.dealerGroupName
    }
    setFormValues((prev) => ({
      ...prev,
      reviewDate: getFormData?.reviewDate || formattedDate,
      dealerAttendees: getFormData?.dealerAttendees ,
      scukAttendees: getFormData?.scukAttendees,
      txtDealershipName:  txtDealershipName
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
  const handleFollowUpReport=()=>{
    console.log("selectedExistingVisitReportData",selectedExistingVisitReportData);
    if (formData?.flagTabbedView === 'Y') {
        setIsLastTabSelected(false);
        setIsActive(!isActive);
    } 
    if(goBackToPage.pageFour){
      handleHTMLContent(selectedExistingVisitReportData.newFormdata, 'root');
    }else{
      setIsReadOnly(false);
    }
    setIsActiveFollowUpReport(true);
    
  }

  console.log("selectedExistingVisitReportData",selectedExistingVisitReportData);




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
              handleSaveButton={handleVisitReortFormSaveButton}
              handleFormChange={handleFormChange}
              formValues={formValues} 
              formData={formData}
              isReadOnly={isReadOnly}
              handleFollowUpReport={handleFollowUpReport}
              isAllreadyExistVisitReport={Object.keys(selectedExistingVisitReportData).length !== 0}
              isActiveFollowUpReport={isActiveFollowUpReport}
            />}
            {/* Placeholder for dynamic HTML content */}
            <div id="root"></div>

            {(goBackToPage.pageFour || (!goBackToPage.pageFour && selectedReportData.flagTabbedView == 'N')) && <>
            
   
            </>}
          </div>
            {/* Footer with Buttons */}
            {isLastTabSelected && <div className={Styles.mainboxfooter}>
                <div className={`${Styles.flex} ${Styles.btnrow}  ${Styles.rowreverse}`}>

                          {/* Action Buttons  */}
                {(Object.keys(selectedExistingVisitReportData).length !== 0 && 
                  !isActiveFollowUpReport )
                  ? <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                    <CustomButton
                      type="button"
                    >
                       Re-send
                    </CustomButton>
                    <CustomButton
                      type="button"
                      onClick={(e)=>handleFollowUpReport()}
                    >
                      Follow Up Report
                    </CustomButton>
                  </div> :
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
                    {/* <CustomButton type="submit"      onClick={handleSubmit}>
                      Submit
                    </CustomButton> */}
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
                            label={Object.keys(selectedExistingVisitReportData).length !== 0 && !isActiveFollowUpReport ? `View Recipients` : `Add Recipients`}   recipients={recipients} 
                            setRecipients={setRecipients} 
                            flag={'ADD_RECIPIENT'} 
                            recipientList={
                              Object.keys(selectedExistingVisitReportData).length !== 0 && !isActiveFollowUpReport
                              ?  (selectedExistingVisitReportData?.emailaddresslist 
                                  ? selectedExistingVisitReportData?.emailaddresslist.split(',') 
                                  : []
                                ) 
                              : recipients.recipientList} 
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
                            recipientList={
                              Object.keys(selectedExistingVisitReportData).length !== 0  && !isActiveFollowUpReport
                              ? (selectedExistingVisitReportData?.emailaddresslistbcc 
                                  ? selectedExistingVisitReportData.emailaddresslistbcc.split(',') 
                                  : []
                                ) 
                              : recipients.recipientBccList
                            }
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
                            recipientList={
                              Object.keys(selectedExistingVisitReportData).length !== 0 && !isActiveFollowUpReport
                              ? (selectedExistingVisitReportData?.emailaddresslistcc 
                                ? selectedExistingVisitReportData?.emailaddresslistcc?.split(',') 
                              : []
                            ) 
                            : recipients.recipientCcList} 
                            isAllredyExistVisitReport={Object.keys(selectedExistingVisitReportData).length !== 0 && !isActiveFollowUpReport}/>
                        </div>
                      </>
                      )}
                  </div>
                  {(Object.keys(selectedExistingVisitReportData).length == 0 
                || isActiveFollowUpReport ) &&
                  <CustomButton type="submit"      onClick={handleSubmit}>
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
handleFormChange, formValues, formData, isReadOnly, handleFollowUpReport, isAllreadyExistVisitReport, isActiveFollowUpReport}){



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
  
  // Function for add recipient
  const addRecipient=()=>{

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
      setErrorMessage(''); 
    }
  }
  // Funvtion for remove recipient 
  const removeRecipient=(recipient)=>{
    let listName = '';
    let updatedList = [];
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

  return (
    <>
        <OverlayTrigger
          trigger="click"
          placement="top"
          rootClose
          overlay={
            <Popover id={`${id}-popover`}>
              <Popover.Body>
                {!isAllredyExistVisitReport && <div className={`${Styles.flex} ${Styles.addsearchrow} `} >
                  <input type='text' onChange={(e)=>setInputValue(e.target.value.trim())} placeholder={label} />
                  <button type='button' value={inputValue} onClick={() => addRecipient()}  className={Styles.addbtn}>Add</button>
                </div>}
                {errorMessage && <div className={Styles.errorMessage}>{errorMessage}</div>}
                <div className={Styles.boxmailcontent}>
                    {recipientList?.length!==0 && recipientList?.map((recipient,index)=>(
                      <div key={index} className={`${Styles.flex} ${Styles.mailtext} `}>
                        <div>{recipient}</div>
                        {!isAllredyExistVisitReport && <button type='button' onClick={()=>removeRecipient(recipient)}><img src="../../close-border.svg" alt="close" />
                        </button>}
                    </div>
                    ))}
                    {recipientList?.length == 0 && isAllredyExistVisitReport && <span>No data found.</span>}
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
