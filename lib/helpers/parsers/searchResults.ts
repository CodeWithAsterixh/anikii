import { SearchResult } from "@/lib/types/__anikii_api";
import cheerio from "../cheerio";

export function parseSearchResults(html: string): SearchResult[] {
  const $ = cheerio.load(html);
  return $(".img")
    .map((_, element) => {
      const title = $(element).find("a").attr("title");
      const id = $(element).find("a").attr("href")?.slice(10);
      const image = $(element).find("a img").attr("src");
      return { title, id, image };
    })
    .get();
}
