"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "../util/formatDate";
import { action } from "../util/reducer";
import convertedDate from "../util/convertedDate";

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

type props = {
    dispatch: React.Dispatch<action>;
};

export default function CalendarC(props: props) {
    const [date, setDate] = useState<Value>(convertedDate);

    // blackout dates before today and blackout days 60 days in advance
    // const dates = ["2023-07-28T04:00:00.000Z"];
    // const blackOutDates = dates.map((item) => +new Date(item));

    const today = new Date();
    const today40 = new Date(+today + 86_000_000 * 40);

    const handleDispatch = (date: Date) => {
        props.dispatch({
            type: "text-change",
            payload: {
                key: "booking_date",
                value: date,
            },
        });
        // reset the booking time
        props.dispatch({
            type: "text-change",
            payload: {
                key: "booking_time",
                value: 0,
            },
        });
        props.dispatch({
            type: "show-calendar-availability",
            payload: true,
        });
        props.dispatch({
            type: "show-patient-form",
            payload: false,
        });
    };

    return (
        <Calendar
            // add this for aria label server is US and my client is UK
            formatLongDate={(locale, date) => formatDate(date)}
            value={date}
            onChange={setDate}
            minDate={today}
            maxDate={today40}
            tileDisabled={({ date }) => date.getDay() === 0}
            onClickDay={(date) => handleDispatch(date)}
        />
    );
}
