export const countWorkingDaysOfMonth = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month+1, 0);
    let workingDays = 0;

    while(firstDayOfMonth <= lastDayOfMonth){
        if(firstDayOfMonth.getDay() !== 0 && firstDayOfMonth.getDay() !== 6){
            workingDays += 1;
        }
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() +1);
    }
    return workingDays;
};
