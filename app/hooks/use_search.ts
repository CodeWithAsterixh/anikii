import { use_async } from "./use_async";
import { search_anime } from "../helpers/search_controller";

export function use_search() {
  const search = use_async(search_anime);

  const perform_search = (keyword: string, page = 1) => {
    if (!keyword) return;
    search.execute(keyword, page);
  };

  return {
    ...search,
    perform_search,
  };
}
