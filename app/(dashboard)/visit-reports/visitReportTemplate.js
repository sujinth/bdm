'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
// Utils
import { handleHTMLContent } from '../../utils/htmlUtils';
// Components
import CustomButton from '../../components/commen/FormElements/Button';
// Styles
import Styles from './visitreport.module.scss';

const VisitReportTemplate = ({ selectedVisitReportData }) => {
  // State to manage visibility of image popup
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Handle HTML content injection on formData change
  useEffect(() => {
    if (formData?.formInfo && !testRef.current) {
      testRef.current = true;
      handleHTMLContent(formData.formInfo, 'root');
    }
  }, [formData?.formInfo]);

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
            <form onSubmit={handleSubmit}>
              {/* Placeholder for dynamic HTML content */}
              <div id="root"></div>

              {/* Footer with Buttons */}
              <div className={Styles.mainboxfooter}>
                <div className={`${Styles.flex} ${Styles.btnrow}`}>
                  {/* Image Add Option */}
                  <div className={Styles.imageaddoption}>
                    <CustomButton
                      type="button" 
                      onClick={menuClick}
                      className={`${Styles.imagechoosebtn} ${Styles.mainboxfooterbtn} ${Styles.flex}`}
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
                                    <CustomButton
                                      id="addimagecntntlink"
                                      type="button"
                                    >
                                      Camera Roll
                                    </CustomButton>
                                  </div>
                                  <div>
                                    <CustomButton
                                      id="addimagecntntlink"
                                      type="button"
                                    >
                                      Take A Photo
                                    </CustomButton>
                                  </div>
                                  <div>
                                    <CustomButton
                                      id="addimagecntntlink"
                                      className={Styles.addimagecntntlink}
                                      onClick={cancel}
                                    >
                                      Cancel
                                    </CustomButton>
                                  </div>
                                </Popover.Body>
                              </Popover>
                            }
                          >
                            <CustomButton type='button'>
                              <img src="../../addmedia.svg" alt="" />
                            </CustomButton>
                          </OverlayTrigger>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                    <CustomButton
                      type="submit"
                      className={Styles.mainboxfooterbtn}
                    >
                      Save
                    </CustomButton>
                    <CustomButton
                      type="button"
                      className={Styles.mainboxfooterbtn}
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
                                  <CustomButton
                                    type="button"
                                    className={Styles.addbtn}
                                  >
                                    Add
                                  </CustomButton>
                                </div>
                                <div className={Styles.boxmailcontent}>
                                  <div className={`${Styles.flex} ${Styles.mailtext}`}>
                                    <div>babyruwqivrpqbhzme@cwmxc.com</div>
                                    <CustomButton type="button">
                                      <img src="../../close-border.svg" alt="close" />
                                    </CustomButton>
                                  </div>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <CustomButton
                            type="button"
                            className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex}`}
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
                                  <CustomButton
                                    type="button"
                                    className={Styles.addbtn}
                                  >
                                    Add
                                  </CustomButton>
                                </div>
                                <div className={Styles.boxmailcontent}>
                                  <div className={`${Styles.flex} ${Styles.mailtext}`}>
                                    <div>babyruwqivrpqbhzme@cwmxc.com</div>
                                    <CustomButton type="button">
                                      <img src="../../close-border.svg" alt="close" />
                                    </CustomButton>
                                  </div>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <CustomButton
                            type="button"
                            className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex}`}
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
                                  <CustomButton
                                    type="button"
                                    className={Styles.addbtn}
                                  >
                                    Add
                                  </CustomButton>
                                </div>
                                <div className={Styles.boxmailcontent}>
                                  <div className={`${Styles.flex} ${Styles.mailtext}`}>
                                    <div>babyruwqivrpqbhzme@cwmxc.com</div>
                                    <CustomButton type="button">
                                      <img src="../../close-border.svg" alt="close" />
                                    </CustomButton>
                                  </div>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <CustomButton
                            type="button"
                            className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex}`}
                          >
                            Add Cc <img src="../../message.svg" alt="message.svg" />
                          </CustomButton>
                        </OverlayTrigger>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                    <CustomButton type="submit" className={Styles.mainboxfooterbtn}>
                      Submit
                    </CustomButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitReportTemplate;
