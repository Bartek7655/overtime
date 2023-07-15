import React from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {required, email} from "../../validators/validators.jsx";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";

import {signIn} from "../../redux/slices/profileSlice";



const SignIn = () => {
    const dispatch = useDispatch();

    const signin = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        dispatch(signIn(data)).unwrap()
            .then(() => window.location.replace('/')
            );
    };

    return (
        <Form onSubmit={signin}>
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
    );
};

export default SignIn;
