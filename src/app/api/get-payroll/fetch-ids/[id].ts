import { NextResponse } from "next/server";
import axios from "axios";

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  const payrollId = params.id;

  if (!payrollId) {
    return NextResponse.json(
      { message: "Missing payroll ID in the route." },
      { status: 400 }
    );
  }

  const url = `${process.env.API_GATEWAY}/payroll-service/api/v1/payroll/${payrollId}`;

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
