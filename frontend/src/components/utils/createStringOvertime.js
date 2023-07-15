export const convertOvertimeToShownString = (minutes) => {
    if(minutes >= 60) {
        return `${Math.trunc(minutes / 60)} hours ${minutes % 60} minutes`;
    }else if(minutes < 0){
        if(minutes <= -60){
            return `${Math.trunc(minutes / 60)} hours ${minutes % 60} minutes`;
        }else{
            return`- 0 hours ${minutes % 60} minutes`;
        }
    }else{
        return `0 hours ${minutes % 60} minutes`;
    }
};