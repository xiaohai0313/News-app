import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { Route, Link } from "react-router-dom"
import Switch from "react-switch"



function NavBar() {
  return (
    <Navbar collapseOnSelect bg="light" expand="md">
      <Navbar.Brand href="">Not collapse term</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" href="/Home">Home</Nav.Link>
          <Nav.Link as={Link} to="/world" href="/World">World</Nav.Link>
          <Nav.Link as={Link} to="/politics" href="/Politics">Politics</Nav.Link>
          <Nav.Link as={Link} to="/buiness" href="/Business">Business</Nav.Link>
          <Nav.Link as={Link} to="/technology" href="/Technology">Technology</Nav.Link>
          <Nav.Link as={Link} to="/sports" href="/Sports">Sports</Nav.Link>
          <Switch onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;