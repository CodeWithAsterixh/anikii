import { AnimeItem } from "@/lib/types/__anikii_api";
import cheerio from "../cheerio";

export function animeItemList(html: string): AnimeItem[] {
  const $ = cheerio.load(html); // Load the HTML string with Cheerio
  const animeList: AnimeItem[] = [];

  // Select all <li> elements under the .listing.items class
  $(".listing.items .video-block").each((_, element) => {
    // Extract title
    const title = $(element).find(".name").text().trim();

    // Extract URL and ID
    const url = $(element).find("a").attr("href") || "";
    const id = url.split("/").pop() || ""; // Extract the last segment of the URL

    // Extract image
    const image = $(element).find(".picture img").attr("src") || "";

    // Extract release date
    const released = $(element).find(".meta .date").text().trim();

    // Push the anime details into the array
    animeList.push({
      title,
      id,
      image,
      released,
    });
  });

  return animeList;
}
