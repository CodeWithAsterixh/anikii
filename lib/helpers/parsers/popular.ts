import { PopularList } from "@/lib/types/__anikii_api";
import cheerio from "../cheerio";

export function parsePopularList(html: string) {
  const $ = cheerio.load(html); // Load the HTML string with Cheerio
  const animeList: PopularList[] = [];

  // Select all the <li> elements under the .items class
  $(".last_episodes .items li").each((_, element) => {
    const title = $(element).find(".name a").text().trim();
    const url = $(element).find(".name a").attr("href") || "";
    const idspl = url.split("/");
    const id = idspl[idspl.length - 1];
    const image = $(element).find(".img a img").attr("src") || "";
    const released = $(element)
      .find(".released")
      .text()
      .replace("Released:", "")
      .trim();

    // Push the anime details into the array
    animeList.push({
      title,
      id, // Assuming a base URL
      image,
      released,
    });
  });

  return animeList;
}
