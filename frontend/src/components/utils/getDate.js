export const getCurrentYearAndMonth = () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {year: year, month: month};
};

export const getFullMonthName = (month) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month];
};
