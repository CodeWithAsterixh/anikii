import { anikiiApi } from "@/lib/mods/requests/axios";
import { ReleasesType } from "@/lib/types/anime/__releases";
import { setPopular } from "@/store/reducers/listReducer";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function usePopular() {
  const response = useSelector((s: RootState) => s.Popular);
  const dispatch = useDispatch<AppDispatch>();

  const fetchPopular = useCallback(
    async (page = 1) => {
      dispatch(setPopular({ ok: true, data: [], status: "initiated" }));
      try {
        dispatch(setPopular({ ok: true, data: [], status: "loading" }));
        const popular = await anikiiApi(`/popular/?page=${page}`);
        const datas: ReleasesType[] = popular.data[0].result.media.sort(
          (a: { popularity: number }, b: { popularity: number }) =>
            b.popularity - a.popularity
        );
        const pageInfo = popular.data[0].result.pageInfo;
        dispatch(
          setPopular({ ok: true, data: datas, status: "done", pageInfo })
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setPopular({ ok: false, data: [], status: "error" }));
      }
    },
    [dispatch]
  );

  return { response, fetchPopular };
}
