import React, {useEffect, useState} from "react"
import {Grid} from "@mui/material";
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import {useDispatch} from "react-redux";
import {addNewDay} from "../../redux/slices/countOvertimeSlice";

const OneDay = (props) => {
    const [finishOvertime, setFinishOvertime] = useState('')
    const {day, month, dayOfTheWeek, year} = props
    const [time, setTime] = useState({})
    const dispatch = useDispatch()


    useEffect(() => {
        if(time.start && time.end){
            const overtime = count(time.start, time.end)
            dispatch(addNewDay(
                {
                    overtime: overtime,
                    date: time.date
                }
            ))
        }
    },[time])

    const convertMillisecondsToMinutes = (milliseconds) => {
        return Math.floor(milliseconds/60000)
    }

    const convertOvertimeToShownString = (minutes) => {
        console.log('minutes', minutes)
        if(minutes >= 60) {
            return `${Math.trunc(minutes / 60)} hours ${minutes % 60} minutes`
        }else if(minutes < 0){
            if(minutes <= -60){
                console.log('minus minutes', minutes)
                return `${Math.trunc(minutes / 60)} hours ${minutes % 60} minutes`
            }else{
                return`- 0 hours ${minutes % 60} minutes`
            }
        }else{
            return `- 0 hours ${minutes % 60} minutes`
        }
    }

    const convertStringToTime = (string) => {
        try{
            const [hours, minutes] = string.split(":")
            return setTimeObject(hours, minutes)

        }catch (error){
            console.error("An error occurred: ", string)
        }
    }

    const count = (startTimeString, endTimeString) => {
        const startTime = convertStringToTime(startTimeString)
        const endTime = convertStringToTime(endTimeString)
        const differenceInMinutes = convertMillisecondsToMinutes(endTime - startTime)
        let timeWithoutPause = subtract_pause(differenceInMinutes)
        if(isWeekend()){
            setFinishOvertime(convertOvertimeToShownString(timeWithoutPause))
        }else{
            timeWithoutPause = subtractEightHours(timeWithoutPause)
            setFinishOvertime(convertOvertimeToShownString(timeWithoutPause))
        }
        return timeWithoutPause
    }

    const handleInput = (event) => {
        const date = `${day}.${month}.${year}`
        const eventTime = event.target.value

        if(event.target.name.includes('start')){
            setTime({
                date: date,
                start: eventTime
            })
        }else{
            setTime((prevState) => ({
                ...prevState,
                    end: eventTime
                    }))
        }
    }

    const isWeekend = () => {
        let checkWeekend = new Date(year, month, day).getDay()
        return checkWeekend === 0 || checkWeekend === 6;
    }

    const setTimeObject = (hours, minutes) => {
        return new Date(`July 1, 1999, ${hours}:${minutes}:00`)
    }

    const subtractEightHours = (workingTimeInMinutes) => {
        const eightHours = 480
        return workingTimeInMinutes - eightHours
    }

    const subtract_pause = (differenceInMinutes) => {
        const twelveHours = {"minutes": 720, "pause": 15}
        const nineHours = {"minutes": 540, "pause": 15}
        const sixHours = {"minutes": 360, "pause" : 30}

        if(differenceInMinutes >= sixHours.minutes){
            differenceInMinutes = differenceInMinutes - sixHours.pause
        }
        if(differenceInMinutes >= nineHours.minutes){
            differenceInMinutes = differenceInMinutes - nineHours.pause
        }
        if(differenceInMinutes >= twelveHours.minutes){
            differenceInMinutes = differenceInMinutes - twelveHours.pause
        }
        return differenceInMinutes
    }


    return(
        <Grid item xs={2}>
            <Grid direction="column" container>
                <Grid item xs={2}>
                    {day}.{month+1} {dayOfTheWeek}
                </Grid>

                <Grid item xs={8}>
                    <Form onSubmit={count}>
                        <label>
                            Start
                            <Input
                                type="time"
                                name={`start_day${day}`}
                                onBlur={handleInput}
                            />
                        </label>

                        <label>
                            End
                            <Input
                                type="time"
                                name={`end_day${day}`}
                                onBlur={handleInput}
                            />
                        </label>
                    </Form>
                </Grid>

                <Grid item xs={2} color={"red"}>
                    {finishOvertime}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default OneDay
