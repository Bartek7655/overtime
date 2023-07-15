import React, {useEffect} from "react";
import {getCurrentYearAndMonth} from "../components/utils/getDate";
import {useDispatch, useSelector} from "react-redux";
import {getOvertime} from "../redux/slices/overtime/getOvertime";

export const SalaryWithAverageOvertime = (props) => {
    const {loading: loadingCurrentMonth, overtimeFromDatabase: currentMonthFromDatabase} = props;
    const currentMonthFromDatabase_ = currentMonthFromDatabase
    let {year, month} = getCurrentYearAndMonth();
    const dispatch = useDispatch();
    const {loading: loadingLastMonth, entities: lastMonthFromDatabase} = useSelector(state => state.getOvertime);

    console.log('currentMonthFromDatabase',currentMonthFromDatabase_);
    console.log('lastMonth',lastMonthFromDatabase);
    console.log(loadingCurrentMonth);
    // useEffect(() => {
    //     month = month-1; // last month
        // if(!loadingCurrentMonth) {
        //     console.log('test', month);
        //
        //     dispatch(getOvertime(month, year));
        // }
    // }, [loadingCurrentMonth]);
};
