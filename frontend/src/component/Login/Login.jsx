import React, { useRef, useState } from 'react'; // Import useState
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // State to track login/register

  const flipperRef = useRef(null);

  const handleFlip = () => {
    flipperRef.current.classList.toggle('flip');
    setIsLogin(!isLogin); // Update the state
  };

  return (
    <div className="flip-container">
      <div className="flipper" id="flipper" ref={flipperRef}>
        <div className="front">
          <h1 className="title">Login</h1>
          <form>
            <input type="text" type="" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="button" value="Login" />
          </form>
          <a className="flipbutton" id="loginButton" href="#" onClick={handleFlip}>
            Create my account →
          </a>
        </div>

        <div className="back">
          <h1 className="title">Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="button" value="Sign up" />
          </form>
          <a className="flipbutton" id="registerButton" href="#" onClick={handleFlip}>
            Login to my account →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
