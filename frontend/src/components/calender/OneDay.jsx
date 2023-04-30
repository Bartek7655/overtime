import React from "react"
import {Button, Grid} from "@mui/material";
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"

const OneDay = (props) => {
    const {day, month, dayOfTheWeek} = props

    const count = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        const start_time = data.get(`start_day${day}`)
        const end_time = data.get(`end_day${day}`)
        // const difference =
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
