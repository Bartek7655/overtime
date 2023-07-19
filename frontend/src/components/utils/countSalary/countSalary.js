export const countSalary = (workingDays, overtime, hourlyRate) => {
    const workingHours = (workingDays * 8) + (overtime / 60);
    return Math.floor(workingHours * hourlyRate * 0.695);
};
