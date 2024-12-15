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

type ResponseData = {
  message?: string;
  access_token?: string;
  id_token?: string;
  error_description?: string;
  user?: any;
};

export async function GET(req: NextRequest) {
  const managementTokenResponse = await axios.post<ResponseData>(
    `${process.env.AUTH0_API_URL}/oauth/token`,
    {
      client_id: process.env.AUTH0_MANAGEMENT_ID,
      client_secret: process.env.AUTH0_MANAGEMENT_SECRET,
      grant_type: "client_credentials",
      audience: process.env.AUTH0_AUDIENCE,
    }
  );

  const { access_token } = managementTokenResponse.data;

  try {
    const response = await axios.get(
      `${process.env.AUTH0_API_URL}/api/v2/roles`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
