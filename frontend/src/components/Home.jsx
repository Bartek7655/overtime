import React, {useEffect} from "react";
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getOvertime} from "../redux/slices/overtime/getOvertime";

import {getCurrentDate} from "./utils/getDate";
import {loged} from "./utils/checkUser";

const Home = () => {
    const {month, year} = getCurrentDate();
    const dispatch = useDispatch();
    const overtimeFromDatabase = useSelector(state => state.getOvertime.entities);
    useEffect(() => {
        if (loged() && !overtimeFromDatabase) {
            dispatch(getOvertime({month, year}));
        }
    });

    return (
        <Grid>
            HomePage
        </Grid>
    );
};

export default Home;
