// app/api/search/route.ts
import { __BASE_URL__ } from "@/lib/constants/baseurl";
import { fetchData } from "@/lib/helpers/fetchHelpers";
import { parser } from "@/lib/helpers/parsingHelpers";
import { SearchResult } from "@/lib/types/__anikii_api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Extract query params from request
  const keyword = searchParams.get("for") || "1"; // Default to page 1 if not provided
  const genre = searchParams.get("genre") || "1"; // Default to page 1 if not provided
  const country = searchParams.get("country") || "1"; // Default to page 1 if not provided
  const season = searchParams.get("season") || "1"; // Default to page 1 if not provided
  const year = searchParams.get("year") || "1"; // Default to page 1 if not provided
  const language = searchParams.get("language") || "1"; // Default to page 1 if not provided
  const type = searchParams.get("type") || "1"; // Default to page 1 if not provided
  const status = searchParams.get("status") || "1"; // Default to page 1 if not provided
  const sort = searchParams.get("sort") || "1"; // Default to page 1 if not provided
  let url = `${__BASE_URL__}search.html?keyword=${keyword}`;

  if (
    genre ||
    country ||
    season ||
    year ||
    language ||
    type ||
    status ||
    sort
  ) {
    url = `${__BASE_URL__}filter.html?keyword=${keyword}`;

    // Append each filter to the URL only if it's provided
    if (genre) {
      url += `&genre=${genre}`; // Assuming genre is an array
    }
    if (country) {
      url += `&country=${country}`;
    }
    if (season) {
      url += `&season=${season}`;
    }
    if (year) {
      url += `&year=${year}`;
    }
    if (language) {
      url += `&language=${language}`;
    }
    if (type) {
      url += `&type=${type}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    if (sort) {
      url += `&sort=${sort}`;
    }
  }

  try {
    // Fetch data from the source URL
    const html = await fetchData(url);

    // Parse the response to extract recommendations
    const result: SearchResult[] = parser.popularList(html);

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
