"use server";

import { IBooking, IPatient } from "../types/types";

export const createBooking = async (data2: Omit<IBooking, "booking_id">) => {
    const result = await fetch("https://www.hunterkf.com/api/booking", {
        method: "post",
        body: JSON.stringify(data2),
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    const data = await result.json();
    return data;
};

export const createPatient = async (data2: Omit<IPatient, "patient_id">) => {
    const result = await fetch("https://www.hunterkf.com/api/booking/patient", {
        method: "post",
        body: JSON.stringify(data2),
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    const data = await result.json();
    return data;
};
