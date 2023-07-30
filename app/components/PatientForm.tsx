"use client";
import { IBooking, IPatient } from "../types/types";
import { createBooking } from "../util/apiRequest";
import { useEffect, useState } from "react";

export default (props: Omit<IBooking, "booking_id">) => {
    const [patient, setPatient] = useState<IPatient>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await createBooking({
            booking_date: props.booking_date,
            booking_time: props.booking_time,
            patient_id: props.patient_id,
            doctor_id: props.doctor_id,
        });
        console.log(props.booking_date);
        console.log(data);
    };

    const getPatient = async (signal: AbortSignal) => {
        const result = await fetch(
            `/api/patient?patient_id=${props.patient_id}`,
            { signal }
        );
        const data = await result.json();
        setPatient(data);
    };

    useEffect(() => {
        const controller = new AbortController();
        getPatient(controller.signal);
        return () => {
            controller.abort();
        };
    }, []);

    return (
        <form onSubmit={handleSubmit} className="patient-form">
            <label>First Name:</label>
            <input
                type="text"
                name="patient_first_name"
                defaultValue={patient?.patient_first_name}
            />{" "}
            <label>Last Name:</label>
            <input
                type="text"
                name="patient_last_name"
                defaultValue={patient?.patient_last_name}
            />{" "}
            <label>Phone:</label>
            <input
                type="text"
                name="patient_phone"
                defaultValue={patient?.patient_phone}
            />{" "}
            <label>Email:</label>
            <input
                type="text"
                name="patient_email"
                defaultValue={patient?.patient_email}
            />{" "}
            <button type="submit">Submit</button>
        </form>
    );
};
