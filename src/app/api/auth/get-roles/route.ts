import { NextRequest } from "next/server";
import axios from "axios";

interface Role {
  id: string;
  name: string;
  description: string;
}

interface ErrorResponse {
  error: string;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value;

    const response = await axios.get(
      `${process.env.AUTH0_API_URL}/api/v2/roles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data: Role[] = response.data;
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("An error occurred while fetching roles: ", error);
    return Response.json(
      { error: "An error occurred while fetching roles" } as ErrorResponse,
      { status: 500 }
    );
  }
}
