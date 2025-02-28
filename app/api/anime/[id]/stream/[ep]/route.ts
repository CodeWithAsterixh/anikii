import { __BASEURL__ } from "@/lib/constants/baseurl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; ep: string }> }
) {
  const { id, ep } = await params;
  const url = new URL(req.url);
  const type = url.searchParams.get("type")||"sub";
  const endPoint = `/anime/${id}/stream/ep/${ep}?type=${type}`; // Replace with your API endpoint

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

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
