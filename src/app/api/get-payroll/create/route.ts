import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export async function POST(request: Request) {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    checkServerIdentity: () => undefined,
  });

  const body = await request.json();

  const url =
    "https://devcon-hackaton-api-gateway.thefndrs.com/payroll-service/api/v1/payroll-frequency";

  try {
    const response = await axios.post(url, body, {
      httpsAgent,
      headers: {
        "Content-Type": "application/json",
      },
      maxBodyLength: Infinity,
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to create payroll", error: error.message },
      { status: 500 }
    );
  }
}
