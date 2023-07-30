export interface IDoctor {
    doctor_id: number;
    doctor_first_name: string;
    doctor_last_name: string;
    doctor_email: string;
    doctor_phone: number;
    doctor_description: string;
    doctor_image: string;
}

export interface IPatient {
    patient_id: number;
    patient_first_name: string;
    patient_last_name: string;
    patient_email: string;
    patient_phone: number;
}

export interface IBooking {
    booking_id: number;
    booking_date: Date;
    booking_time: number;
    patient_id: number;
    doctor_id: number;
}
