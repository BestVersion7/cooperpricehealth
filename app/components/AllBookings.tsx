"use client";

import { useEffect, useState } from "react";
import { IBooking, IPatient, IDoctor } from "../types/types";
import { convert24to12, formatDate } from "../util/formatDate";

interface BookingDetails extends IBooking {
    doctor: IDoctor;
    patient: IPatient;
}

export default () => {
    const [allBookings, setAllBookings] = useState<BookingDetails[]>([]);

    const getAllBookings = async (signal: AbortSignal) => {
        const result = await fetch("/api/booking", { signal });
        const data = await result.json();
        setAllBookings(data);
    };
    useEffect(() => {
        const controller = new AbortController();
        getAllBookings(controller.signal);
        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div>
            <h2>All Bookings: </h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doctor Name</th>
                        <th>Patient Name</th>
                    </tr>
                </thead>
                <tbody>
                    {allBookings?.map((item) => (
                        <tr key={item.booking_id}>
                            <td>
                                {item.booking_date.toString().split("T")[0]}
                            </td>
                            <td>{convert24to12(item.booking_time)}</td>
                            <td>
                                {item.doctor.doctor_first_name}{" "}
                                {item.doctor.doctor_last_name}
                            </td>
                            <td>
                                {item.patient.patient_first_name}{" "}
                                {item.patient.patient_last_name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
