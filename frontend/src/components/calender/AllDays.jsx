import React, {useEffect} from "react"
import {Grid} from "@mui/material";
import OneDay from "./OneDay.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getOvertime} from "../../redux/slices/overtime/getOvertime";


const AllDays = (props) => {
    const {year, month, day} = props
    const firstDayOfMonth = new Date(year,month , 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const dispatch = useDispatch()
    const entities = useSelector(state => state.getOvertime.entities)

    useEffect(() => {
        const test = month + 1
        dispatch(getOvertime({ test , year}))
    }, [month])

    let currentDay = firstDayOfMonth
    let allDaysInMonth = []
    while(currentDay <= lastDayOfMonth){
        // set the day's name of the week
        const dayOfTheWeek = currentDay.toLocaleString("en-US", {weekday: "long"});
        // add current day to the list
        allDaysInMonth.push(
            {"day": currentDay.getDate(), "dayOfTheWeek": dayOfTheWeek}
        )
        currentDay.setDate(currentDay.getDate() + 1);
    }

    const allDaysContent = (
        <Grid container spacing={3}>
                {allDaysInMonth.map((day)=>{
                    return <OneDay key={day.day} day={day.day} month={month} year={year} dayOfTheWeek={day.dayOfTheWeek}/>
                })}
        </Grid>
    )


    return(
        <Grid>
            {allDaysContent}
        </Grid>
    )
}

export default AllDays
