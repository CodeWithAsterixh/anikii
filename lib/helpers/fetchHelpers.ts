export async function fetchData(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}: ${response.statusText}`
      );
    }

    return await response.text();
  } catch (error) {
    throw new Error(`Error during fetch: ${(error as Error).message}`);
  }
}
