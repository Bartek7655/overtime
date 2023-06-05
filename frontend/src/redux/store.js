import { configureStore } from '@reduxjs/toolkit'
import {notSavedOvertimeReducer} from "./slices/countOvertimeSlice";

export default configureStore({
    reducer: {
        notSavedOvertime: notSavedOvertimeReducer
    },
})
