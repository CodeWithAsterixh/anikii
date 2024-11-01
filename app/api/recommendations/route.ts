import { abApi } from "@/mods/requests/axios";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name");
  const animes = await abApi(`/recommendations/${name}`);

  return new Response(JSON.stringify(animes.data.results), {
    status: 200,
  });
}
