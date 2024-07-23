'use client'
import { useState } from 'react';
import Styles from './Incompleteactions.module.scss';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

    const Incompleteactions = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        return (   
            <>
                <div className={Styles.bgcolor}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <div className={`${Styles.container} ${Styles.innerpgcntnt} ${Styles.tabcontentpg}`}>
                            <div className={Styles.visitnamebx}>
                                <div className={Styles.titlebx}>Visit Reports</div>
                                <Col>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                    <Nav.Link eventKey="first">07/01/2024 00:00:00</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="second">17/05/2024 00:00:00</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="third">23/06/2024 00:00:00</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="fourth">19/07/2024 00:00:00</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="fifth">20/11/2024 00:00:00</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                </Col>
                            </div>
                            <div className={Styles.detailbx}>
                                <div className={Styles.titlebx}>Incomplete Actions</div>
                                <form>
                                    <div className={Styles.contentdrkbx}>
                                    <div className={Styles.innerwhitebox}>
                                        <Col>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <div className={Styles.tabcontainer}>
                                                <div className={Styles.title}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum is simply dummy text.</div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                            <tr>
                                                            <td className={Styles.ftw600}>2.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" placeholder='07/04/2024' className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum is simply dummy text.</div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" placeholder='07/04/2024' className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum is simply dummy text.</div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" placeholder='07/04/2024' className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                <div className={Styles.title}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum is simply dummy text.</div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" placeholder='07/04/2024' className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second"> <div className={Styles.tabcontainer}>
                                                <div className={Styles.title}>Lorem Ipsum </div>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum is simply dummy text.</div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                <div className={Styles.title}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum is simply dummy text.</div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" placeholder='07/04/2024' className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                </div></Tab.Pane>
                                            <Tab.Pane eventKey="third"> <div className={Styles.tabcontainer}>
                                                <div className={Styles.title}>Lorem Ipsum is simply dummy text.</div>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum </div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                <div className={Styles.title}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum is simply dummy text.</div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" placeholder='07/04/2024' className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                </div></Tab.Pane>
                                            <Tab.Pane eventKey="fourth"><div className={Styles.tabcontainer}>
                                                <div className={Styles.title}>Lorem Ipsum is simply dummy text.</div>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum </div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                <div className={Styles.title}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum is simply dummy text.</div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" placeholder='07/04/2024' className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                </div></Tab.Pane>
                                            <Tab.Pane eventKey="fifth"><div className={Styles.tabcontainer}>
                                                <div className={Styles.title}>Lorem Ipsum is simply dummy text.</div>
                                                <>
                                                <div className={Styles.subtitle} >Lorem Ipsum </div>
                                                <div className={Styles.tablerow}>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                            <td className={Styles.ftw600}>1.</td>
                                                            <td><input type="text" placeholder='Action Test' /></td>
                                                            <td><input type="text" placeholder='Test' /></td>
                                                            <td><input type="date" className={Styles.datepicker} /></td>
                                                            <td>
                                                                <InputGroup className="checkboxcntnt">
                                                                    <InputGroup.Checkbox aria-label="Checkbox for completed" />
                                                                    completed?
                                                                </InputGroup>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                                </>
                                                </div></Tab.Pane>
                                        </Tab.Content>
                                        </Col>
                                    </div>
                                    <div className={Styles.footersubmitbtn}>
                                        <div><Button type="button">
                                            Save
                                            </Button>
                                        </div>
                                        <div className={Styles.submitbtn}><Button type="button" onClick={handleShow}>
                                            Submit
                                            </Button>
                                        </div>
                                        <Modal 
                                            size="sm"
                                            show={show} 
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                            dialogClassName="modalbox"
                                            >
                                            <Modal.Body>
                                                <div className={Styles.modaltitle}>Lorem Ipsum</div>
                                                <div className={Styles.modalbodycntnt}>Updated Successfully</div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button type="submit" onClick={handleClose}>
                                                Ok
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Tab.Container>
                </div>
            </>
        );
    };
export default Incompleteactions;