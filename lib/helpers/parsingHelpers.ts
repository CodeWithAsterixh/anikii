// helpers/parsingHelpers.ts

import { parseDownloadLinks } from "./parsers/download";
import { parseAnimeDetails } from "./parsers/animeDetails";
import { parseGenres } from "./parsers/genereResults";
import { parseStreamingInfo } from "./parsers/streamingInfo";
import { parseRecommended } from "./parsers/recommendation";
import { parsePopularList } from "./parsers/popular";

class Parser {
  animeDetails(html: string) {
    return parseAnimeDetails(html);
  }

  streamingInfo(html: string) {
    return parseStreamingInfo(html);
  }
  recommendation(html: string) {
    return parseRecommended(html);
  }
  downloadLink(html: string) {
    return parseDownloadLinks(html);
  }
  popularList(html: string) {
    return parsePopularList(html);
  }
  genres(html: string) {
    return parseGenres(html);
  }
}

export const parser = new Parser();
