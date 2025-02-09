import React from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Login from "../component/Login/Login";
import App from "../App";

const Routing =(
    <Router>
        <Routes>
            <Route path="/" element={<App/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>
    </Router>
);

export default Routing;