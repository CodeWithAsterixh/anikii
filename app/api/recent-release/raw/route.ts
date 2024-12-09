// app/api/new-season/route.ts
import { __BASE_URL__ } from "@/lib/constants/baseurl";
import { fetchData } from "@/lib/helpers/fetchHelpers";
import { pagesLeft } from "@/lib/helpers/parsers/pagesLeft";
import { parser } from "@/lib/helpers/parsingHelpers";
import { AnimeItem, PagedRouteResult } from "@/lib/types/__anikii_api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Extract query params from request
  const page = searchParams.get("page") || "1"; // Default to page 1 if not provided
  const url = `${__BASE_URL__}recently-added-raw?page=${page}`;

  try {
    // Fetch data from the source URL
    const html = await fetchData(url);

    // Parse the response to extract recommendations
    const itemRes: AnimeItem[] = parser.animeItems(html);
    const pages: pagesLeft = parser.pagesLeft(html);
    const result: PagedRouteResult = {
      animeItem: itemRes,
      pages,
    };

    if (!result.animeItem || result.animeItem.length === 0) {
      return NextResponse.json({ error: "No anime found" }, { status: 404 });
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
