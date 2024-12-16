import axios from "axios";

type TokenResponse = {
  access_token?: string;
  token_type?: string;
  error_description?: string;
};

export const getManagementApiToken = async () => {
  try {
    const tokenOptions = {
      method: "POST",
      url: `${process.env.AUTH0_API_URL}/oauth/token`,
      headers: { "Content-Type": "application/json" },
      data: {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      },
    };

    const tokenRes = await axios.request<TokenResponse>(tokenOptions);

    return tokenRes.data.access_token;
  } catch (error) {
    console.error(
      "An error occurred while fetching management API token: ",
      error,
      "end"
    );
    return null;
  }
};
