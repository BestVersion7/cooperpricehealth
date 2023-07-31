"use client";

import { useEffect, useReducer, useState } from "react";
import { IBooking, IPatient, IDoctor } from "../types/types";
import { convert24to12 } from "../util/formatDate";
import Button from 'react-bootstrap/Button'

interface BookingMap extends IBooking {
    doctor: IDoctor;
    patient: IPatient;
}

interface BookingDetails {
    total: number;
    currentPage: number;
    data: BookingMap[];
}

const url = "https://www.hunterkf.com/api/booking";

type initialFetchBookings = {
    type: "fetch booking";
    payload: BookingMap[];
};
type fetchNextPage = {
    type: "fetch next page";
    payload: BookingMap[];
};
type initialFetchTotal = {
    type: "fetch total";
    payload: number;
};

type action = initialFetchBookings | initialFetchTotal | fetchNextPage;

const dashBoardReducer = (state: BookingDetails, action: action) => {
    switch (action.type) {
        case "fetch booking":
            return { ...state, data: action.payload };
        case "fetch total":
            return { ...state, total: action.payload };
        case "fetch next page":
            const newArr = [...state.data, ...action.payload];
            return {
                ...state,
                currentPage: state.currentPage + 1,
                data: newArr,
            };
        default:
            throw new Error("no method");
    }
};

export default () => {
    const initialState = {
        total: 0,
        currentPage: 1,
        data: [],
    };

    const [state, dispatch] = useReducer(dashBoardReducer, initialState);
    const [doctors, setDoctors] = useState<IDoctor[]>([]);

    const getDoctors = async (signal: AbortSignal) => {
        const result = await fetch(`${url}/doctor`, { signal });
        const data = await result.json();
        setDoctors(data);
    };

    const getAllBookings = async (signal: AbortSignal) => {
        const result = await fetch(`${url}/pagination?page=1`, { signal });
        const data = await result.json();

        dispatch({ type: "fetch booking", payload: data });
    };

    const getTotalCount = async (signal: AbortSignal) => {
        const result = await fetch(`${url}/count`, { signal });
        const count = await result.json();
        dispatch({ type: "fetch total", payload: count._count });
    };

    useEffect(() => {
        const controller = new AbortController();
        getDoctors(controller.signal);
        getAllBookings(controller.signal);
        getTotalCount(controller.signal);
        return () => {
            controller.abort();
        };
    }, []);

    // const handleLoadMore = async (page: number) => {
    //     const result = await fetch(`${url}/pagination?page=${page}`);
    //     const data = await result.json();
    //     dispatch({ type: "fetch next page", payload: data });
    // };

    const handleChangeDoctor = async (doctor_id: number, page: number) => {
        const result = await fetch(
            `${url}/pagination?doctor_id=${doctor_id}&page=${page}`
        );
        const data = await result.json();

        const countResult = await fetch(`${url}/count?doctor_id=${doctor_id}`);
        const countTotal = await countResult.json();

        dispatch({ type: "fetch booking", payload: data });
        dispatch({ type: "fetch total", payload: countTotal._count });
    };

    return (
        <div>
            <h2>All Bookings: </h2>
            <p>
                Total count: {state.total <= 20 ? state.total : 20} of{" "}
                {state.total}
            </p>
            <h2>Filter</h2>
            Doctor Name:
            {doctors.map((item) => (
                <Button
                    key={item.doctor_id}
                    onClick={() =>
                        handleChangeDoctor(item.doctor_id, state.currentPage)
                    }
                >
                    {item.doctor_first_name} {item.doctor_last_name}
                </Button>
            ))}
            {/* <button onClick={() => handleLoadMore(state.currentPage + 1)}>
                Load more
            </button> */}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doctor Name</th>
                        <th>Patient Name</th>
                    </tr>
                </thead>
                <tbody>
                    {state.data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
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
