import { abApi } from "@/mods/requests/axios";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const animes = await abApi(`/anime/${id}`);

  return new Response(JSON.stringify(animes.data.results), {
    status: 200,
  });
}
