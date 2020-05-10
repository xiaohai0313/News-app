import Modal from "react-bootstrap/Modal";
import React, { useState, Fragment } from "react"
import { EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from "react-share";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Row, Col, Container } from "react-bootstrap"
import {useLocation} from "react-router-dom"

function Detail_page_share(props) {

  const tooltip = (info) => (
    <Tooltip id="tooltip">
      {info}
    </Tooltip>
  );

  return (
    <Fragment >
      <OverlayTrigger placement="top" overlay={tooltip("Facebook")}>
        <FacebookShareButton url={props.shareurl} hashtag={"#CSCI_571_NewsApp"} >
          <FacebookIcon
            size={32}
            round={true}
          />
        </FacebookShareButton>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={tooltip("Twitter")}>
        <TwitterShareButton url={props.shareurl} hashtags={["CSCI_571_NewsApp"]}>
          <TwitterIcon size={32} round={true} /></TwitterShareButton>
      </OverlayTrigger>

      <OverlayTrigger placement="top" overlay={tooltip("Email")}>
        <EmailShareButton url={props.shareurl} subject={"#CSCI_571_NewsApp"}>
          <EmailIcon size={32} round={true} /></EmailShareButton>
      </OverlayTrigger>
    </Fragment>
  )
}

export { Detail_page_share }



function MyModal(props) {

  const [show, setShow] = useState(false);
  let showSource = 'none';
  let soul = '';
  if (props.showup === true && show === false) {
    setShow(true)
  }
  let location = useLocation();
  if (location.pathname === '/Bookmark' && showSource === 'none') {
    if (props.source === 'G') { soul = "GUARDIAN" }
    else { soul = "NY Times" }
    showSource = 'block';
  }
 
  const handleClose = (e) => { if (e) { e.stopPropagation(); } setShow(false); showSource = 'none'; props.onChange(); }

  //Don't close yet while user click inside of Modal
  const keepOpen = (e) => { if (e) { e.stopPropagation(); e.preventDefault(); e.nativeEvent.stopImmediatePropagation(); } }

  return (
    <>
      <Modal show={show} onClick={keepOpen} onHide={handleClose}>
        <Modal.Header closeButton >

          <Modal.Title style={{ fontWeight: '600' }}>
            <h2 style={{ fontWeight: '600',display:showSource }}>{soul}</h2>{props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Container>
            <Modal.Title style={{ margin: 'auto', textAlign: 'center' }}>Share via</Modal.Title>
          </Container>
          <Col style={{ textAlign: 'center' }}>
            <FacebookShareButton url={props.shareurl} hashtag={"#CSCI_571_NewsApp"}><FacebookIcon size={62} round={true} /></FacebookShareButton>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <TwitterShareButton url={props.shareurl} hashtags={["CSCI_571_NewsApp"]}><TwitterIcon size={62} round={true} /></TwitterShareButton>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <EmailShareButton url={props.shareurl} subject={"#CSCI_571_NewsApp"}><EmailIcon size={62} round={true} /></EmailShareButton>
          </Col>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MyModal