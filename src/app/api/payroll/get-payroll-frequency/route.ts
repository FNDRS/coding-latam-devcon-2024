import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const url = `${process.env.API_GATEWAY}/payroll-service/api/v1/payroll-frequency`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      maxBodyLength: Infinity,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching payroll frequencies:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch payroll frequencies", error: error.message },
      { status: 500 }
    );
  }
}
