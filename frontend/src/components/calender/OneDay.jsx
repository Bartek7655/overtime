import React, {useEffect, useState} from "react"
import {Button, Grid} from "@mui/material";
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import {useDispatch} from "react-redux";
import {addNewDay} from "../../redux/slices/countOvertimeSlice";

const OneDay = (props) => {
    const [finishOvertime, setFinishOvertime] = useState(0)
    const {day, month, dayOfTheWeek, year} = props
    const [time, setTime] = useState({})
    const dispatch = useDispatch()


    useEffect(() => {
        if(time.start && time.end){
            const overtime = count(time.start, time.end)
            console.log("overtime", overtime)
            dispatch(addNewDay(
                {
                    overtime: overtime,
                    date: time.date
                }
            ))
        }
    },[time])

    const convert_milliseconds_to_minutes = (milliseconds) => {
        return Math.floor(milliseconds/60000)
    }

    const convertStringToTime = (string) => {
        try{
            const [hours, minutes] = string.split(":")
            return set_time_object(hours, minutes)

        }catch (error){
            console.error("An error occurred: ", string)
        }
    }

    const count = (start_time_string, end_time_string) => {
        const start_time = convertStringToTime(start_time_string)
        const end_time = convertStringToTime(end_time_string)
        const difference_in_minutes = convert_milliseconds_to_minutes(end_time - start_time)
        const time_without_pause = subtract_pause(difference_in_minutes)

        if(is_weekend()){
            setFinishOvertime(time_without_pause)
        }else{
            setFinishOvertime(subtract_eight_hours(time_without_pause))
        }
        return finishOvertime
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

    const is_weekend = () => {
        let check_weekend = new Date(year, month-1, day).getDay()
        return check_weekend === 0 || check_weekend === 6;
    }

    const set_time_object = (hours, minutes) => {
        return new Date(`July 1, 1999, ${hours}:${minutes}:00`)
    }

    const subtract_eight_hours = (working_time_in_minutes) => {
        return working_time_in_minutes - 480
    }

    const subtract_pause = (difference_in_minutes) => {
        const twelve_hours = {"minutes": 720, "pause": 15}
        const nine_hours = {"minutes": 540, "pause": 15}
        const six_hours = {"minutes": 360, "pause" : 30}

        if(difference_in_minutes >= six_hours.minutes){
            difference_in_minutes = difference_in_minutes - six_hours.pause
        }
        if(difference_in_minutes >= nine_hours.minutes){
            difference_in_minutes = difference_in_minutes - nine_hours.pause
        }
        if(difference_in_minutes >= twelve_hours.minutes){
            difference_in_minutes = difference_in_minutes - twelve_hours.pause
        }
        return difference_in_minutes
    }


    return(
        <Grid item xs={2}>
            <Grid direction="column" container>
                <Grid item xs={2}>
                    {day}.{month} {dayOfTheWeek}
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

                        {/*<Button type="submit" variant="contained" style={{ textTransform: "none"}}>*/}
                        {/*    Save & Count*/}
                        {/*</Button>*/}
                    </Form>
                </Grid>

                <Grid item xs={2}>
                    {finishOvertime} minutes
                </Grid>
            </Grid>
        </Grid>
    )
}

export default OneDay
