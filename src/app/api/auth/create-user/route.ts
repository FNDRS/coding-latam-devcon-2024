import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

async function getAccessToken() {
  const response = await axios.post(
    `${process.env.AUTH0_API_URL}/oauth/token`,
    {
      client_id: process.env.AUTH0_MANAGEMENT_ID,
      client_secret: process.env.AUTH0_MANAGEMENT_SECRET,
      grant_type: "client_credentials",
      audience: `${process.env.AUTH0_AUDIENCE}`,
    }
  );

  return response.data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();
    const accessToken = await getAccessToken();

    const createUserResponse = await axios.post(
      `${process.env.AUTH0_API_URL}/api/v2/users`,
      {
        email,
        password,
        connection: "Username-Password-Authentication",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const userId = createUserResponse.data.user_id;

    await axios.post(
      `${process.env.AUTH0_API_URL}/api/v2/users/${userId}/roles`,
      { roles: [role] },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      { message: "User created and role assigned successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
    } else {
      console.error("Error creating user:", error);
    }
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
