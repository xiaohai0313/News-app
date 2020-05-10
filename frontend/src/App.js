import React, { useState, Fragment, useEffect } from "react"
import "./App.css"
import { Switch as RouterSwitch, Route, Link, useLocation, useParams, useHistory } from "react-router-dom"
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Business from "./components/Business"
import Bookmark from "./components/Bookmark"
import Politics from "./components/Politics"
import Sports from "./components/Sports"
import Technology from "./components/Technology"
import World from "./components/World"
import Home from "./components/Home"
import Switch from "react-switch"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Detailed from "./components/detail"
import Autosuggest from './components/autosuggest'
import Search_Result from './components/Search'
import { OverlayTrigger, Tooltip, Container, Row, Col, } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';


function App(props) {

  const tooltip = (info) => (
    <Tooltip id="tooltip">
      {info}
    </Tooltip>
  );
  //all the initial source G is initial
  const [source, setSource] = useState("G");
  const [checked, setChecked] = useState(true);

  let location = useLocation();
  let history = useHistory();

  // Switch news source
  const handleChange = () => {
    if (source == 'G') {
      setSource("N")
      setChecked(false);
    }
    else if (source == 'N') {
      setSource("G")
      setChecked(true);
    }

    history.push(location.pathname);
  };

  // Route to bookmark page
  function bookmark() {
    history.push("/Bookmark");
  }
  const [hide, setHidden] = useState("inline-block");

  if ((location.pathname.substring(1, 7) === "detail" || location.pathname.substring(1, 7) === "Bookma" || location.pathname.substring(1, 7) === "search") && hide != "none") {
    setHidden("none");
  }
  else if ((location.pathname.substring(1, 7) !== "detail" && location.pathname.substring(1, 7) !== "Bookma" && location.pathname.substring(1, 7) !== "search") && hide != "inline-block") {
    setHidden("inline-block");
  }

  
  const navbar = { backgroundColor: '#294489', color: "#DDE0E8" };
  const fontColor = { color: "#E6E7E8", margin: "0 ", fontSize: '20px', display: hide }
  const active_list = ["/home", "/world", "/politics", "/buiness", "/technology", "/sports"];
  var active = '';
  if (location.pathname === "/home") { active = "/Home" }
  else if (location.pathname === "/technology") { active = "/Technology" }
  else if (location.pathname === "/world") { active = "/World" }
  else if (location.pathname === "/politics") { active = "/Politics" }
  else if (location.pathname === "/business") { active = "/Business" }
  else if (location.pathname === "/sports") { active = "/Sports" }
  
  const [hp, setShow] = useState('inline-block');
  const [bk, setSolid] = useState('none');
  if (location.pathname === '/Bookmark' && hp === 'inline-block') {
    setShow('none'); setSolid('inline-block');
  }
  else if (location.pathname !== '/Bookmark' && hp === 'none') { setShow('inline-block'); setSolid('none'); }

  let marginset = { margin: 'auto 15px auto 0' };

  // Home UI Top NavBar combine with route && source switch function
  return (
    <main>

      <Navbar style={navbar} collapseOnSelect expand="lg" variant="dark" fluid="true">
        <Col xs={10} sm={6} md={7} lg={3} style={{ marginLeft: '0', paddingLeft: '0', textAlign: 'left' }}>
          <Autosuggest
            source={source}
          />
        </Col>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="mr-auto" activeKey={active}>
            <Nav.Item><Nav.Link as={Link} to="/home" href="/Home" exact='true' >Home</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/world" href="/World">World</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/politics" href="/Politics">Politics</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/business" href="/Business">Business</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/technology" href="/Technology">Technology</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/sports" href="/Sports">Sports</Nav.Link></Nav.Item>
          </Nav>
          <Nav className="justify-content-end" >
            <Nav.Item style={marginset}  >
              <OverlayTrigger placement="bottom" overlay={tooltip("Bookmark")} >
                <FaRegBookmark onClick={bookmark} style={{ height: "30px", width: "22px", display: hp }}></FaRegBookmark>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={tooltip("Bookmark")} >
                <FaBookmark onClick={bookmark} style={{ height: "30px", width: "22px", display: bk }}></FaBookmark>
              </OverlayTrigger>
            </Nav.Item>
            <Nav.Item style={marginset}>
              <Navbar.Text style={fontColor}>NYTimes</Navbar.Text>
            </Nav.Item>
            <Nav.Item style={{ display: hide, margin: 'auto 15px auto 0' }}>
              <Switch
                className="react-switch"
                style={{ display: 'none' }}
                onChange={handleChange}
                checked={checked}
                onColor="#257DEC"
                onHandleColor="#E6E7E8"
                handleDiameter={28}
                uncheckedIcon={false}
                checkedIcon={false}
                height={28}
                width={57}
              />
            </Nav.Item>
            <Nav.Item style={marginset}>
              <Navbar.Text style={fontColor}>Guardian</Navbar.Text>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div key={location.key}>
        <RouterSwitch>
          <Route path="/home" render={(props) => <Home {...props} sources={source} />} exact />
          <Route path="/business" render={(props) => <Business {...props} sources={source} />} />
          <Route path="/politics" render={(props) => <Politics {...props} sources={source} />} />
          <Route path="/sports" render={(props) => <Sports {...props} sources={source} />} />
          <Route path="/technology" render={(props) => <Technology {...props} sources={source} />} />
          <Route path="/world" render={(props) => <World {...props} sources={source} />} />
          <Route path="/Bookmark" component={Bookmark} />
          <Route path="/detail/" component={Detailed} />
          <Route path="/search" component={Search_Result} />
        </RouterSwitch>
      </div>

    </main>


  )
}

export default App;

