import React from "react"

import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import {required, email, password} from "../validators/validators.jsx";
import {Button} from "@mui/material";


const SignIn = () => {
    // const login = (data) => {
    //     console.log(data.email, data.password, data.password2)
    // }

    return (
        <Form onSubmit={()=> login()}>
            <label>
                Email
                <Input
                    name="email"
                    validations={[required, email]}
                />
            </label>

            <label>
                Password
                <Input
                    type="password"
                    name="password"
                    validations={[required]}
                />
            </label>

            <label>
                Repeat Password
                <Input
                    type="password"
                    name="password2"
                    validations={[required, password]}
                />
            </label>
            <Button variant="contained">Login</Button>
        </Form>
    )
}

export default SignIn
