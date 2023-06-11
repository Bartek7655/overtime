import {createSlice} from '@reduxjs/toolkit'


const notSavedOvertimeSlice = createSlice({
    name: "notSavedOvertime",
    initialState: [],
    reducers: {
        addNewDay: (state, action) => {
            let changed
            state.forEach(element => {
                if(element.date === action.payload.date){
                    element.overtime = action.payload.overtime
                    changed = true
                }
            })
            if(!changed){
                state.push(action.payload)
            }
        },
    },
})

export const {addNewDay} = notSavedOvertimeSlice.actions
export const notSavedOvertimeReducer = notSavedOvertimeSlice.reducer
