import React, {useEffect, useState} from "react"
import {Grid} from "@mui/material";
import OneDay from "./OneDay.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getOvertime} from "../../redux/slices/overtime/getOvertime";


const AllDays = (props) => {
    const {year, month} = props
    const firstDayOfMonth = new Date(year,month , 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const dispatch = useDispatch()
    const overtimeFromDatabase = useSelector(state => state.getOvertime.entities)
    const overtimeNotSaved = useSelector(state => state.notSavedOvertime.entities)


    useEffect(() => {
        const monthToFetch = month + 1
        dispatch(getOvertime({monthToFetch , year}))
    }, [month])



    let currentDay = firstDayOfMonth
    let allDaysInMonth = []

    const getPreviousState = (dayNumber) => {
        let fulfilledDay = {
            start_time: '',
            end_time: '',
            sickness: false,
            holiday: false
        }
        if (overtimeFromDatabase){
            overtimeFromDatabase.forEach(day => {
                if (parseInt(day.date.split('-')[2]) === dayNumber){
                    fulfilledDay = day
                }
            })
        }
        if (overtimeNotSaved){
            overtimeNotSaved.forEach(day => {
                if (parseInt(day.date.split('-')[2]) === dayNumber){
                    fulfilledDay = day
                }
            })
        }
        return fulfilledDay
    }

    while(currentDay <= lastDayOfMonth){
        // set the day's name of the week
        const dayOfTheWeek = currentDay.toLocaleString("en-US", {weekday: "long"});
        const dayNumber = currentDay.getDate()
        const currentState = getPreviousState(dayNumber)

        allDaysInMonth.push(
            {day: dayNumber, dayOfTheWeek: dayOfTheWeek, currentState: currentState}
        )
        currentDay.setDate(currentDay.getDate() + 1);
    }

    const allDaysContent = (
        <Grid container spacing={3}>
                {allDaysInMonth.map((day)=>{
                    return(
                        <OneDay
                            key={day.day}
                            day={day.day}
                            month={month}
                            year={year}
                            dayOfTheWeek={day.dayOfTheWeek}
                            currentState={day.currentState}
                        />
                    )
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
