import React from "react";
import {Grid} from "@mui/material";

import {getCurrentYearAndMonth} from "./utils/getDate";
import {SalaryCurrentMonth} from "../salary/SalaryCurrentMonth.jsx";

const Home = () => {
    const {year, month} = getCurrentYearAndMonth();

    return (
        <Grid>
            HomePage
            <SalaryCurrentMonth year={year} month={month}/>
        </Grid>
    );
};

export default Home;