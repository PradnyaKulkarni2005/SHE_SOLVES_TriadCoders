import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css'; // Ensure this is imported if the styles are in a separate file

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="logo-text">Her World</Navbar.Brand>

        
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Links */}
        <Navbar id="navbar-nav"className='navbar'>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/forum" className="nav-link">Fem Forum</Nav.Link>
            <Nav.Link as={Link} to="/share-business" className="nav-link">Women Thrive</Nav.Link>
            <Nav.Link as={Link} to="/news" className="nav-link">Beyond Boundaries</Nav.Link>
            <Nav.Link as={Link} to="/wonderland" className="nav-link">Women Wonderland</Nav.Link>

        
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
