import { __BASEURL__ } from "@/lib/constants/baseurl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const endPoint = `/anime/${id}/stream`;
  const endPoint2 = `/anime/${id}/stream/external`;

  try {
    const res = await fetch(__BASEURL__ + endPoint);
    const resExt = await fetch(__BASEURL__ + endPoint2);

    // Check if the response is OK
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const data2 = await resExt.json();
    const episodes = data2[0].result.anime_info.episodes;
    const result = {
      ...data[0].result,
      episodes,
    }
    return NextResponse.json(result);
  } catch (error) {
    // Narrow the type of error to ensure proper typing
    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
