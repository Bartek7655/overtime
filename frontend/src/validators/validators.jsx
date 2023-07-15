import React from "react";
import validator from "validator/es";
import {Alert} from "@mui/material";

export const required = (value) => {
    if (!value.toString().trim().length){
        return <Alert severity="warning">This Field is required</Alert>;
    }
};

export const email = (value) => {
    if(!validator.isEmail(value)){
        return <Alert severity="warning">{value} is not a valid email.</Alert>;
    }
};

export const password_same = (value, props, components) => {
    if(value !== components['password'][0].value){
        return <Alert severity="warning">Passwords must be the same</Alert>;
    }
};
