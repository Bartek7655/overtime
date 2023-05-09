import React from "react"
import {Button, Grid} from "@mui/material";
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"

const OneDay = (props) => {
    const {day, month, dayOfTheWeek} = props

    const convertStringToTime = (string) => {
        try{
            const [hours, minutes] = string.split(":")
            const time = set_time_object(hours, minutes)
            return time

        }catch (error){
            console.error("An error occured: ", string)
        }
    }

    const count = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        const {start_time, end_time} = get_times(data)
        const difference_in_minutes = convert_milliseconds_to_minutes(end_time - start_time)
        const time_without_pause = subtract_pause(difference_in_minutes)
        console.log(time_without_pause)
    }

    const get_times = (data) => {
        let start_time = data.get(`start_day${day}`)
        let end_time = data.get(`end_day${day}`)
        start_time = convertStringToTime(start_time)
        end_time = convertStringToTime(end_time)
        return {start_time, end_time}
    }

    const set_time_object = (hours, minutes) => {
        const time_object = new Date(`July 1, 1999, ${hours}:${minutes}:00`)
        return time_object
    }

    const subtract_pause = (difference_in_minutes) => {
        // TODO Assign pauses to hours and subtract it.
        // const {twelve_hours, pause_twelve} = 720
        const nine_hours = 540
        const six_hours = 360
        // if(difference_in_minutes > twelve_hours){
        //
        // }
    }

    const convert_milliseconds_to_minutes = (milliseconds) => {
        return Math.floor(milliseconds/60000)
    }



    return(
        <Grid item>
            {day}.{month+1} {dayOfTheWeek}
            <Form onSubmit={count}>
                <label>
                    Start
                    <Input
                        type="time"
                        name={`start_day${day}`}
                    />
                </label>

                <label>
                    End
                    <Input
                        type="time"
                        name={`end_day${day}`}
                    />
                </label>

                <Button type="submit" variant="contained">Count</Button>
            </Form>
        </Grid>
    )
}

export default OneDay
