import React from "react"
import Input from "react-validation/build/input";
import {email, password_same, required} from "../../validators/validators.jsx";
import {Button} from "@mui/material";
import Form from "react-validation/build/form";
import axiosInstance from "../../axios/axios";
import {useNavigate} from "react-router";

const SignUp = () => {
    const navigate = useNavigate()

    const signup = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        axiosInstance.post(
            "account/signup/", data
        )
            .then((response) => {
                if(response.data.email){
                    navigate("/login"), {state: {email:response.data.email}}
                }
            })
            .catch((error)=>console.log('tu', erro, ' tam'))
    }

    return(
        <Form onSubmit={signup}>
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
                Password
                <Input
                    type="password"
                    name="password2"
                    validations={[required, password_same]}
                />
            </label>

            <Button type="submit" variant="contained" >Create Account</Button>
        </Form>
    )
}

export default SignUp