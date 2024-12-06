import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    await axios.post(
      `${process.env.AUTH0_API_URL}/dbconnections/change_password`,
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        email,
        connection: "Username-Password-Authentication",
      }
    );

    return NextResponse.json({
      message: "Password reset link sent successfully",
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error || "Failed to send reset link" },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send reset link" },
        { status: 500 }
      );
    }
  }
}
