import React from 'react';

import '../App.css';
//import nav bar and container components for react bootstrap
import { Nav, Navbar, Container } from 'react-bootstrap';

//import Logo
import logo from '../assets/ingismicrogreenstransparentV1.png';

//import react-router-dom to display pages & navigate between them
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//import pages to create route for home, inventory, orders, calendar
import Home from "../components/Home.js";
import Inventory from "../components/Inventory.js";
import Orders from "../components/Orders.js";
import Calendar from "../components/Calendar.js";

//wrap react bootstrap element in <LinkContainer> to make it behave like a react router
import { LinkContainer } from 'react-router-bootstrap';

function NavigationBar () {
return (
    <Router>
      <div className='App'>
        {/* navigation html with bootstrap  */}
        <Navbar bg="light" expand="lg">
          <Container fluid>
              <LinkContainer to = "/">
            <Navbar.Brand>
              <img 
                alt="Logo"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"/>{' '}
              Ingi's Microgreens
            </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                  <LinkContainer to = "/"><Nav.Link>Home</Nav.Link></LinkContainer>
                  <LinkContainer to = "/inventory"><Nav.Link>Inventory</Nav.Link></LinkContainer>
                  <LinkContainer to = "/orders"><Nav.Link>Orders</Nav.Link></LinkContainer>
                  <LinkContainer to = "/calendar"><Nav.Link>Calendar</Nav.Link></LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
      </Navbar>
    </div>
    <div>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/inventory" element = {<Inventory/>}/>
        <Route path = "/orders" element = {<Orders/>}/>
        <Route path = "/calendar" element = {<Calendar/>}/>
      </Routes>
    </div>
  </Router>
)};

export default NavigationBar;