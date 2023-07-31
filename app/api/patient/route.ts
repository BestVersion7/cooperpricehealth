import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const patient_id = Number(req.nextUrl.searchParams.get("patient_id"));

    let result = await fetch("https://www.hunterkf.com/api/booking/patient", {
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    if (patient_id) {
        result = await fetch(
            `https://www.hunterkf.com/api/booking/patient?patient_id=${patient_id}`,
            {
                headers: {
                    authorization: `${process.env.API_KEY}`,
                },
                cache: "force-cache",
            }
        );
    }
    const data = await result.json();
    return NextResponse.json(data);
}
