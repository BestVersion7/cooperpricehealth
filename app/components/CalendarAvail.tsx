"use client";
import { useEffect, useState } from "react";
import { IBooking } from "../types/types";
import { action } from "../util/reducer";
import { formatDate2, convert24to12 } from "../util/formatDate";
import Button from "react-bootstrap/esm/Button";

type props = {
    doctor_id: number;
    booking_date: Date;
    booking_time: number;
    dispatch: React.Dispatch<action>;
};

type TimeSlots = {
    booking_time: number;
    taken: boolean;
};
export default function CalendarAvail(props: props) {
    const ISODate = props.booking_date.toISOString();

    const availability: number[] = [
        8, 9, 10, 11, 14, 15, 16, 17, 18, 20, 21, 22,
    ];
    const [timeSlots, setTimesSlots] = useState<TimeSlots[]>([]);

    // get the time availability
    const getAvailability = async (signal: AbortSignal) => {
        const results = await fetch(
            `api/booking?booking_date=${ISODate}&doctor_id=${props.doctor_id}`,
            { signal }
        );
        const data = await results.json();

        let takenSlots: number[] = [];

        if (data.length < 1) {
            takenSlots = [];
        } else {
            // setTimeSlot
            takenSlots = data.map(
                (item: Pick<IBooking, "booking_time">) => item.booking_time
            );
        }

        const mappedAvail = availability.map((item) => {
            // compare the hours for today
            if (
                new Date(ISODate).toLocaleDateString() ==
                new Date().toLocaleDateString()
            ) {
                const compareHour = new Date().getHours() > item;
                return {
                    booking_time: item,
                    taken: takenSlots.includes(Number(item)) || compareHour,
                };
            } else {
                return {
                    booking_time: item,
                    taken: takenSlots.includes(Number(item)),
                };
            }
        });
        setTimesSlots(mappedAvail);
        return data;
    };
    useEffect(() => {
        const controller = new AbortController();
        getAvailability(controller.signal);
        return () => {
            controller.abort();
        };
    }, [props.booking_date, props.doctor_id]);

    // handle ths colour change of button
    useEffect(() => {
        const btn = document.getElementById(
            `booking_time-${props.booking_time}`
        );
        if (btn === null) {
            return;
        } else {
            btn.style.backgroundColor = "lightgreen";
        }
        return () => {
            btn.style.backgroundColor = "inherit";
        };
    }, [props.booking_time]);

    const handleDispatch = (booking_time: number) => {
        props.dispatch({
            type: "text-change",
            payload: {
                key: "booking_time",
                value: booking_time,
            },
        });
        props.dispatch({ type: "show-patient-form", payload: true });
    };

    // remove sunday
    if (props.booking_date.getDay() === 0) {
        return (
            <div>
                <p>Availability for {formatDate2(props.booking_date)} </p>No
                Availability
            </div>
        );
    }
    return (
        <div>
            <p>Availability for {formatDate2(props.booking_date)} </p>
            {timeSlots.map((item, index: number) => (
                <button
                    // variant="outline-info"
                    disabled={item.taken}
                    key={index}
                    onClick={() => handleDispatch(item.booking_time)}
                    id={`booking_time-${item.booking_time}`}
                >
                    {convert24to12(item.booking_time)}
                </button>
            ))}
        </div>
    );
}
