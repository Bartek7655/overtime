import React, {useEffect} from "react";
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getOvertime} from "../redux/slices/overtime/getOvertime";

import {getCurrentYearAndMonth} from "./utils/getDate";
import {loged} from "./utils/checkUser";
import {SalaryWithCurrentState} from "../salary/SalaryWithCurrentState.jsx";
import {SalaryWithAverageOvertime} from "../salary/SalaryWithAverageOvertime.jsx";

const Home = () => {
    const {month, year} = getCurrentYearAndMonth();
    const dispatch = useDispatch();
    const {loading, entities: overtimeFromDatabase} = useSelector(state => state.getOvertime);
    useEffect(() => {
        if (loged() && loading) {
            dispatch(getOvertime({year, month}));
        }
    }, []);

    return (
        <Grid>
            HomePage
            <SalaryWithCurrentState month={month} year={year}/>
            <SalaryWithAverageOvertime loading={loading} overtimeFromDatabase={overtimeFromDatabase}/>
        </Grid>
    );
};

export default Home;