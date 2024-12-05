import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const url = `${process.env.API_GATEWAY}/payroll-service/api/v1/payroll`;

  try {
    const payload = await req.json();
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
      maxBodyLength: Infinity,
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to create payroll",
        error: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
