import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://anikii.vercel.app";
  const info = {
    details: baseUrl + "/api/details/:id",
    search: baseUrl + "/api/search/:word/:page",
    genre: baseUrl + "/api/genre/:type/:page",
  };
  return NextResponse.json(info);
}
