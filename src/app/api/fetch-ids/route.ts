import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const url = `${process.env.API_GATEWAY}/api/v1/payroll/f84e2695-5fa8-4d3d-be99-93c046c58dd1`;

  try {
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch payroll data", error: error.message },
      { status: 500 }
    );
  }
}
