import React, {useEffect, useState} from "react"
import {Button, Checkbox, Grid} from "@mui/material";
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import {useDispatch} from "react-redux";
import {addNewDay} from "../../redux/slices/overtime/notSavedOvertimeSlice";
import {convertOvertimeToShownString} from "../utils/createStringOvertime";

const OneDay = (props) => {
    const [finishOvertime, setFinishOvertime] = useState('')
    const [sickness, setSickness] = useState(false)
    const [holiday, setHoliday] = useState(false)
    const {day, month, year, dayOfTheWeek, currentState} = props
    const [time, setTime] = useState({})
    const [disableDay, setDisableDay] = useState(true)
    const [currentTime, setCurrentTime] = useState({
        start_time: currentState.start_time,
        end_time: currentState.end_time
    })

    useEffect(() => {
        setCurrentTime(currentState)
        if(currentState.overtime || currentState.overtime === 0){
            setFinishOvertime(
                convertOvertimeToShownString(currentState.overtime)
            )
            setSickness(currentState.sickness)
            setHoliday(currentState.holiday)
        }else{
            setFinishOvertime('')
        }
        // check if is weekend and overtime too - to show saturday/sunday

        if(
            !isWeekend() ||
            (isWeekend() && currentState.overtime)
            // holiday ||
            // sickness
        ){
            setDisableDay(false)
        }else{
            setDisableDay(true)
        }

    },[currentState, month, holiday, sickness])


    const dispatch = useDispatch()

    useEffect(() => {
        if(time.start_time && time.end_time){
            const overtime = count(time.start_time, time.end_time)
            dispatch(addNewDay(
                {
                    start_time: time.start_time,
                    end_time: time.end_time,
                    overtime: overtime,
                    holiday: holiday,
                    sickness: sickness,
                    date: time.date
                }
            ))
        }
    },[time])

    const changeCurrentState = (event) => {
        const eventTime = event.target.value

        if(event.target.name.includes('start')){
            setCurrentTime((prevState) => ({
                ...prevState,
                start_time: eventTime
            }))
        }else{
            setCurrentTime((prevState) => ({
                ...prevState,
                end_time: eventTime
            }))
        }

    }

    const convertMillisecondsToMinutes = (milliseconds) => {
        return Math.floor(milliseconds/60000)
    }



    const convertStringToTime = (string) => {
        try{
            const [hours, minutes] = string.split(":")
            return setTimeObject(hours, minutes)

        }catch (error){
            console.error("An error occurred: ", string)
            return null
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
        const date = `${year}-${month+1}-${day}`
        const eventTime = event.target.value
        if(currentState.overtime || currentState.overtime === 0){
            setTime({
                date: date,
                start_time: currentTime.start_time,
                end_time: currentTime.end_time
            })
        } else if(event.target.name.includes('start')){
            setTime({
                date: date,
                start_time: eventTime
            })
        } else{
            setTime((prevState) => ({
                ...prevState,
                    end_time: eventTime
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


      const toggleFormExpand = () => {
        setDisableDay((prevState) => !prevState)
      };

    return(
        <Grid item xs={2}>
            <Grid direction="column" container>
                <Grid item xs={2}>
                    {day}.{month+1} {dayOfTheWeek}
                </Grid>

                <Grid item xs={6}>
                    {!disableDay && (
                    <Form onSubmit={count}>
                        <label>
                            Start
                            <Input
                                type="time"
                                name={`start_day${day}`}
                                onBlur={handleInput}
                                onChange={changeCurrentState}
                                value={currentTime.start_time}
                            />
                        </label>

                        <label>
                            End
                            <Input
                                type="time"
                                name={`end_day${day}`}
                                onBlur={handleInput}
                                onChange={changeCurrentState}
                                value={currentTime.end_time}
                            />
                        </label>
                    </Form>
                    )}
                    {disableDay && (
                        <Button
                            onClick={toggleFormExpand}
                            variant="contained"
                        >
                          {dayOfTheWeek}
                        </Button>
                      )}
                </Grid>

                <Grid item xs={2} color={"red"}>
                    {finishOvertime}
                </Grid>

                <Grid item xs={2}>
                    <Button
                        onClick={() => setSickness(prev => !prev)}
                        variant="contained"
                    >
                        Sickness
                    </Button>
                    <Button
                        onClick={() => setHoliday(prev => !prev)}
                        variant="contained"
                    >
                        Holiday
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default OneDay
