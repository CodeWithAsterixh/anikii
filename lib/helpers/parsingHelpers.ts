// helpers/parsingHelpers.ts

import { parseDownloadLinks } from "./parsers/download";
import { parseAnimeDetails } from "./parsers/animeDetails";
import { parseGenres } from "./parsers/genereResults";
import { parseStreamingInfo } from "./parsers/streamingInfo";
import { parseRecommended } from "./parsers/recommendation";
import { animeItemList } from "./parsers/popular";
import { parsePagesLeft } from "./parsers/pagesLeft";

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
  animeItems(html: string) {
    return animeItemList(html);
  }
  genres(html: string) {
    return parseGenres(html);
  }
  pagesLeft(html: string) {
    return parsePagesLeft(html);
  }
}

export const parser = new Parser();
