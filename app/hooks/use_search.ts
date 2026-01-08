import { useAsync } from "./use_async";
import { search_anime } from "../helpers/search_controller";

export function useSearch() {
  const search = useAsync(search_anime);

  const perform_search = (keyword: string, page = 1) => {
    if (!keyword) return;
    search.execute(keyword, page);
  };

  return {
    ...search,
    perform_search,
  };
}
