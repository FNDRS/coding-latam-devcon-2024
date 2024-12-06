import { accessTokenDecode } from "@/utils/jwt-helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Access token required" },
      { status: 401 }
    );
  }

  try {
    const result = await accessTokenDecode(token);

    if (result.status && result.data) {
      return NextResponse.json({ valid: true, userId: result.data.userId });
    } else {
      return NextResponse.json(
        { error: "Invalid token", message: result.message },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Token validation failed" },
      { status: 500 }
    );
  }
}
