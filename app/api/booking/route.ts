import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const booking_date = req.nextUrl.searchParams.get("booking_date");
    const doctor_id = Number(req.nextUrl.searchParams.get("doctor_id"));

    let result = await fetch("https://www.hunterkf.com/api/booking", {
        cache: "no-store",
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });

    if (doctor_id && booking_date) {
        result = await fetch(
            `https://www.hunterkf.com/api/booking?doctor_id=${doctor_id}&booking_date=${booking_date}`,
            {
                cache: "no-store",
                headers: {
                    authorization: `${process.env.API_KEY}`,
                },
            }
        );
    }

    const data = await result.json();
    return NextResponse.json(data);
}
