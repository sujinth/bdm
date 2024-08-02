'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

// Utils
import { handleHTMLContent } from '../../utils/htmlUtils';
import { formatDynamicOutput } from '../../utils/commenController'

import { useDashboard } from '../../contexts/layoutContext';
// Components
import CustomButton from '../../components/commen/FormElements/Button/Button';
// Styles
import Styles from './visitreport.module.scss';

const VisitReportTemplate = ({ selectedData }) => {
  const { selectedReportData, selectedDealer } = selectedData;
  // State 
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [isLastTabSelected, setIsLastTabSelected] = useState(false);
  // Ref handling hrml render
  const htmlContentRef = useRef(false);
  const { setGoBackToPage, goBackToPage } = useDashboard();
  const inputTxtDateRef = useRef(null);
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // Retrieve the input value
    let formInputValue = document.getElementById('strFormControlInfo').value;
    let elementIds = formInputValue.split(',');
    // Split the input string at '@@1' to get an array of IDs without suffixes
    let cleanIds = elementIds.map(item => item.split('@@')[0]);
  
    let valuesArray = [];
    let elementContent = '';
  
    // Iterate through the filtered list of IDs
    for (let i = 0; i < cleanIds.length; i++) {
      // Trim any spaces from the ID
      const elementId = cleanIds[i].trim();
      
      // Check if the ID starts with 'spn'
      if (elementId.substring(0, 3) === 'spn') {
          elementContent = document.getElementById(elementId)?.textContent || '';
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


    // Case  flagTabbedView === 'N'
    if(formData?.flagTabbedView === 'N'){
        txtDateTimeElement = document.querySelector('input[name="txtDateTime"]').value || '';
        txtDealershipNameElement = document.querySelector('input[name="txtDealershipName"]').value || '';
        lstDealershipStatus = document.getElementById('lstDealershipStatus').value || '';
        packExpiryDate  = document.getElementById('txtPackExpiryDate').value || '';
        txtAttendees = document.getElementById('txtAttendees').value || ''
        console.log("txtDateTimeElement",txtDateTimeElement);
        console.log("txtDealershipNameElement",txtDealershipNameElement);
        console.log("lstDealershipStatus",lstDealershipStatus);
        console.log("packExpiryDate",packExpiryDate);
        console.log("txtAttendees",txtAttendees  );
    }

    // Case  flagTabbedView === 'Y' Last tab compleated report section 
    if(formData?.flagTabbedView === 'Y'){
        txtDealerSignature = document.getElementById('txtDealerSignature').value || '';
        txtScfSignature = document.getElementById('txtScfSignature').value || '';
        nextReviewDate = document.getElementById('nextReviewDate').value || '';
        // console.log("txtDealerSignature",txtDealerSignature);
        // console.log("txtScfSignature",txtScfSignature);
        // console.log("nextReviewDate",nextReviewDate);
    }

    const formControlListId = formInputValue
    // Join the items with `^@^` as the separator
    const formControlResult  = await formatDynamicOutput(valuesArray)
    // output
    console.log('formControlListId',formControlListId);
    console.log("formControlResult",formControlResult);
    
  };
  
  useEffect(()=>{
    if(formData?.flagTabbedView === 'N'){
        // Get the input element by its name attribute
        const txtDateTimeElement = document.querySelector('input[name="txtDateTime"]');
        const txtDealershipNameElement = document.querySelector('input[name="txtDealershipName"]');   
        if (txtDateTimeElement) {
          // Create a new Date object
          const now = new Date();
          // Format the date as YYYY-MM-DD 
          const formattedDate = now.toISOString().split('T')[0];
          txtDateTimeElement.value = formattedDate;
        }
        if(txtDealershipNameElement){
          txtDealershipNameElement.value = formData?.formName;
        }
    }
  },[formData])
  // Handle HTML content injection on formData change
  useEffect(() => {
    if (formData?.formInfo && !htmlContentRef.current && goBackToPage.pageFour) {
      htmlContentRef.current = true;
      handleHTMLContent(formData.formInfo, 'root');
    }
  }, [formData?.formInfo,goBackToPage.pageFour]);

  // Handle footer submit buttons case of TAB
  useEffect(() => {
    // Check if the flagTabbedView in formData is 'Y'
    if (formData?.flagTabbedView === 'Y') {
  
      const handleTabClick = (event) => {
        event.preventDefault(); 
        const target = event.target.closest('a'); // Find the closest 'a' element (tab link)
        if (target) {
          const rel = target.getAttribute('rel'); 
          // Get all tab links from the DOM
          const tabs = Array.from(document.querySelectorAll('#tb2 li a'));
          // Find the last tab link in the list
          const lastTab = tabs[tabs.length - 1];
          const isSelected = lastTab.classList.contains('selected');
          // Check if the clicked tab is the last tab
          if(lastTab.getAttribute('rel') === rel && isSelected){
            setIsLastTabSelected(isSelected);
          }else{
            setIsLastTabSelected(isSelected);
          }
          
        }
      };
  
      // Select all tab links initially
      const tabs = document.querySelectorAll('#tb2 li a');
      // Add the click event listener to each tab link
      tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
  
      // Cleanup function to remove the event listeners when the component unmounts or dependencies change
      return () => {
        tabs.forEach(tab => tab.removeEventListener('click', handleTabClick));
      };
    }else{
      setIsLastTabSelected(true)
    }
  }, [formData]); 
console.log("formData?.formInfo",formData.formInfo);
  useEffect(() => {
    // Create a new Date object
    const now = new Date();
    
    // Format the date as YYYY-MM-DD (or other desired format)
    const formattedDate = now.toISOString().split('T')[0];
    
    // Set the value of the input field to the current date
    if (inputTxtDateRef.current) {
      inputTxtDateRef.current.value = formattedDate;
    }
  }, [goBackToPage.pageFour]); 

  return (
    <div className={Styles.bgcolor}>
      <div className={`${Styles.container} ${Styles.innerpgcntnt}`}>
        {/* Visit Name Section */}
        <div className={Styles.visitnamebx}>
          <div className={Styles.titlebx}>My Dealer</div>
          <div className={Styles.listitems}>
            {!goBackToPage.pageFour && <ul className={`${Styles.listcntnt} ${Styles.listiconhide}`}>
              <li className={Styles.listhead}><a>New Form</a></li>
            </ul>}

            {goBackToPage.pageFour && <ul className={`${Styles.listcntnt} ${Styles.listiconhide}`}>
              <li className={Styles.listhead}><a>New Form</a></li>
              <li><a href="#">14/12/2023 16:11:04 - Sent</a></li>
              <li><a href="#">21/12/2023 13:11:04 - Sent</a></li>
              <li><a href="#">02/08/2023 01:11:04 - Sent</a></li>
              <li><a href="#">18/12/2023 15:11:04 - Sent</a></li>
            </ul>}
          </div>
        </div>

        {/* Form Detail Section */}
        <div className={Styles.detailbx}>
          <div className={Styles.titlebx}>{selectedReportData?.formName}</div>
          <div className={`${Styles.contentwhtbx} ${Styles.contentwhtbxfooter}`}>

            {/* Visit report form */}
            {!goBackToPage.pageFour && <VisitReportForm setGoBackToPage={setGoBackToPage} selectedDealer={selectedDealer} inputTxtDateRef={inputTxtDateRef}/>}
            
            {goBackToPage.pageFour && <>
              {/* Placeholder for dynamic HTML content */}
              <div id="root"></div>

              {/* Footer with Buttons */}
              {isLastTabSelected && <div className={Styles.mainboxfooter}>
                <div className={`${Styles.flex} ${Styles.btnrow}`}>
                  {/* Image Add Option */}
                  <div className={Styles.imageaddoption}>
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
                  </div>

                  {/* Action Buttons */}
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                    <CustomButton
                      type="button"
                      onClick={handleSubmit}
                    >
                      Save
                    </CustomButton>
                    <CustomButton
                      type="button"
                    >
                      Cancel
                    </CustomButton>
                  </div>
                </div>

                {/* Recipient Options */}
                <div className={`${Styles.flex} ${Styles.btnrow}`}>
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                    {/* Add Recipients Button */}
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
                            Add Recipients <img src="../../message.svg" alt="message.svg" />
                          </CustomButton>
                        </OverlayTrigger>
                      ))}
                    </div>

                    {/* Add Bcc Button */}
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
                    </div>

                    {/* Add Cc Button */}
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
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                    <CustomButton type="submit" >
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


function VisitReportForm({setGoBackToPage, selectedDealer, inputTxtDateRef}){

  return(
    <>
        <form >
          <table className={Styles.detailtbl}>
            <tbody>
              <tr>
                <td>Review Date</td>
                <td>
                   <input className={Styles.tblinputbx} type="date"  ref={inputTxtDateRef} />
                </td>
              </tr>
              <tr>
                <td>Dealer</td>
                <td>
                   <input className={Styles.tblinputbx} value={selectedDealer.name} readOnly type="text" />
                </td>
              </tr>
              <tr>
                <td>Dealer Attendees</td>
                <td>
                  <textarea className={Styles.tblinputbx} type="text"/>     
                </td>
              </tr>
              <tr>
                <td>SCUK Attendees</td>
                <td>
                <textarea className={Styles.tblinputbx} type="text"/>
                </td>
              </tr>
              {/* Footer */}
              <div className={Styles.mainboxfooter}>
                <div className={`${Styles.flex} ${Styles.btnrow}`}>
                  {/* Action Buttons */}
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                    <CustomButton
                      type="button"
                      // onClick={handleSubmit}
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
                      onClick={()=>setGoBackToPage((prev)=>({...prev,pageFour : true}))}
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