// src/component/Home/Home.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isResponsive, setIsResponsive] = useState(false);
  const navigate = useNavigate();

  const toggleResponsive = () => {
    setIsResponsive(!isResponsive);
  };

  return (
    <div>
      <div className={`spectacledcoder-topnav ${isResponsive ? 'responsive' : ''}`} id="myTopnav">
        <Link to="#" className="spectacledcoder-active">
          Home <i className="fa fa-home" aria-hidden="true"></i>
        </Link>
        <Link to="#">
          Blog <i className="fa fa-book"></i>
        </Link>
        <Link to="#">
          Contact <i className="fa fa-envelope"></i>
        </Link>
        <Link to="#">
          About <i className="fa fa-user"></i>
        </Link>
        <div className="spectacledcoder-right-lnk">
          <Link to="/login">Login / Signup</Link>
        </div>
        <a href="#" className="spectacledcoder-icon" onClick={toggleResponsive}>
          <i className="fa fa-bars"></i>
        </a>
      </div>

      <div style={{ paddingLeft: '16px' }}>
        <h2>Responsive Topnav Example</h2>
        <p>
          Resize the browser window to see how it works, made with ❤️ by Jason. Please subscribe to my youtube channel.{' '}
          <a href="https://www.youtube.com/channel/UCQrfBdkEyplOXW4yqK26asw" target="_blank" rel="noopener noreferrer">
            HERE
          </a>{' '}
          icons made with Font Awesome <i className="fa fa-font-awesome"></i>
        </p>
        {/*login button*/}
        <button
              onClick={() => navigate("/login")}
              style={{
                background: "none",
                border: "none",
                color: "black",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              Login
            </button>
      </div>
    </div>
  );
};

export default Home;
