'use client'
import React, { useMemo, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Button } from 'react-bootstrap';
// Pages
import { TextBox, ListBox } from '../../components/commen/FormElements/FormElements';
import DynamicForm from '../../components/commen/FormElements/dynamicForm';
import Styles from './visitreport.module.scss';

const VisitReportTemplate = ({ selectedVisitReportData }) => {
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    txtDealershipName : selectedVisitReportData?.formName,
    txtDateTime : new Date().toISOString().slice(0, 19).replace('T', ' ')
  });

  const menuClick = () => {
    var imagepopup = document.getElementById("addimagepopup");
    if (imagepopup.style.display === "block") {
      imagepopup.style.display = "none";
      document.body.classList.remove(Styles.bodyOverlayActive);
    } else {
      imagepopup.style.display = "block";
      document.body.classList.add(Styles.bodyOverlayActive);
    }
  }

  const btnClick = () => {
    var searchpopup = document.getElementById("searchboxpopup");
    if (searchpopup.style.display === "none") {
      searchpopup.style.display = "block";
    } else {
      searchpopup.style.display = "none";
    }
  }

  const cancel = () => {
    document.getElementsByClassName("imageoption").style.display = "none";
    setImagePopupVisible(false);
  }

  const initialValues = {
    1: 'Existing Value 1' || "",
    2: "",
    3: "Existing Value3" || ""
  };

  const formData = useMemo(() => {
    return selectedVisitReportData.formInfo.form_data;
  }, [selectedVisitReportData.formInfo.form_data]);

  const handleFormChange = (id, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formValues);
  };
  console.log("formValues",formValues);

  return (
    <div className={Styles.bgcolor}>
      <div className={`${Styles.container} ${Styles.innerpgcntnt}`}>
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
        <div className={Styles.detailbx}>
          <div className={Styles.titlebx}>{selectedVisitReportData?.formName}</div>
          <div className={`${Styles.contentwhtbx} ${Styles.contentwhtbxfooter}`}>
            <form onSubmit={handleSubmit}>
              <table className={Styles.detailtbl}>
                <tbody>
                  {selectedVisitReportData.flagTabbedView === 'N' && (
                    <>
                      <tr>
                        <td>Date and Time</td>
                        <td>
                          <TextBox
                            name={'txtDateTime'}
                            className={Styles.tblinputbx}
                            placeholder={'dd/mm/yyyy 00:00:00'}
                            value={new Date().toISOString().slice(0, 19).replace('T', ' ')}
                            readonly={true}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Dealership Name</td>
                        <td>
                          <TextBox
                            name={'txtDealershipName'}
                            className={Styles.tblinputbx}
                            readonly={true}
                            value={selectedVisitReportData?.formName}
                          />
                        </td>
                      </tr>
                      {selectedVisitReportData?.formInfo?.status === 'Y' && Object.keys(selectedVisitReportData?.formInfo?.dealership_status ?? {}).length !== 0 && (
                        <tr>
                          <td>Status</td>
                          <td>
                            <ListBox
                              name={'lstDealershipStatus'}
                              options={Object.values(selectedVisitReportData?.formInfo?.dealership_status)}
                              className={Styles.tblinputbx}
                              onChange={(e) => handleFormChange('lstDealershipStatus', e.target.value)}
                            />
                          </td>
                        </tr>
                      )}
                      {selectedVisitReportData.formInfo.flpackexpirydate === 'Y' && (
                        <tr>
                          <td>Completion Date</td>
                          <td>
                            <TextBox
                              name={'txtCompletionDate'}
                              className={Styles.tblinputbx}
                              onChange={(e) => handleFormChange('txtCompletionDate', e.target.value)}
                            />
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td>Attendees</td>
                        <td>
                          <TextBox
                            className={Styles.tblinputbx}
                            name={'txtAttendees'}
                            onChange={(e) => handleFormChange('txtAttendees', e.target.value)}
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>

              {selectedVisitReportData.flagTabbedView === 'N' && <div className={Styles.cntnttitle}>Areas for discussion</div>}

              <DynamicForm formDetails={formData} initialValues={initialValues} formValues={formValues} handleFormChange={handleFormChange} />

              <div className={Styles.mainboxfooter}>
                <div className={`${Styles.flex} ${Styles.btnrow}`}>
                    <div className={Styles.imageaddoption}>
                        <>
                            <button 
                                type="button" 
                                onClick={() => menuClick()} 
                                className={`${Styles.imagechoosebtn} ${Styles.mainboxfooterbtn} ${Styles.flex}`}
                            >
                                Add Images <img src="../../addimage.svg" alt="message.svg" />
                            </button>
                        </>
                        <div id="addimagepopup" className={Styles.addimagepopup}>
                            <div className={`${Styles.flex} ${Styles.imageoption}`}>
                                <>
                                    {['top', 'top', 'top'].map((placement) => (
                                        <OverlayTrigger
                                            trigger="click"
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Popover id={`popover-positioned-${placement}`}>
                                                    <Popover.Body>
                                                        <div>
                                                            <button id="addimagecntntlink">Camera Roll</button>
                                                        </div>
                                                        <div>
                                                            <button id="addimagecntntlink">Take A Photo</button>
                                                        </div>
                                                        <div>
                                                            <button 
                                                                id="addimagecntntlink" 
                                                                className={Styles.addimagecntntlink} 
                                                                onClick={() => cancel()}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </Popover.Body>
                                                </Popover>
                                            }
                                        >
                                            <Button variant="secondary">
                                                <img src="../../addmedia.svg" alt="" />
                                            </Button>
                                        </OverlayTrigger>
                                    ))}
                                </>
                            </div>
                        </div>
                    </div>
                    <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                        <button type="submit" className={Styles.mainboxfooterbtn}>Save</button>
                        <button type="button" className={Styles.mainboxfooterbtn}>Cancel</button>
                    </div>
                </div>
                <div className={`${Styles.flex} ${Styles.btnrow}`}>
                    <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
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
                                                    <button className={Styles.addbtn}>Add</button>
                                                </div>
                                                <div className={Styles.boxmailcontent}>
                                                    <div className={`${Styles.flex} ${Styles.mailtext}`}>
                                                        <div>babyruwqivrpqbhzme@cwmxc.com</div>
                                                        <button>
                                                            <img src="../../close-border.svg" alt="close" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </Popover.Body>
                                        </Popover>
                                    }
                                >
                                    <Button 
                                        variant="secondary" 
                                        className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex}`}
                                    >
                                        Add Recipients <img src="../../message.svg" alt="message.svg" />
                                    </Button>
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
                                                <div className={`${Styles.flex} ${Styles.addsearchrow}`}>
                                                    <div className={Styles.searchrow}>
                                                        <input type="search" placeholder='Search' />
                                                    </div>
                                                    <button className={Styles.addbtn}>Add</button>
                                                </div>
                                                <div className={Styles.boxmailcontent}>
                                                    <div className={`${Styles.flex} ${Styles.mailtext}`}>
                                                        <div>babyruwqivrpqbhzme@cwmxc.com</div>
                                                        <button>
                                                            <img src="../../close-border.svg" alt="close" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </Popover.Body>
                                        </Popover>
                                    }
                                >
                                    <Button 
                                        variant="secondary" 
                                        className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex}`}
                                    >
                                        Add Bcc <img src="../../message.svg" alt="message.svg" />
                                    </Button>
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
                                                <div className={`${Styles.flex} ${Styles.addsearchrow}`}>
                                                    <div className={Styles.searchrow}>
                                                        <input type="search" placeholder='Search' />
                                                    </div>
                                                    <button className={Styles.addbtn}>Add</button>
                                                </div>
                                                <div className={Styles.boxmailcontent}>
                                                    <div className={`${Styles.flex} ${Styles.mailtext}`}>
                                                        <div>babyruwqivrpqbhzme@cwmxc.com</div>
                                                        <button>
                                                            <img src="../../close-border.svg" alt="close" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </Popover.Body>
                                        </Popover>
                                    }
                                >
                                    <Button 
                                        variant="secondary" 
                                        className={`${Styles.recipientsbtn} ${Styles.mainboxfooterbtn} ${Styles.flex}`}
                                    >
                                        Add Cc <img src="../../message.svg" alt="message.svg" />
                                    </Button>
                                </OverlayTrigger>
                            ))}
                        </div>
                    </div>
                    <div className={`${Styles.flex} ${Styles.rowrhtbtn}`}>
                        <button type="submit" className={Styles.mainboxfooterbtn}>Submit</button>
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
