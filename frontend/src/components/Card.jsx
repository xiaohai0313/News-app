import React, { useState, useRef } from "react"
import { Card, Row, Col, Container, Image } from "react-bootstrap"
import { useHistory, useLocation } from "react-router-dom"
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import MyModal, { Detail_page_share } from './Mymodal';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { MdShare } from "react-icons/md"
import Badge from 'react-bootstrap/Badge'
import TextTruncate from 'react-text-truncate';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { IconContext } from 'react-icons'
import { FaTrash } from 'react-icons/fa'
import Truncate from 'react-truncate';
import { css as toastcss } from 'glamor'
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

// Bookmark page card UI
function Bookmark_page_card(props) {
    let history = useHistory();

    function openDetail() {
        history.push({ pathname: "/detail/article?" + props.Dlink, state: { link: props.Dlink, source: props.Source } });
    }

    // Share box state
    const [show, setShow] = useState(false);
    function handleChange() {
        setShow(false);
    }
    function handleShow(e) {
        if (e) { e.stopPropagation(); }
        setShow(true);
    }

    // Source badge style
    let sour = '';
    let socolor = {};
    let hide = '';
    let location = useLocation();
    if (location.pathname === '/Bookmark') { hide = 'inline-block' }
    else { hide = 'none' }
    if (props.Source === 'N') { sour = 'NYTIMES'; socolor = { backgroundColor: "#bfbfbf", color: 'black', display: hide, marginLeft: '5px' } }
    else if (props.Source === 'G') { sour = 'GUARDIAN'; socolor = { backgroundColor: "#00004d", color: 'white', display: hide, marginLeft: '5px' } }
    let curSection = props.Section.toUpperCase();
    let setcolor = setColors([curSection, null])
   
    // User click delete buttom, remove card from localStorage
    function removeStorage(event, Del) {
        event.stopPropagation();
        let pre_data = JSON.parse(localStorage.getItem("bookmark") || "[]");
        let cur_data = [];
       
        if (pre_data != "[]") {
            for (let i = 0; i < pre_data.length; i++) {
                //skip the delete item
                if (pre_data[i].key !== Del) 
                    cur_data.push(pre_data[i]);
            }
        }
        localStorage.setItem("count", cur_data.length);
        localStorage.setItem("bookmark", JSON.stringify(cur_data));
        // send callback notice, let Bookmark.jsx handle the delete function
        props.onChange(props.Title);
    }
    
    // Each bookmark card bind with popup Modal 
    return (
        [<MyModal source={props.Source} showup={show} title={props.Title} shareurl={props.Shareurl} onChange={handleChange} />,
        <Col xl={3} lg={4} sm={12} md={6} style={{ display: 'inline-block' }}>
            <Container
                onClick={openDetail}
                style={{
                    margin: "10px 0px",
                    'boxShadow': "3px 3px 8px #cccccc",
                    'border': '2px solid',
                    'borderColor': '#e6e6e6',
                    'borderRadius': "8px",
                    'display': 'inline-block',
                }}>

                <Container
                    style={{
                        padding: "10px",
                    }}>
                    <Col style={{ float: 'left' }}>
                        <Row>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', fontStyle: 'italic' }} >{props.Title.replace(/^(.{45}[^\s]*).*/, "$1") + '...'}
                                <MdShare variant="primary" onClick={handleShow}></MdShare>
                                <FaTrash style={{ display: hide }} onClick={(e) => { removeStorage(e, props.Mykey) }}></FaTrash></h2>
                        </Row>
                        <Row>
                            <Col lg={12} xl={12} md={12} sm={12} style={{ padding: "0" }}>
                                <Card><Card.Body style={{ padding: '0' }}><Card.Img src={props.Image} style={{ padding: "5px" }} fluid /></Card.Body></Card> </Col>
                        </Row>
                        <Row style={{ marginTop: '9px', marginBottom: '30px' }}>
                            <Col md={5} lg={5} sm={5} xs={5} style={{ padding: '0' }}><Card.Text style={{ float: "left", fontStyle: 'italic',fontWeight:'600' }}>{props.Date}</Card.Text></Col>
                            <Col style={{ padding: '0' }}>
                                <Card.Text style={{ float: "right" }}>
                                    <Badge style={setcolor}>{curSection}</Badge>
                                    <Badge style={socolor}>{sour}</Badge>
                                </Card.Text>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </Container >
        </Col>
        ]);
}

