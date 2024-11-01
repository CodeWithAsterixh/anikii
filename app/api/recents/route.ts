import { abApi } from "@/mods/requests/axios";
export async function GET() {
  const animes = await abApi(`/recent/1`);

  return new Response(JSON.stringify(animes.data.results), {
    status: 200,
  });
}
