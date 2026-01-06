import { get_popular_anime } from "../helpers/home_controller";
import { AnimeListEnvelopeSchema } from "../helpers/schemas";

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  try {
    const popular_raw = await get_popular_anime();
    const popular = AnimeListEnvelopeSchema.parse(popular_raw);
    const animeList = popular.data || [];

    const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/search</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  ${animeList.map(anime => `
  <url>
    <loc>${baseUrl}/anime/${anime.id}</loc>
    <priority>0.7</priority>
    <changefreq>weekly</changefreq>
  </url>
  `).join('')}
</urlset>
`.trim();

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Sitemap error:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
};
