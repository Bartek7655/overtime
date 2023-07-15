import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axios";

export const uploadNotSavedOvertime = createAsyncThunk(
    "overtime/upload",
    async(data) => {
        try{
            const response = await axiosInstance.post('api/type-overtime/', data);
            return response.data;
        } catch (error) {
            console.log("Uploading overtime error: ", error.message);
            throw error;
        }
    }
);


const notSavedOvertimeSlice = createSlice({
    name: "notSavedOvertime",
    initialState: {
        loading: true,
        entities: [],
        error: null
    },
    reducers: {
        addNewDay: (state, action) => {
            let changed;
            state.entities.forEach(element => {
                if(element.date === action.payload.date){
                    element.overtime = action.payload.overtime;
                    element.start_time = action.payload.start_time;
                    element.end_time = action.payload.end_time;
                    changed = true;
                }
            });
            if(!changed){
                state.entities.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadNotSavedOvertime.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadNotSavedOvertime.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(uploadNotSavedOvertime.rejected, (state, action) => {
                state.loading = false;
                state.entities = action.payload;
            });
    }
});

export const {addNewDay} = notSavedOvertimeSlice.actions;
export const notSavedOvertimeReducer = notSavedOvertimeSlice.reducer;
