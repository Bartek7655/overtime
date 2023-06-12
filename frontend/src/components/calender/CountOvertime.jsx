import React, {useState} from "react"
import {Button, Grid, Typography} from "@mui/material";
import AllDays from "./AllDays.jsx";


const CountOvertime = () => {
    const [month, setMonth] = useState(new Date().getMonth())
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const year = new Date().getFullYear()
    const day = new Date().getDate()
    //get month's name
    const monthName = monthNames[month]

    const handleButton = (event) => {
        if(event.target.name === 'next'){
            setMonth(prevState => prevState + 1)
        }else{
            setMonth(prevState => prevState - 1)
        }
    }

    return(
        <Grid container spacing={2}>
            <Grid item>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <Button
                            name='previous'
                            variant="contained"
                            onClick={handleButton}>
                            &larr; previous
                        </Button>
                    </Grid>
                    <Grid item xs={8} align="center">
                        <Typography variant="h3">
                            {monthName}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            name='next'
                            variant="contained"
                            onClick={handleButton}>
                            &rarr; next
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
            <Grid item>
                <AllDays year={year} month={month} day={day}/>
            </Grid>
        </Grid>
    )
}

export default CountOvertime
