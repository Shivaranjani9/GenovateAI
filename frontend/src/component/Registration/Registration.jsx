import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";
import axios from "axios";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resId, setResId] = useState("");
  const [labId, setLabId] = useState("");
  const [category, setCategory] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [errorField, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const generateId = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    if (value === "Researcher") {
      setResId(`RES${generateId()}`);
    } else if (value === "Lab Technician") {
      setLabId(`LAB${generateId()}`);
    }
    setError("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setError("");
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleSecurityQuestionChange = (e) => {
    setSecurityQuestion(e.target.value);
    setError("");
  };

  const handleSecurityAnswerChange = (e) => {
    setSecurityAnswer(e.target.value);
    setError("");
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    if (!category) {
      setError("Please select a category");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!name || !email || !phoneNumber || !gender || !password || !confirmPassword || !securityQuestion || !securityAnswer) {
      setError("All fields are required");
      return;
    }
    Register(category, resId, labId, name, email, phoneNumber, gender, password, securityQuestion, securityAnswer);
  };

  const Register = (category, resId, labId, name, email, phoneNumber, gender, password, securityQuestion, securityAnswer) => {
    setError("");
    const registrationData = { category, resId, labId, name, email, phoneNumber, gender, password, securityQuestion, securityAnswer };
    axios
      .post("http://localhost:3005/api/register", registrationData)
      .then((response) => {
        if (response.data.message === "Registration successful") {
          console.log("Registration successful");
          navigate("/login");
        } else {
          setError("Registration failed");
          console.error("Registration failed:", response.data.error);
        }
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        console.error("Error during registration:", error);
      });
  };

  return (
    <div className="outer-container background">
      <div className="container">
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="heading">Welcome to GenovateAI</h1>
              <p className="section">
                GenovateAI is a cutting-edge platform for researchers and lab technicians to collaborate and innovate in the field of genomics.
              </p>
            </div>
          </div>
        </div>
        <div className="form-container log-in-container">
          <form className="input-form">
            <h1 className="heading">Register</h1>
            <div className="formgroup">
              <select
                className="input"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                <option value="Researcher">Researcher</option>
                <option value="Lab Technician">Lab Technician</option>
              </select>
            </div>
            {category === "Researcher" && (
              <div className="formgroup">
                <input
                  className="input"
                  type="text"
                  placeholder="Res ID"
                  value={resId}
                  readOnly
                />
              </div>
            )}
            {category === "Lab Technician" && (
              <div className="formgroup">
                <input
                  className="input"
                  type="text"
                  placeholder="Lab ID"
                  value={labId}
                  readOnly
                />
              </div>
            )}
            <div className="formgroup">
              <input
                className="input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="formgroup">
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="formgroup">
              <input
                className="input"
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className="formgroup">
              <select
                className="input"
                value={gender}
                onChange={handleGenderChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="formgroup">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <p className="showPassword1" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </p>
            </div>
            <div className="formgroup">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <div className="formgroup">
              <select
                className="input"
                value={securityQuestion}
                onChange={handleSecurityQuestionChange}
              >
                <option value="">Select Security Question</option>
                <option value="What is your pet name?">What is your pet name?</option>
                <option value="What is your favorite book?">What is your favorite book?</option>
              </select>
            </div>
            <div className="formgroup">
              <input
                className="input"
                type="text"
                placeholder="Enter your security answer"
                value={securityAnswer}
                onChange={handleSecurityAnswerChange}
              />
            </div>
            <button type="button" className="submit" onClick={handleRegistration}>
              Register
            </button>
            <p className="d-inline">
              Already a Member?
              <Link
                to="/login"
                className="mb-3 mt-3 link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Login
              </Link>
            </p>
            {errorField && (
              <div className="error-message text-danger text-center">
                {errorField}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;