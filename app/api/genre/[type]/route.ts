// app/api/genre/[type]/route.ts
import { __BASE_URL__ } from "@/lib/constants/baseurl";
import { fetchData } from "@/lib/helpers/fetchHelpers";
import { parser } from "@/lib/helpers/parsingHelpers";
import { validatePageNumber } from "@/lib/helpers/validationHelpers";
import { GenreResult } from "@/lib/types/__anikii_api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const param = await params;
  const { searchParams } = new URL(req.url); // Extract query params from request
  const page = searchParams.get("page") || "1"; // Default to page 1 if not provided
  const url = `${__BASE_URL__}genre/${param.type}?page=${page}`;

  try {
    if (!validatePageNumber(page)) {
      return NextResponse.json({ results: [] }, { status: 404 });
    }
    const html = await fetchData(url);
    const results: GenreResult[] = parser.popularList(html);
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
