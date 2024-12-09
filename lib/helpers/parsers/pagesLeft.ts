import cheerio from "../cheerio";

export type pagesLeft = {
  totalPages: number;
  currentPage: number;
  pagesLeft: number;
};
export function parsePagesLeft(html: string): pagesLeft {
  const $ = cheerio.load(html); // Load the HTML with Cheerio
  let totalPages = 0;

  // Find all pagination links and extract the last page number
  $(".pagination li a").each((_, element) => {
    const page = parseInt($(element).attr("data-page") || "0", 10);
    if (page > totalPages) {
      totalPages = page; // Keep track of the largest page number
    }
  });

  // Find the current active page
  const currentPage = parseInt(
    $(".pagination li.active a").attr("data-page") || "1",
    10
  );

  // Calculate pages left

  return {
    currentPage,
    pagesLeft: totalPages - currentPage,
    totalPages,
  };
}
