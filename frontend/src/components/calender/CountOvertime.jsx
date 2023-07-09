import React, {useEffect, useState} from "react"
import {Button, Grid, Typography} from "@mui/material";
import AllDays from "./AllDays.jsx";
import {useDispatch, useSelector} from "react-redux";

import {convertOvertimeToShownString} from "../utils/createStringOvertime";
import {uploadNotSavedOvertime} from "../../redux/slices/overtime/notSavedOvertimeSlice";


const CountOvertime = () => {
    const [date, setDate] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    const [totalOvertime, setTotalOvertime] = useState(0)
    const [shownStringOvertime, setShownStringOvertime] = useState(convertOvertimeToShownString(totalOvertime))
    const dispatch = useDispatch()
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    //get month's name
    const monthName = monthNames[date.month]
    const notSavedOvertime = useSelector(state => state.notSavedOvertime.entities)
    const savedOvertime = useSelector(state => state.getOvertime.entities)

    useEffect(() => setTotalOvertime(0), [date])

    useEffect(() => setShownStringOvertime(convertOvertimeToShownString(totalOvertime)), [totalOvertime])

    useEffect(() => {
        let overtime = 0

        if(notSavedOvertime){
            overtime = accumulationOvertime(notSavedOvertime)
        }
        if(savedOvertime){
            overtime += accumulationOvertime(savedOvertime)
        }
        if(notSavedOvertime && savedOvertime){
            overtime += checkDoubleDay(savedOvertime, notSavedOvertime)
        }

        setTotalOvertime(overtime)
    }, [notSavedOvertime])

    useEffect(() => {
        if(savedOvertime) {
            setTotalOvertime(accumulationOvertime(savedOvertime))
        }

    }, [savedOvertime])

    const accumulationOvertime = (days) => {
        let overtime = 0
        days.forEach(day => overtime += day.overtime)

        return overtime
    }

    const checkDoubleDay = (savedOvertime, notSavedOvertime) => {
        let doubledOvertime = 0
        notSavedOvertime.forEach(notSavedDay => {
            savedOvertime.forEach(savedDay => {
                if(Number(notSavedDay.date.split('-')[2]) === Number(savedDay.date.split('-')[2])){
                    doubledOvertime -= savedDay.overtime
                }
            })
        })

        return doubledOvertime
    }

    const changeMonth = (event) => {
        if(event.target.name === 'next'){
            if(date.month === 11){
                setDate((prevState) => (
                    {
                        year: prevState.year + 1,
                        month: 0
                    }
                ))
            }else{
                setDate((prevState) => ({
                    ...prevState,
                    month: prevState.month + 1
                })
            )}

        }else{
            if(date.month === 0){
                setDate((prevState) => ({
                    year: prevState.year -1,
                    month: 11
                }))
            }else{
                setDate((prevState) => ({
                    ...prevState,
                    month: prevState.month -1
                }))
            }
        }
    }


    const saveOverTime = () => {
        dispatch(uploadNotSavedOvertime(notSavedOvertime))

    }


    return(
        <Grid container spacing={2}>
            <Grid item>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <Button
                            name='previous'
                            variant="contained"
                            onClick={changeMonth}>
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
                            onClick={changeMonth}>
                            &rarr; next
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
            <Grid item>
                <AllDays year={date.year} month={date.month}/>
            </Grid>

            <Grid item>
                <Typography variant="h5">
                    Total overtime {shownStringOvertime}
                </Typography>
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
