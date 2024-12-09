import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message?: string;
  access_token?: string;
  id_token?: string;
  error_description?: string;
  user?: any; // Para almacenar los datos del usuario
};

type RequestBody = {
  email: string;
  password: string;
};

export const POST = async (req: NextRequest & { body: RequestBody }) => {
  try {
    const data = await req.json();
    const { email, password } = data;

    const loginOptions = {
      method: "POST",
      url: `${process.env.AUTH0_API_URL}/oauth/token`,
      headers: { "Content-Type": "application/json" },
      data: {
        grant_type: "password",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        username: email,
        password: password,
        scope: "openid profile email",
        realm: "Username-Password-Authentication",
      },
    };

    const loginResponse = await axios.request<ResponseData>(loginOptions);

    if (loginResponse.data.access_token) {
      const access_token = loginResponse.data.access_token;

      // Obtener la información del usuario con el access_token
      const userInfoResponse = await axios.get(
        `${process.env.AUTH0_API_URL}/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const userData = userInfoResponse.data; // Esta es la data del usuario

      const managementTokenResponse = await axios.post<ResponseData>(
        `${process.env.AUTH0_API_URL}/oauth/token`,
        {
          client_id: process.env.AUTH0_MANAGEMENT_ID,
          client_secret: process.env.AUTH0_MANAGEMENT_SECRET,
          grant_type: "client_credentials",
          audience: process.env.AUTH0_AUDIENCE,
        }
      );

      const { access_token: management_token } = managementTokenResponse.data;

      const response = NextResponse.json({
        status: 200,
        body: {
          message: "Logged in successfully",
          user: userData, // Incluimos la data del usuario
          status: 200,
        },
      });

      // Guardar los tokens en cookies
      if (access_token) {
        response.cookies.set("access_token", access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600,
        });
      }

      if (loginResponse.data.id_token) {
        response.cookies.set("id_token", loginResponse.data.id_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600,
        });
      }

      if (management_token) {
        response.cookies.set("management_token", management_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600,
        });
      }

      return response;
    }
  } catch (error) {
    const err = error as AxiosError<ResponseData>;

    return NextResponse.json({
      status: 400,
      body: {
        error: err.response?.data?.error_description || "Invalid credentials",
      },
    });
  }
};
