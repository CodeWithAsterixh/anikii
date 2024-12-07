// app/api/genre/route.ts
import { __BASE_URL__ } from "@/lib/constants/baseurl";
import { fetchData } from "@/lib/helpers/fetchHelpers";
import { parser } from "@/lib/helpers/parsingHelpers";
import { NextResponse } from "next/server";

export async function GET() {
  const url = `${__BASE_URL__}`;

  try {
    // Fetch data from the source URL
    const html = await fetchData(url);

    // Parse the response to extract recommendations
    const result: string[] = parser.genres(html);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: "No popular anime found" },
        { status: 404 }
      );
    }

    // Return the parsed result as JSON
    return NextResponse.json({ result });
  } catch (error) {
    // Return a structured error response
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
