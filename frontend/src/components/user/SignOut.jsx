import React, {useEffect} from "react";

import {signOut} from "../../redux/slices/profileSlice";
import {useDispatch} from "react-redux";

const SignOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(signOut()).unwrap()
            .then(() => window.location.replace('/')
            );
    },[]);

    return (
        <>
            Sign out in process...
        </>
    );
};

export default SignOut;
