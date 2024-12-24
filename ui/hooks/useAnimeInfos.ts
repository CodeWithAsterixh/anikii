import { anikiiApi } from "@/lib/mods/requests/axios";
import { AnimeInfo, AnimeProps } from "@/lib/types/anime/__animeDetails";
import { setAnimeDetails, setAnimeStream } from "@/store/reducers/listReducer";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAnimeInfos() {
  const response = useSelector((s: RootState) => s.AnimeDetails);
  const responseStream = useSelector((s: RootState) => s.AnimeStream);
  const dispatch = useDispatch<AppDispatch>();

  const fetchInfo = useCallback(
    async (id:number) => {
      dispatch(setAnimeDetails({ ok: true, status: "initiated" }));
      try {
        dispatch(setAnimeDetails({ ok: true, status: "loading" }));
        const anime = await anikiiApi<[{result:AnimeInfo}, number]>(`/anime/${id}`);
        const datas: AnimeInfo = anime.data[0].result
        dispatch(
          setAnimeDetails({ ok: true, data: datas, status: "done" })
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setAnimeDetails({ ok: false, status: "error" }));
      }
    },
    [dispatch]
  );
  const fetchInfoStream = useCallback(
    async (id:number) => {
      dispatch(setAnimeStream({ ok: true, status: "initiated" }));
      try {
        dispatch(setAnimeStream({ ok: true, status: "loading" }));
        const anime = await anikiiApi<[{result:AnimeProps}, number]>(`/anime/${id}/stream`);
        const datas: AnimeProps = anime.data[0].result
        dispatch(
          setAnimeStream({ ok: true, data: datas, status: "done" })
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setAnimeStream({ ok: false, status: "error" }));
      }
    },
    [dispatch]
  );
  

  return { fetchInfo, response,fetchInfoStream,responseStream };
}

