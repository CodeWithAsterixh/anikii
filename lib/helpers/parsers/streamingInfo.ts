import { StreamInfo, StreamLink } from "@/lib/types/__anikii_api";
import cheerio from "../cheerio";

export function parseStreamingInfo(html: string) {
  const $ = cheerio.load(html); // Load the HTML content using Cheerio

  // Explicitly define the type as an array of objects with string keys and string values
  const streamLink: StreamLink[] = [];
  // Iterate through each li tag inside the ul with class 'anime_muti_link'
  $("div.anime_muti_link ul li").each((i, el) => {
    const className = $(el).attr("class"); // Get the class of the li
    const url = $(el).find("a").attr("data-video"); // Extract the data-video attribute value

    if (className && url) {
      // Add the class name as the key and the URL as the value to the result
      streamLink.push({ [className]: url });
    }
  });
  const result: StreamInfo = {
    animeInfo: {
      title: $("div.anime-info a[title]").text(), // Extract anime info title (Naruto (Dub))
      category: $("div.anime_video_body_cate a[title]").first().text(), // Extract anime info URL
    },
    episodeInfo: {
      title: $(".anime_video_body h1").text().split("at gogoanime")[0].trim(),
    },
    streamLink,
  };

  return result;
}
