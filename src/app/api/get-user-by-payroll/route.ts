import { NextResponse } from "next/server";
import axios from "axios";

const API_GATEWAY = process.env.API_GATEWAY || "";

export async function POST(request: Request) {
  const { payrollId } = await request.json();

  if (!payrollId) {
    return NextResponse.json(
      { message: "Payroll ID is required" },
      { status: 400 }
    );
  }

  const url = `${API_GATEWAY}/payroll-user-service/api/v1/payroll-users/payroll/${payrollId}`;

  try {
    const response = await axios.get(url, {
      maxBodyLength: Infinity,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching payroll data:", error.message);

    return NextResponse.json(
      { message: "Failed to fetch payroll data", error: error.message },
      { status: 500 }
    );
  }
}
