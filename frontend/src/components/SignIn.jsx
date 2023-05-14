import React from "react"

import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import {required, email} from "../validators/validators.jsx";
import {Button} from "@mui/material";

import axiosInstance from "../axios/axios";


const SignIn = () => {
    const login = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        axiosInstance.post(
            "account/signin/", data
        ).then((response)=> {
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            window.location.replace('/');
        })

    }

    return (
        <Form onSubmit={login}>
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

            <Button type="submit" variant="contained" >Login</Button>
        </Form>
    )
}

export default SignIn
