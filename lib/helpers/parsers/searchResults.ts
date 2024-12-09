import { AnimeItem } from "@/lib/types/__anikii_api";
import cheerio from "../cheerio";

export function parseSearchResults(html: string): AnimeItem[] {
  const $ = cheerio.load(html);
  const result = $(".img")
    .map((_, element) => {
      const title = $(element).find("a").attr("title");
      const id = $(element).find("a").attr("href")?.slice(10);
      const image = $(element).find("a img").attr("src");
      if (title && id && image) {
        return { title, id, image };
      }
    })
    .get();
  return result;
}
