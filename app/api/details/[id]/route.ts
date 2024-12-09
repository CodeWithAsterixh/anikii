// app/api/details/[id]/route.ts
import { __BASE_URL__ } from "@/lib/constants/baseurl";
import { fetchData } from "@/lib/helpers/fetchHelpers";
import { parser } from "@/lib/helpers/parsingHelpers";
import { AnimeDetails } from "@/lib/types/__anikii_api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const param = await params;

  try {
    const url = `${__BASE_URL__}videos/${param.id}`;
    const html = await fetchData(url);
    const result: AnimeDetails = parser.animeDetails(html);
    if (!result) {
      return NextResponse.json({ error: "Anime not found" }, { status: 404 });
    }
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
