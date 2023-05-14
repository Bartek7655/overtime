import React from "react";
import {Route, Routes} from "react-router-dom";
import App from "../App.jsx";
import SignIn from "../SignIn.jsx";
import SignUp from "../SignUp.jsx";
import CountOvertime from "../calender/CountOvertime.jsx";


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/countovertime" element={<CountOvertime/>} />
        </Routes>
    )
}

export default Routers
