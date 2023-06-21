import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axios";

export const getOvertime = createAsyncThunk(
    "overtime/get",
    async(data) => {
        try{
            const response = await axiosInstance.get(`api/get-overtime/${data.test}/${data.year}/`)
            return response.data
        } catch (error) {
            console.log("Getting overtime error: ", error.message)
            throw error
        }
    }
)


const getOvertimeSlice = createSlice({
    name: "getOvertime",
    initialState: {
        loading: true,
        entities: null,
        error: null
    },
    reducers: {},
    extraReducers: {
        [getOvertime.pending]: (state) => {
            state.loading = true
        },
        [getOvertime.fulfilled]: (state, action) => {
            state.loading = false
            state.entities = action.payload
        },
        [getOvertime.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const getOvertimeReducer = getOvertimeSlice.reducer