import { IBooking, IPatient } from "../types/types";

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

type showCalendarAvailability = {
    type: "show-calendar-availability";
    payload: boolean;
};

export type action =
    | keyAction
    | showCalendar
    | showPatientForm
    | showCalendarAvailability;

interface IBookingState extends Omit<IBooking, "booking_id"> {
    showCalendar: boolean;
    showCalendarAvailability: boolean;
    showPatientForm: boolean;
}

export const bookingReducer = (state: IBookingState, action: action) => {
    switch (action.type) {
        case "text-change":
            return { ...state, [action.payload.key]: action.payload.value };
        case "show-calendar":
            return { ...state, showCalendar: true };
        case "show-calendar-availability": {
            return { ...state, showCalendarAvailability: action.payload };
        }
        case "show-patient-form":
            return { ...state, showPatientForm: action.payload };
        default:
            throw new Error("fail");
    }
};

export const patientFormReducer = (
    state: Omit<IPatient, "patient_id">,
    action: keyAction
) => {
    switch (action.type) {
        case "text-change":
            return { ...state, [action.payload.key]: action.payload.value };
        default:
            throw new Error("fail");
    }
};
