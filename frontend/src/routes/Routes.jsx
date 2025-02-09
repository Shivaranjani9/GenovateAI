import React from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Login from "../component/Login/Login";
import Forgotpassword from "../component/Forgotpassword/Forgotpassword";
import Registration from "../component/Registration/Registration";
import App from "../App";

const Routing =(
    <Router>
        <Routes>
            <Route path="/" element={<App/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/Registration" element={<Registration/>}></Route>
            <Route path="/Forgotpassword" element={<Forgotpassword/>}></Route>
        </Routes>
    </Router>
);

export default Routing;