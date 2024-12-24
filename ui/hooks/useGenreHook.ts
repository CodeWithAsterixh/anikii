import { anikiiApi } from "@/lib/mods/requests/axios";
import { ReleasesType } from "@/lib/types/anime/__releases";
import { genreItem, setGenresListResult, setGenresResult } from "@/store/reducers/listReducer";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGenre() {
  const response = useSelector((s: RootState) => s.Genres);
  const responseGL = useSelector((s: RootState) => s.GenresList);
  const dispatch = useDispatch<AppDispatch>();

  const fetchGenres = useCallback(
    async () => {
      dispatch(setGenresResult({ ok: true, data: [], status: "initiated" }));
      try {
        dispatch(setGenresResult({ ok: true, data: [], status: "loading" }));
        const genres = await anikiiApi<[{result:genreItem[]}, number]>(`/genres/`);
        const datas: genreItem[] = genres.data[0].result
        dispatch(
          setGenresResult({ ok: true, data: datas, status: "done" })
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setGenresResult({ ok: false, data: [], status: "error" }));
      }
    },
    [dispatch]
  );
  const fetchGenresSpecific = useCallback(
    async (page = 1,genre:string) => {
      dispatch(setGenresListResult({ ok: true, data: [], status: "initiated" }));
      try {
        dispatch(setGenresListResult({ ok: true, data: [], status: "loading" }));
        const genres = await anikiiApi(`/genres/${genre}?page=${page}`);
        const datas: ReleasesType[] = genres.data[0].result.media.sort(
          (a: { popularity: number }, b: { popularity: number }) =>
            b.popularity - a.popularity
        );
        const pageInfo = genres.data[0].result.pageInfo;
        dispatch(
          setGenresListResult({ ok: true, data: datas, status: "done", pageInfo })
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setGenresListResult({ ok: false, data: [], status: "error" }));
      }
    },
    [dispatch]
  );

  return { response,responseGL, fetchGenres,fetchGenresSpecific };
}
