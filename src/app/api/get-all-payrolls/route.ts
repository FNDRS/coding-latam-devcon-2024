import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export async function GET() {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  try {
    const response = await axios.get(
      `${process.env.API_GATEWAY}/payroll-service/api/v1/payroll`,
      {
        httpsAgent,
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching payroll data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch payroll data" },
      { status: 500 }
    );
  }
}
