import { AnimeDetails } from "@/lib/types/__anikii_api";
import cheerio from "../cheerio";

export function parseAnimeDetails(html: string): AnimeDetails {
  const $ = cheerio.load(html);

  const title = $(".anime_info_body_bg h1").text();
  const image = $(".anime_info_body_bg img").attr("src");
  const info = $("p.type");
  const description = $(".description");

  let type = "",
    released = "",
    status = "",
    genres = "",
    otherName = "",
    summary = "";

  description.each((_, ele) => {
    summary = $(ele).text();
  });

  info.each((_, element) => {
    const text = $(element).text();
    if (text.startsWith("Type:")) type = text.slice(6).trim();
    else if (text.startsWith("Released:")) released = text.slice(10).trim();
    else if (text.startsWith("Status:")) status = text.slice(8).trim();
    else if (text.startsWith("Genre:"))
      genres = text
        .slice(7)
        .split(",")
        .map((g) => g.trim())
        .join(", ");
    else if (text.startsWith("Other name:")) otherName = text.slice(12).trim();
  });

  const totalEpisodes =
    $("#episode_page li:last-child a").attr("ep_end") || "Unknown";

  return {
    title,
    image,
    type,
    summary,
    released,
    genres,
    status,
    totalEpisodes,
    otherName,
  };
}
