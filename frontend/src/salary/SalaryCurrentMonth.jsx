import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useDispatch} from "react-redux";

import {getFullMonthName} from "../components/utils/getDate";
import {countWorkingDaysOfMonth} from "../components/utils/countWorkingDaysOfMonth";
import {countSalary} from "../components/utils/countSalary/countSalary";
import {getOvertime} from "../redux/slices/overtime/getOvertime";
import {useSelector} from "react-redux";

export const SalaryCurrentMonth = (props) => {
    const {year, month} = props;

    const [salary, setSalary] = useState(0);
    const dispatch = useDispatch();
    const {loading, entities: overtimeFromDatabase} = useSelector(state => state.getOvertime);
    const workingDays = countWorkingDaysOfMonth(year, month);
    const hourlyRate = 14.2;

    useEffect(() => {
        if(loading && overtimeFromDatabase.length === 0){
            const month = props.month -1;
            dispatch(getOvertime({year, month}));
        }}, [loading]);

    useEffect(() => {
        let overtime = 0;
        if(overtimeFromDatabase.length > 0){
            overtimeFromDatabase.forEach(day => {
                overtime += day.overtime;
        });

        setSalary(countSalary(workingDays, overtime, hourlyRate));
        }}, [overtimeFromDatabase]);

    return(
        <Grid container>
            <Grid item>
                <Typography variant="h6">
                    Your expected salary for {getFullMonthName(month)} is {salary}€
                </Typography>
            </Grid>
        </Grid>
    );
};

SalaryCurrentMonth.propTypes = {
    month: PropTypes.number,
    year: PropTypes.number
};
