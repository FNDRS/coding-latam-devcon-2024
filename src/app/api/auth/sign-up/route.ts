import { getManagementApiToken } from "@/utils/auth-0-utils";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

type SignupResponse = {
  _id?: string;
  email?: string;
  error_description?: string;
};

type TokenResponse = {
  access_token?: string;
  id_token?: string;
  error_description?: string;
};

type RequestBody = {
  email: string;
  password: string;
  roleId: string;
};

const assignRoleToUser = async (
  userId: string,
  roleId: string,
  accessToken: string
) => {
  const roleOptions = {
    method: "POST",
    url: `${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      roles: [roleId],
    },
  };

  await axios.request(roleOptions);
};

export const POST = async (req: NextRequest) => {
  try {
    const data: RequestBody = await req.json();
    const { email, password, roleId } = data;

    const signupOptions = {
      method: "POST",
      url: `${process.env.AUTH0_API_URL}/dbconnections/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        client_id: process.env.AUTH0_CLIENT_ID,
        email,
        password,
        connection: "Username-Password-Authentication",
      },
    };

    const signupRes = await axios.request<SignupResponse>(signupOptions);

    if (signupRes.data._id) {
      const auth0UserId = signupRes.data._id;

      const managementToken = await getManagementApiToken();

      if (!roleId) {
        throw new Error("AUTH0_ROLE_ID is not defined");
      }
      if (!managementToken) {
        throw new Error("Failed to retrieve management API token");
      }
      await assignRoleToUser(auth0UserId, roleId, managementToken);

      return NextResponse.json({ auth0UserId }, { status: 200 });
    }

    return NextResponse.json(
      { error: "Failed to register user in Auth0", details: signupRes.data },
      { status: 400 }
    );
  } catch (error) {
    const err = error as AxiosError<SignupResponse | TokenResponse>;
    return NextResponse.json(
      {
        status: 400,
        body: {
          error: err.response?.data?.error_description || "An error occurred",
        },
      },
      { status: 400 }
    );
  }
};
