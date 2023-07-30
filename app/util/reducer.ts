import { IBooking } from "../types/types";

type keyAction = {
    type: "text-change";
    payload: {
        key: string;
        value: string | number | Date;
    };
};

type showCalendar = {
    type: "show-calendar";
};

type showPatientForm = {
    type: "show-patient-form";
    payload: boolean;
};

export type action = keyAction | showCalendar | showPatientForm;

interface IBookingState extends Omit<IBooking, "booking_id"> {
    showCalendar: boolean;
    showPatientForm: boolean;
}

export const bookingReducer = (state: IBookingState, action: action) => {
    switch (action.type) {
        case "text-change":
            return { ...state, [action.payload.key]: action.payload.value };
        case "show-calendar":
            return { ...state, showCalendar: true };
        case "show-patient-form":
            return { ...state, showPatientForm: action.payload };
        default:
            throw new Error("fail");
    }
};
