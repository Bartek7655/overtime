export const getCurrentDate = () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {month: month, year: year};
};
