import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const accessTokenRes = await axios.post(
      `${process.env.AUTH0_API_URL}/oauth/token`,
      {
        client_id: process.env.AUTH0_MANAGEMENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_SECRET,
        grant_type: "client_credentials",
        audience: `${process.env.AUTH0_AUDIENCE}`,
      }
    );

    return NextResponse.json(
      {
        access_token: accessTokenRes.data.access_token,
        scope: accessTokenRes.data.scope,
      },
      { status: 200 }
    );
  } catch (error) {
    const status =
      axios.isAxiosError(error) && error.response ? error.response.status : 500;

    return NextResponse.json(
      {
        message: "Could not obtain authorization token.",
        error: axios.isAxiosError(error) ? error.message : "Unknown error",
      },
      { status }
    );
  }
};
