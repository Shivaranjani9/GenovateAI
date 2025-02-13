import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";
import Registration from "./component/Registration/Registration";
import Dashboard from "./component/Lab Techinician Dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/dashboard" element={<ProtectedRoute returnUrl="/dashboard">
      <Dashboard />
      </ProtectedRoute>}>
      </Route>
    </Routes>
  </Router>
);

export default App;