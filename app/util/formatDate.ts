export const formatDate = (date: any) => {
    const newData = date.toISOString();
    return newData.split("T")[0];
};

export const formatDate2 = (date: Date) => {
    const longMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "Decemeber",
    ];

    const longDate = date.toISOString().split("T")[0];
    const day = longDate.split("-")[2];
    const month = longMonths[parseInt(longDate.split("-")[1]) - 1];
    const year = longDate.split("-")[0];
    const returnDate = `${day}-${month}-${year}`;
    return returnDate;
};

export const convert24to12 = (hour: number) => {
    let newHour;
    if (hour <= 12) {
        newHour = hour + " AM";
    } else {
        newHour = (hour % 12) + " PM";
    }
    return newHour;
};
