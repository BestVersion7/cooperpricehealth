"use client";
import { IBooking } from "../types/types";
import { createBooking, createPatient } from "../util/apiRequest";
import { useEffect, useState, useReducer } from "react";
import { patientFormReducer } from "../util/reducer";
// import { formatPhone } from "../util/formatDate";
import Button from "react-bootstrap/Button";

export default (props: Omit<IBooking, "booking_id">) => {
    const initialState = {
        patient_id: props.patient_id,
        patient_first_name: "",
        patient_last_name: "",
        patient_email: "",
        patient_phone: 0,
    };

    const [disableBtn, setDisableBtn] = useState<boolean>(true);
    const [changeUser, setChangeUser] = useState<boolean>(false);

    // this is only patient form
    const [state, dispatch] = useReducer(patientFormReducer, initialState);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let patient_id;
        // create a new user if new user

        if (!disableBtn) {
            const data = await createPatient({
                patient_first_name: state.patient_first_name,
                patient_last_name: state.patient_last_name,
                patient_email: state.patient_email,
                patient_phone: state.patient_phone,
            });
            patient_id = data;
        } else {
            patient_id = props.patient_id;
        }
        const data = await createBooking({
            booking_date: props.booking_date,
            booking_time: props.booking_time,
            patient_id: patient_id,
            doctor_id: props.doctor_id,
        });
        console.log(data);
    };

    const getPatient = async (signal: AbortSignal) => {
        const result = await fetch(
            `/api/patient?patient_id=${props.patient_id}`,
            {
                cache: "force-cache",
                signal,
            }
        );
        const data = await result.json();
        dispatch({ type: "initial-fetch", payload: data });
    };

    useEffect(() => {
        const controller = new AbortController();
        getPatient(controller.signal);
        return () => {
            controller.abort();
        };
    }, [changeUser]);

    const handleChangeDefaultUser = async () => {
        setDisableBtn(true);
        setChangeUser((v) => !v);
    };

    const handleChangeUser = () => {
        setDisableBtn(false);
        dispatch({ type: "initial-fetch", payload: initialState });
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "text-change",
            payload: { key: e.target.name, value: e.target.value },
        });
    };

    return (
        <>
            <Button onClick={handleChangeDefaultUser}>Default User</Button>{" "}
            <Button onClick={handleChangeUser}>New User</Button>
            <form onSubmit={handleSubmit} className="patient-form">
                <label>First Name:</label>
                <input
                    disabled={disableBtn}
                    type="text"
                    name="patient_first_name"
                    value={state.patient_first_name}
                    onChange={handleTextChange}
                    required
                />{" "}
                <label>Last Name:</label>
                <input
                    disabled={disableBtn}
                    type="text"
                    name="patient_last_name"
                    value={state.patient_last_name}
                    onChange={handleTextChange}
                    required
                />{" "}
                <label>Phone:</label>
                <input
                    disabled={disableBtn}
                    type="number"
                    name="patient_phone"
                    value={state.patient_phone}
                    onChange={handleTextChange}
                />{" "}
                <label>Email:</label>
                <input
                    disabled={disableBtn}
                    type="text"
                    name="patient_email"
                    value={state.patient_email}
                    onChange={handleTextChange}
                    required
                />{" "}
                <Button type="submit">Submit</Button>
            </form>
        </>
    );
};
