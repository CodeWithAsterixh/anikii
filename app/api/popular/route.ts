import { __BASEURL__ } from "@/lib/constants/baseurl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") || "1";
  const endPoint = `/popular?page=${page}`;

  try {
    const res = await fetch(__BASEURL__ + endPoint);

    // Check if the response is OK
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data[0]);
  } catch (error) {
    // Narrow the type of error to ensure proper typing
    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
