import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css"; // Import the CSS file
import Login from "./Login"; // Import the Login component

const App = () => {
  // State to track the active section
  const [activeSection, setActiveSection] = useState("section1");

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId); // Update the active section
    }
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <ul className="navbar-links">
            <li>
              <a
                href="#section1"
                onClick={() => scrollToSection("section1")}
                className={activeSection === "section1" ? "active" : ""}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#section2"
                onClick={() => scrollToSection("section2")}
                className={activeSection === "section2" ? "active" : ""}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#section3"
                onClick={() => scrollToSection("section3")}
                className={activeSection === "section3" ? "active" : ""}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#section4"
                onClick={() => scrollToSection("section4")}
                className={activeSection === "section4" ? "active" : ""}
              >
                Contact
              </a>
            </li>
            {/* Login Button */}
            <li style={{ marginLeft: "auto" }}>
              <Link to="/login" className="login-button">
                Login
              </Link>
            </li>
          </ul>
        </nav>

        {/* Content Sections */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="section1" className="section">
                  <h1>Home</h1>
                  <p>Welcome to the home section. Scroll down for more sections.</p>
                </section>
                <section id="section2" className="section">
                  <h1>About</h1>
                  <p>This is the about section. You can learn more about us here.</p>
                </section>
                <section id="section3" className="section">
                  <h1>Services</h1>
                  <p>Explore the services we offer.</p>
                </section>
                <section id="section4" className="section">
                  <h1>Contact</h1>
                  <p>Feel free to get in touch with us via this section.</p>
                </section>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;