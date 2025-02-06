import { __BASEURL__ } from "@/lib/constants/baseurl";
import { NextResponse } from "next/server";

export async function GET() {
  const endPoint = "/genres";

  try {
    const res = await fetch(__BASEURL__ + endPoint);

    // Check if the response is OK
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data: ${res.statusText}` },
        { status: res.status }
      );
    }

    // loop through genres and create a new array of genres
    // const subItems = a

    const data = await res.json();
    return NextResponse.json(data[0]);
  } catch (error) {
    // Narrow the type of error to ensure proper typing
    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
