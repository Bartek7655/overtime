import { configureStore } from '@reduxjs/toolkit';
import {notSavedOvertimeReducer} from "./slices/overtime/notSavedOvertimeSlice";
import {getOvertimeReducer} from "./slices/overtime/getOvertime";

export default configureStore({
    reducer: {
        notSavedOvertime: notSavedOvertimeReducer,
        getOvertime: getOvertimeReducer
    },
});
