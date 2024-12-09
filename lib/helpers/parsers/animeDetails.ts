import { AnimeDetails, Episode } from "@/lib/types/__anikii_api";
import cheerio from "../cheerio";

export function parseAnimeDetails(html: string): AnimeDetails {
  const $ = cheerio.load(html);

  // Extract title and episode
  const titleElement = $(".video-info-left h1").text();
  const [title, episode] = titleElement
    .split(" Episode ")
    .map((str) => str.trim());

  // Extract description
  const description = $(".video-details .post-entry .content-more-js")
    .text()
    .trim();

  // Extract video URL
  const videoUrl = $(".play-video iframe").attr("src") || "";

  // Extract image URL
  const image = $(".video-block .img img").attr("src") || "";

  // Extract release date
  const releaseDate = $(".video-block .meta .date").text().trim();

  // Extract episode list
  const episodes: Episode[] = [];
  $(".listing.items.lists .video-block").each((_, element) => {
    const episodeTitle = $(element).find(".name").text().trim();
    const episodeUrl = $(element).find("a").attr("href") || "";
    const episodeImageUrl = $(element).find(".img img").attr("src") || "";
    const episodeReleaseDate = $(element).find(".meta .date").text().trim();

    episodes.push({
      title: episodeTitle,
      url: episodeUrl,
      imageUrl: episodeImageUrl,
      releaseDate: episodeReleaseDate,
    });
  });

  return {
    title,
    episode,
    description,
    videoUrl,
    image,
    releaseDate,
    episodes,
  };
}
