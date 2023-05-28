import {createSlice} from '@reduxjs/toolkit'


const notSavedOvertimeSlice = createSlice({
    name: "notSavedOvertime",
    initialState: [],
    reducers: {
        addNewDay: (state, action) => {
            state = [...state, action.payload]
            console.log('state', state)
            // console.log('action', action)
            // console.log('payload', action.payload)
            // console.log('state', state.test)
            // const newDay = action.payload
            // state = [...state, action.payload]
            // console.log('newDay', newDay)
            // console.log('state', state)
        },
    },
})

export const {addNewDay} = notSavedOvertimeSlice.actions
export const notSavedOvertimeReducer = notSavedOvertimeSlice.reducer
