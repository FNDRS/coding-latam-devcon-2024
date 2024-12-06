import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.redirect(`${req.nextUrl.origin}/`);
  response.cookies.set("access_token", "", { maxAge: -1 });
  return response;
}