const tooltip = (info) => (
    <Tooltip id="tooltip">
        {info}
    </Tooltip>
);


function Detail_page_card(props) {
    const ToastOptions = (addordel) => {
        let begin = '';
        if (addordel) { begin = 'Saving '; }
        else { begin = 'Removing ' }
        toast(begin + props.Title, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: false,
            important: true,
            bodyClassName: toastcss({ color: '#0d0d0d' })
        });
    };
 
    // For different bookmark icon 
    const [nonsaved, setShow] = useState('');
    const [saved, setSolid] = useState('');
    let test_data = JSON.parse(localStorage.getItem("bookmark") || "[]");
    let initial = true;
    for (let i = 0; i < test_data.length; i++) {
        //already been bookmarked delete
        if (test_data[i].key == props.Mykey) {
            initial = false;
        }
    }
    if (initial === true && nonsaved === '') { setShow('inline-block'); setSolid('none') }
    else if (initial === false && nonsaved === '') { setShow('none'); setSolid('inline-block') }

    function bookmark() {
        let current_page = {
            'key': props.Mykey,
            'url': props.Dlink,
            'date': props.Date,
            'img': props.Image,
            'title': props.Title,
            'source': props.Source,
            'section': props.Section,
            'Mykey': props.Mykey,
            'Shareurl': props.Shareurl
        };
        //image,title,date,source,section
        let pre_data = JSON.parse(localStorage.getItem("bookmark") || "[]");
        let cur_data = [];
      
        // check if this news has been stored
        let sw = true;
        if (pre_data != "[]") {
            for (let i = 0; i < pre_data.length; i++) {
                //already been bookmarked delete
                if (pre_data[i].key == current_page.key) {
                    sw = false;
                }
                else { cur_data.push(pre_data[i]) }
            }
        }
        if (sw == true) { cur_data.push(current_page); ToastOptions(true); setShow('none'); setSolid('inline-block') }
        else { ToastOptions(false); setShow('inline-block'); setSolid('none') }
       
        localStorage.setItem("count", cur_data.length);
        localStorage.setItem("bookmark", JSON.stringify(cur_data));
    }
    let scroll = Scroll.animateScroll;
    let scroller = Scroll.scroller;
    let Element = Scroll.Element;

    // Scroll icon state
    const [toggle, setToggle] = useState(false);
    
    function showWhole() {
        if (toggle === false) {
            setToggle(!toggle);
            scroller.scrollTo('scrollpoint', {
                smooth: true,
            })
        }
        else if (toggle === true) {
            setToggle(!toggle);
            scroll.scrollToTop();
        }
    }

    return (
        <Container
            id={'detail_begin'}
            fluid="true" style={{
                margin: "40px 20px",
                'boxShadow': "3px 3px 8px grey",
                'borderRadius': "8px"
            }}>
            <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable={false}
                pauseOnHover
            />
            <Container
                fluid="true" style={{
                    padding: "40px",
                }}>
                <Row ><h1 style={{ fontStyle: 'italic', fontSize: '1.6rem', fontWeight: '500', cursor: "pointer" }}>{props.Title}</h1></Row>
                <Row>
                    <Col xs={5} style={{ padding: '0' }}>
                        <Card.Text style={{ fontStyle: 'italic', cursor: "pointer",fontWeight:'600' }}>{props.Date}</Card.Text>
                    </Col>
                    <Col xs={5} style={{ textAlign: 'right', padding: '0' }}>
                        <Detail_page_share title={props.Title} shareurl={props.Shareurl} />
                    </Col >
                    <Col xs={2} style={{ textAlign: 'right', padding: '0' }}>
                        <IconContext.Provider value={{ color: "#cc0000" }}>
                            <OverlayTrigger placement="top" overlay={tooltip("Bookmark")}>
                                <FaRegBookmark onClick={bookmark} style={{ height: "26px", width: "23px", display: nonsaved, cursor: "pointer" }}></FaRegBookmark>
                            </OverlayTrigger>
                        </IconContext.Provider>
                        <IconContext.Provider value={{ color: "#cc0000" }}>
                            <OverlayTrigger placement="top" overlay={tooltip("Bookmark")}>
                                <FaBookmark onClick={bookmark} style={{ height: "26px", width: "23px", display: saved, cursor: "pointer" }}></FaBookmark>
                            </OverlayTrigger>
                        </IconContext.Provider>
                    </Col>
                </Row>
                <Row >
                    <Col style={{ padding: '0' }}>
                        <Card.Img src={props.Image} style={{ padding: "5px", cursor: "pointer" }} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ padding: '0' }}>
                        <Card.Text style={{ cursor: "pointer" }}>{props.Shortdecp}</Card.Text><Element name="scrollpoint"></Element>
                        {toggle === true ? <Card.Text style={{ cursor: "pointer" }}>{props.Longdecp}</Card.Text> : null}

                    </Col>
                </Row>
                <Row>
                    <Col style={{ padding: '0' }}>
                        {props.Longdecp !== '' ?
                            toggle === false ?
                                <IoIosArrowDown onClick={showWhole} style={{ float: 'right', marginTop: '2vw' }} /> :
                                <IoIosArrowUp onClick={showWhole} style={{ float: 'right', marginTop: '2vw' }} />
                            : null}
                    </Col>
                </Row>
            </Container>
        </Container >
    );
}

