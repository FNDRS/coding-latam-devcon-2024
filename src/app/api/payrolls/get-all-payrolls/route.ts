import { getManagementApiToken } from "@/utils/auth-0-utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getManagementApiToken();
  try {
    const response = await axios.get<PayrollResponse>(
      `${process.env.API_URL}/payrolls`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "An error occurred while fetching payrolls" },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching payroll:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch payroll", error: error.message },
      { status: 500 }
    );
  }
}
