export const formatDate = (date: Date) => {
    const newData = date.toISOString();
    return newData.split("T")[0];
};

export const formatPhone = (phone: number) => {
    const phoneString = phone.toString();
    phoneString.slice(0, 3);
    return `(${phoneString.slice(0, 3)}) ${phoneString.slice(
        3,
        6
    )}-${phoneString.slice(6, 10)}`;
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
    if (hour === 0 || hour === 24) {
        newHour = "12 AM";
    } else if (hour <= 12) {
        newHour = hour + " AM";
    } else {
        newHour = (hour % 12) + " PM";
    }
    return newHour;
};
