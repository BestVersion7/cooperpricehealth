"use client";
import { useState, useEffect } from "react";
import { IBooking, IDoctor, IPatient } from "@/app/types/types";
import { convert24to12, formatDate2 } from "@/app/util/formatDate";
import Button from "react-bootstrap/Button";

const fetchBookingInfo = async (booking_id: number) => {
    const result = await fetch(`/api/booking?booking_id=${booking_id}`, {
        cache: "force-cache",
    });
    const data = await result.json();
    return data;
};

interface IBookingInfo extends IBooking {
    doctor: IDoctor;
    patient: IPatient;
}

const Details = (props: IBookingInfo) => {
    return (
        <>
            <li>Booking date: {formatDate2(new Date(props.booking_date))}</li>
            <li>Booking time: {convert24to12(props.booking_time)}</li>
            <li>
                Doctor Name: {props.doctor.doctor_first_name}{" "}
                {props.doctor.doctor_last_name}
            </li>
            <li>
                Patient Name: {props.patient.patient_first_name}{" "}
                {props.patient.patient_last_name}
            </li>
        </>
    );
};

export default function Success({ params }: { params: { uuid: number } }) {
    const [bookingInfo, setBookingInfo] = useState<IBookingInfo[]>([]);

    useEffect(() => {
        async function hello() {
            const bookingData = await fetchBookingInfo(params.uuid);
            setBookingInfo(bookingData);
        }
        hello();
    }, []);

    return (
        <main className="main-booking">
            <h3>Booking Successful:</h3>
            <p>
                Your appointment is booked! An email confirmation has been sent
                to your email. You can print this page for your records.
            </p>
            <h3>Details:</h3>
            <ul>
                {bookingInfo.map((item, index) => (
                    <Details key={index} {...item} />
                ))}
            </ul>
            <br />
            <Button>Print </Button> <br /> <br />
        </main>
    );
}
