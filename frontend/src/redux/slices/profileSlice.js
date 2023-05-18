import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";

import {setToken, deleteToken} from "../../components/utils/handleToken";

export const signIn = createAsyncThunk(
    'profile/signIn',
    async (data, {rejectedWithValue}) => {
        try{
            const response = await axiosInstance.post(
                "account/signin/", data
            )
            setToken(response.data)
            return response.data;
        } catch (error) {
            console.log('Signin problem: ', error.message);
            return rejectedWithValue(error.response.data);
        }
    }
)

export const signOut = createAsyncThunk(
    'profile/signOut',
    async (data, {rejectedWithValue}) => {
        try{
            const response = await axiosInstance.post(
                "account/signout/", data
            )
            deleteToken()
            return response.data
        } catch (error) {
            console.log("Sign Out problem: ", error.message);
            return rejectedWithValue(error.response.data)
        }
    }
)
