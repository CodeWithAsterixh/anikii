import { sortReleasesByKey } from "@/lib/mods/functions/sortSimilarityToStr";
import { anikiiApi } from "@/lib/mods/requests/axios";
import { ReleasesType } from "@/lib/types/anime/__releases";
import { setSearchResult } from "@/store/reducers/listReducer";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useSearch() {
  const response = useSelector((s: RootState) => s.SearchResult);
  const dispatch = useDispatch<AppDispatch>();

  const fetchSearchResult = useCallback(
    async (keyword: string, page = 1) => {
      dispatch(setSearchResult({ ok: true, data: [], status: "initiated" }));
      try {
        dispatch(setSearchResult({ ok: true, data: [], status: "loading" }));
        const popular = await anikiiApi(`/search?for=${keyword}&page=${page}`);
        const datas: ReleasesType[] = popular.data[0].result.media.sort(
          (a: { popularity: number }, b: { popularity: number }) =>
            b.popularity - a.popularity
        );
        const dataSortedByKeyword = sortReleasesByKey("keyword", datas, [
          "title.romaji",
        ]);
        dispatch(
          setSearchResult({
            ok: true,
            data: dataSortedByKeyword,
            status: "done",
          })
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setSearchResult({ ok: false, data: [], status: "error" }));
      }
    },
    [dispatch]
  );

  return { response, fetchSearchResult };
}
