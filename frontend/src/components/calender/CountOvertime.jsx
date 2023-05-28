import React from "react"
import {Grid, Typography} from "@mui/material";
import AllDays from "./AllDays.jsx";


const CountOvertime = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const day = new Date().getDate()
    //get month's name
    const monthName = monthNames[month]
    return(
        <Grid container spacing={2}>
            <Grid item>
                <Typography variant="h2">
                    {monthName}
                </Typography>
            </Grid>
            <Grid item>
                <AllDays year={year} month={month} day={day}/>
            </Grid>
        </Grid>
    )
}

export default CountOvertime
