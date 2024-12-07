import cheerio from "../cheerio";

export function parseGenres(html: string): string[] {
  const $ = cheerio.load(html); // Load the HTML string with Cheerio
  const genres: string[] = [];

  // Select all <a> elements under the list of genres
  $("li.movie.genre ul li a").each((_, element) => {
    const href = $(element).attr("href");
    if (href && href.startsWith("/genre/")) {
      const genreName = href.replace("/genre/", ""); // Extract the genre name
      genres.push(genreName);
    }
  });

  return genres;
}
