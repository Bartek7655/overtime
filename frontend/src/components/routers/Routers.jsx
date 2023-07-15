import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../Home.jsx";
import SignIn from "../user/SignIn.jsx";
import SignUp from "../user/SignUp.jsx";
import CountOvertime from "../calender/CountOvertime.jsx";
import SignOut from "../user/SignOut.jsx";


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/countovertime" element={<CountOvertime/>} />
        </Routes>
    );
};

export default Routers;
