// new date is utc so gmt is +4 and remove Sundays

const today = new Date();

const convertDateToGMT = (date: Date) => {
    return `${new Date(date.toISOString().replace("Z", "+04:00"))
        .toISOString()
        .slice(0, 11)}04:00:00.000Z`;
};

let convertedDate = new Date(convertDateToGMT(today));

// const dateto4 = new Date(
//     `${new Date(today.toISOString().replace("Z", "+04:00"))
//         .toISOString()
//         .slice(0, 11)}04:00:00.000Z`
// );

// console.log(new Date(convertedDate.setDate(today.getDate() + 1)));

// check sundays
// if(dateto4.getDay() === 0) {
//     currentDate =
// }

export default convertedDate;
