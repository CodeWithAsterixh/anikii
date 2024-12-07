import cheerio from "../cheerio";

export function parseDownloadLinks(html: string) {
  const $ = cheerio.load(html); // Load the HTML content using Cheerio

  // Extract direct download links (e.g., 360p, 480p, 720p)
  const result = $("#player_html5_api").attr("src");
  if (result) {
    return result;
  }

  return "not available";
}
