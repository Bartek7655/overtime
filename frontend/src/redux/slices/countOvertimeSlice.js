import {createSlice} from '@reduxjs/toolkit'


const notSavedOvertimeSlice = createSlice({
    name: "notSavedOvertime",
    initialState: [],
    reducers: {
        addNewDay: (state, action) => {
            state.push(action.payload)
        },
    },
})

export const {addNewDay} = notSavedOvertimeSlice.actions
export const notSavedOvertimeReducer = notSavedOvertimeSlice.reducer
