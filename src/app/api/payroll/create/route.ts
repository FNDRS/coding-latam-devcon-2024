import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const url = `${process.env.API_GATEWAY}/payroll-service/api/v1/payroll`;

  try {
    const data = await request.json();

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
      maxBodyLength: Infinity,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error creating payroll:", error.message);
    return NextResponse.json(
      { message: "Failed to create payroll", error: error.message },
      { status: 500 }
    );
  }
}
