import { AnimeItem } from "@/lib/types/__anikii_api";
import cheerio from "../cheerio";

export function parseRecommended(html: string) {
  const $ = cheerio.load(html); // Load the HTML content using Cheerio

  // Define the result array that will hold the parsed data
  const result: AnimeItem[] = [];

  // Iterate through each li tag inside the ul with class 'menu_recent'
  $(".menu_recent ul li").each((i, el) => {
    const title = $(el).find("a[title]").attr("title"); // Extract the title of the anime
    const id = $(el).find("a[title]").attr("href")?.split("/")[0]; // Extract the URL of the episode
    const image = $(el)
      ?.find(".thumbnail-recent")
      ?.css("background")
      ?.replace(/^url\(["']?/, "")
      .replace(/["']?\)$/, ""); // Extract the background image URL
    const released = $(el).find(".time_2").text().trim(); // Extract the episode number

    if (title && id && image && released) {
      // Push the extracted data into the result array
      result.push({ title, id, image, released });
    }
  });

  return result;
}
