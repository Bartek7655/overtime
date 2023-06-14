import React, {useEffect, useState} from "react"
import {Button, Grid, Typography} from "@mui/material";
import AllDays from "./AllDays.jsx";
import {useDispatch, useSelector} from "react-redux";
import {uploadNotSavedOvertime} from "../../redux/slices/countOvertimeSlice";


const CountOvertime = () => {
    const [month, setMonth] = useState(new Date().getMonth())
    const dispatch = useDispatch()
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const year = new Date().getFullYear()
    const day = new Date().getDate()
    //get month's name
    const monthName = monthNames[month]
    const entities = useSelector(state => state.notSavedOvertime.entities)

    useEffect(() => {
        // entities = useSelector(state => state.notSavedOvertime.entities)
    }, [])

    const handleButton = (event) => {
        if(event.target.name === 'next'){
            setMonth(prevState => prevState + 1)
        }else{
            setMonth(prevState => prevState - 1)
        }
    }

    const saveOverTime = () => {
        dispatch(uploadNotSavedOvertime(entities))
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

            <Grid item>
                <Button
                    variant="contained"
                    onClick={saveOverTime}
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    )
}

export default CountOvertime
