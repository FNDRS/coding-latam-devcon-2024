import axios from "axios";
import { NextResponse } from "next/server";

const getAuthToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `${process.env.AUTH0_API_URL}/oauth/token`,
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `${process.env.AUTH0_API_URL}/api/v2/`,
        grant_type: "client_credentials",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Auth0 token:", error);
    throw new Error("Failed to authenticate with Auth0.");
  }
};

const getUsers = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.AUTH0_API_URL}/api/v2/users`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching users from Auth0:", error.message);
    } else {
      console.error("Unexpected error fetching users from Auth0:", error);
    }
    throw new Error("Failed to fetch users from Auth0.");
  }
};

export const GET = async () => {
  try {
    const token = await getAuthToken();

    const users = await getUsers(token);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 }
    );
  }
};
