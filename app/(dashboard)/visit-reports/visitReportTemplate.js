'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
// Utils
import { handleHTMLContent } from '../../utils/htmlUtils';
// Components
import CustomButton from '../../components/commen/FormElements/Button/Button';
// Styles
import Styles from './visitreport.module.scss';

const VisitReportTemplate = ({ selectedVisitReportData }) => {
  // State 
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [isLastTabSelected, setIsLastTabSelected] = useState(false);
  // Ref to track if HTML content has been handled
  const testRef = useRef(false);

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
  const formData = useMemo(() => selectedVisitReportData, [selectedVisitReportData]);
  
  const formatDynamicOutput = (arr) => {
    const result = [];
    let currentGroup = [];
    let groupStarted = false;

    arr.forEach(item => {
        // Check if the item indicates the start of a new group or is empty
        if (item === '' || /^[A-Za-z]/.test(item)) {
            // If a group was being built, finalize it
            if (currentGroup.length > 0) {
                result.push(currentGroup.join('^@^'));
                currentGroup = [];
            }
            // If item is not an empty string, start a new group
            if (item !== '') {
                currentGroup.push(item);
                groupStarted = true;
            }
        } else {
            // Collect items for the current group
            currentGroup.push(item);
        }
    });

    // Finalize the last group if it exists
    if (currentGroup.length > 0) {
        result.push(currentGroup.join('^@^'));
    }

    return result.join('^@^');
};
  // Handle form submission
  const handleSubmit = (e) => {
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
    console.log("output",formatDynamicOutput(valuesArray));
    console.log('formInputValue',formInputValue);

    console.log("valuesArray", valuesArray);
  };
  

  // Handle HTML content injection on formData change
  useEffect(() => {
    if (formData?.formInfo && !testRef.current) {
      testRef.current = true;
      handleHTMLContent(formData.formInfo, 'root');
    }
  }, [formData?.formInfo]);

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
  

  return (
    <div className={Styles.bgcolor}>
      <div className={`${Styles.container} ${Styles.innerpgcntnt}`}>
        {/* Visit Name Section */}
        <div className={Styles.visitnamebx}>
          <div className={Styles.titlebx}>My Dealer</div>
          <div className={Styles.listitems}>
            <ul className={`${Styles.listcntnt} ${Styles.listiconhide}`}>
              <li className={Styles.listhead}><a>New Form</a></li>
              <li><a href="#">14/12/2023 16:11:04 - Sent</a></li>
              <li><a href="#">21/12/2023 13:11:04 - Sent</a></li>
              <li><a href="#">02/08/2023 01:11:04 - Sent</a></li>
              <li><a href="#">18/12/2023 15:11:04 - Sent</a></li>
            </ul>
          </div>
        </div>

        {/* Form Detail Section */}
        <div className={Styles.detailbx}>
          <div className={Styles.titlebx}>{selectedVisitReportData?.formName}</div>
          <div className={`${Styles.contentwhtbx} ${Styles.contentwhtbxfooter}`}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitReportTemplate;
