import { abApi } from "@/mods/requests/axios";

export async function GET() {
  const animes = await abApi("/home");

  const animeResult = animes.data.results;
  return new Response(JSON.stringify(animeResult), {
    status: 200,
  });
}
