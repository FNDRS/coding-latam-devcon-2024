import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const userInfoCookie = (await cookies()).get("user_info")?.value;

  if (!userInfoCookie) {
    return NextResponse.json({ error: "User info not found" }, { status: 404 });
  }

  try {
    const userInfo = JSON.parse(userInfoCookie);
    return NextResponse.json({ userInfo });
  } catch {
    return NextResponse.json(
      { error: "Failed to parse user info" },
      { status: 500 }
    );
  }
}
