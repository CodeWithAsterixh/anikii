import { anikiiApi } from "@/lib/mods/requests/axios";
import { seasons } from "@/lib/types/__anikii_api";
import { ReleasesType } from "@/lib/types/anime/__releases";
import {
  setNewRelease,
  setSeasoned,
  setSeasonedAny,
} from "@/store/reducers/listReducer";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useSeasons(season?: seasons, year?: number) {
  const responseSeasoned = useSelector((s: RootState) => s.Season_SEASON);
  const response = useSelector((s: RootState) => s.Season);
  const dispatch = useDispatch<AppDispatch>();

  const fetchSeason = useCallback(
    async (page = 1) => {
      if (season) {
        dispatch(
          setSeasonedAny({
            ok: true,
            data: [],
            status: "initiated",
            season: "WINTER",
          })
        );
      } else {
        dispatch(setSeasoned({ ok: true, data: [], status: "initiated" }));
      }
      try {
        if (season) {
          dispatch(
            setSeasonedAny({
              ok: true,
              data: [],
              status: "loading",
              season,
            })
          );
        } else {
          dispatch(setSeasoned({ ok: true, data: [], status: "loading" }));
        }
        const endPoint =
          season && year
            ? `/popular/releases/seasons/${season}/${year}?page=${page}`
            : season
            ? `/popular/releases/seasons/${season}?page=${page}`
            : `/popular/releases/seasons?page=${page}`;
        const popular = await anikiiApi(endPoint);
        const datas: ReleasesType[] = popular.data[0].result.media.sort(
          (a: { popularity: number }, b: { popularity: number }) =>
            b.popularity - a.popularity
        );
        const pageInfo = popular.data[0].result.pageInfo;

        if (season) {
          dispatch(
            setSeasonedAny({
              ok: true,
              data: datas,
              status: "done",
              season,
              pageInfo,
            })
          );
        } else {
          dispatch(setSeasoned({ ok: true, data: datas, status: "done" }));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        if (season) {
          dispatch(
            setSeasonedAny({
              ok: false,
              data: [],
              status: "error",
              season,
            })
          );
        } else {
          dispatch(setSeasoned({ ok: false, data: [], status: "error" }));
        }
      }
    },
    [dispatch, season, year]
  );

  return { response: season ? responseSeasoned : response, fetchSeason };
}

export function useReleases() {
  const response = useSelector((s: RootState) => s.Releases);
  const dispatch = useDispatch<AppDispatch>();

  const fetchReleases = useCallback(
    async (page = 1) => {
      dispatch(setNewRelease({ ok: true, data: [], status: "initiated" }));
      try {
        dispatch(setNewRelease({ ok: true, data: [], status: "loading" }));

        const popular = await anikiiApi(`/popular/releases?page=${page}`);
        const datas: ReleasesType[] = popular.data[0].result.media.sort(
          (a: { popularity: number }, b: { popularity: number }) =>
            b.popularity - a.popularity
        );
        const pageInfo = popular.data[0].result.pageInfo;
        dispatch(
          setNewRelease({ ok: true, data: datas, status: "done", pageInfo })
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setNewRelease({ ok: false, data: [], status: "error" }));
      }
    },
    [dispatch]
  );

  return { response, fetchReleases };
}
