"use client";

import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import { IDoctor } from "../types/types";
import { bookingReducer } from "../util/reducer";
import PatientForm from "./PatientForm";
import Calendar from "./Calendar";
import CalendarAvail from "./CalendarAvail";

const formatPhone = (phone: number) => {
    const phoneString = phone.toString();
    phoneString.slice(0, 3);
    return `(${phoneString.slice(0, 3)}) ${phoneString.slice(
        3,
        6
    )}-${phoneString.slice(6, 10)}`;
};

type props = {
    showDesc?: boolean;
};

export default (props: props) => {
    const initialState = {
        doctor_id: 0,
        patient_id: 1,
        booking_date: new Date(
            `${new Date().toISOString().slice(0, 11)}04:00:00.000Z`
        ),
        booking_time: 0,
        showCalendar: false,
        showPatientForm: false,
    };

    const [therapists, setTherapists] = useState<IDoctor[]>([]);
    const [state, dispatch] = useReducer(bookingReducer, initialState);

    const fetchTherapists = async (signal: AbortSignal) => {
        const result = await fetch(
            "https://www.hunterkf.com/api/booking/doctor",
            { signal }
        );
        const data = await result.json();
        setTherapists(data);
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchTherapists(controller.signal);
        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        // set the highlighted colour of chosen doctor
        const doctorElement = document.getElementById(
            `team-container-booking-item-id-${state.doctor_id}`
        );
        if (doctorElement === null) {
            return;
        } else {
            doctorElement.style.backgroundColor = "orange";
        }
        return () => {
            doctorElement.style.backgroundColor = "inherit";
        };
    }, [state.doctor_id]);

    const handleChangeDoctor = (doctor_id: number) => {
        dispatch({
            type: "text-change",
            payload: {
                key: "doctor_id",
                value: doctor_id,
            },
        });
        dispatch({ type: "show-calendar" });
        dispatch({ type: "show-patient-form", payload: false });
    };

    return (
        <>
            {/* page 1 */}
            <p>Step 1: Select a provider to book an appointment.</p>

            <div className="team-container-booking">
                {therapists.map((item) => (
                    <div
                        key={item.doctor_id}
                        className="team-container-booking-item"
                        id={`team-container-booking-item-id-${item.doctor_id}`}
                        onClick={() => handleChangeDoctor(item.doctor_id)}
                    >
                        <div className="team-container-booking-image">
                            <Image
                                className="img-team-container"
                                width={320}
                                height={200}
                                // quality={100}
                                src={item.doctor_image}
                                alt="doctor"
                            />
                            <div className="sam">
                                <p>
                                    Name: {item.doctor_first_name}{" "}
                                    {item.doctor_last_name}
                                </p>
                                <p>Phone: {formatPhone(item.doctor_phone)}</p>
                                <p>Email: {item.doctor_email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* page 2 */}
            {state.showCalendar && (
                <>
                    <p>Step 2: Select a time on calendar.</p>
                    <div className="calendar-wrapper">
                        <Calendar dispatch={dispatch} />
                        <CalendarAvail {...state} dispatch={dispatch} />
                    </div>{" "}
                    <br />
                    <br />
                </>
            )}

            {/* page 3 */}
            {state.showPatientForm && (
                <>
                    <p>Step 3: Fill in your name and email.</p>
                    <PatientForm {...state} /> <br />
                    <br />
                </>
            )}
        </>
    );
};
