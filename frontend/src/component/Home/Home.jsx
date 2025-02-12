import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Full-width Navbar */}
      <Navbar expand="lg" fixed="top" className="navbar-box">
        <Container>
          <Navbar.Brand onClick={() => scrollToSection("home")} className="navbar-brand">
            <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="mx-auto navbar-links">
              <Nav.Link onClick={() => scrollToSection("home")} className="nav-item">Home</Nav.Link>
              <Nav.Link onClick={() => scrollToSection("about")} className="nav-item">About</Nav.Link>
              <Nav.Link onClick={() => scrollToSection("analysis")} className="nav-item">Analysis</Nav.Link>
              <Nav.Link onClick={() => scrollToSection("contact")} className="nav-item">Contact Us</Nav.Link>
            </Nav>
            <Button variant="dark" className="custom-login-btn" onClick={() => navigate("/login")}> 
              Login
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Quote Box Below Navbar */}
      <div className="quote-box">
        "Your health is an investment, not an expense."
      </div>
    </>
  );
};

export default Home;
