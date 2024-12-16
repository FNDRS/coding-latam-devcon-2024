import { getManagementApiToken } from "@/utils/auth-0-utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface ErrorResponse {
  error: string;
}

export async function GET(req: NextRequest) {
  const token = await getManagementApiToken();

  try {
    const response = await axios.get(
      `${process.env.API_URL}/payroll-employees`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      return NextResponse.json(
        {
          error: "An error occurred while fetching employees",
        } as ErrorResponse,
        { status: 500 }
      );
    }

    const data: EmployeeResponse[] = response.data;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("An error occurred while fetching employees: ", error);
    return NextResponse.json(
      {
        error: "An error occurred while fetching employees.",
      } as ErrorResponse,
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = await getManagementApiToken();

  try {
    const data: EmployeeRequest = await req.json();
    console.log("data", data, "end data");
    const response = await axios.post(
      `${process.env.API_URL}/payroll-employees`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      return NextResponse.json(
        {
          error: "An error occurred while creating the employee",
        } as ErrorResponse,
        { status: 500 }
      );
    }

    const responseData: EmployeeResponse = response.data;

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("An error occurred while creating the employee: ", error);
    return NextResponse.json(
      {
        error: "An error occurred while creating the employee.",
      } as ErrorResponse,
      { status: 500 }
    );
  }
}
