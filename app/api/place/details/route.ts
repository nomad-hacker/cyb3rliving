import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  searchParams.set("key", process.env.GOOGLE_MAP_API_KEY || "");

  const res = await fetch(
    "https://maps.googleapis.com/maps/api/place/details/json?" +
      searchParams.toString()
  );
  const data = await res.json();

  return NextResponse.json({ data });
}