// For all different type of card badge color style 
function setColors(stack) {

    const color_array = {
        'WORLD': "#8046b9",
        'POLITICS': "#46b99c",
        'BUSINESS': "#26acd9",
        'TECHNOLOGY': "#99b34d",
        'SPORTS': "#d9ac26",
        'SPORT': "#d9ac26",
        'other': '#737373'
    }
    var color_word = {};
    if (stack[0] === 'TECHNOLOGY' || stack[0] === 'SPORTS' || stack[0] === 'SPORT') {
        color_word = { backgroundColor: color_array[stack[0]], color: "black" }
    }
    else if (stack[0] === 'BUSINESS' || stack[0] === 'WORLD' || stack[0] === 'POLITICS') {
        color_word = { backgroundColor: color_array[stack[0]], color: "white" }
    }
    else {
        color_word = { backgroundColor: color_array['other'], color: "white" }
    }
    return color_word
}

// Home page card UI
function Card_page(props) {
    let history = useHistory();

    function openDetail(e) {
        history.push({ pathname: "/detail/article/" + props.Dlink, state: { link: props.Dlink, source: props.Source } });
        e.stopPropagation();
    }

    // Modal toggle
    const [show, setShow] = useState(false);
    const handleShow = (e) => { e.stopPropagation(); setShow(true); }
    function handleChange() {
        setShow(false);
    }

    let curSection = props.Section.toUpperCase();
    let setcolor = setColors([curSection, null])
    


    return (
        [<MyModal showup={show} title={props.Title} shareurl={props.Shareurl} onChange={handleChange} />,
        <Container

            onClick={openDetail}
            fluid="true" style={{
                margin: "40px 20px",
                cursor: "pointer",
                'boxShadow': "3px 3px 8px grey",
                'borderRadius': "8px"
            }}>
            <Container

                value={props.Dlink}
                fluid="true" style={{
                    padding: "40px",
                }}>
                <Row>
                    <Col lg={4} xl={3} md={5} sm={12} style={{ padding: '0 10px 0 0' }} >
                        <Card><Card.Body style={{ padding: '0' }}><Card.Img src={props.Image} style={{ padding: "5px" }} /></Card.Body></Card> </Col>
                    <Col style={{ marginLeft: '1vw' }}>
                        <Row><h2 style={{ fontWeight: "bold", fontStyle: 'italic', fontSize: '1.5rem' }}>{props.Title}
                            <MdShare variant="primary" onClick={handleShow}></MdShare></h2></Row>
                        <Row><TextTruncate line={3} text={props.Description} /></Row>
                        <Row style={{ marginTop: '2vw' }}>
                            <Col style={{ paddingLeft: '0' }}><Card.Text style={{ float: "left", fontStyle: 'italic',fontWeight:'600' }}>{props.Date}</Card.Text></Col>
                            <Col ><Card.Text style={{ float: "right" }}><Badge style={setcolor}>{curSection}</Badge></Card.Text></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>
        ]);
    //}
}

export default Card_page;
export { Detail_page_card, Bookmark_page_card };
