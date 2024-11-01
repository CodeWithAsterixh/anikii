import { abApi } from "@/mods/requests/axios";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const anime_episode = searchParams.get("anime_episode");
  const downloadables = await abApi(`/download/${anime_episode}`);

  return new Response(JSON.stringify(downloadables.data.results), {
    status: 200,
  });
}
