import React from "react"
import {Grid} from "@mui/material";
import OneDay from "./OneDay.jsx";


const AllDays = (props) => {
    const {year, month, day} = props
    const firstDayOfMonth = new Date(year,month , 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let currentDay = firstDayOfMonth
    let allDaysInMonth = []
    while(currentDay <= lastDayOfMonth){
        // set the day's name of the week
        let dayOfTheWeek = new Date(year, month, currentDay.getDay())
            .toLocaleString("en-US", {weekday: "long"});
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
