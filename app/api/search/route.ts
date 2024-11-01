import { abApi } from "@/mods/requests/axios";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const term = searchParams.get("term");
  const animes = await abApi(`/search/${term}`);

  return new Response(JSON.stringify(animes.data.results), {
    status: 200,
  });
}
