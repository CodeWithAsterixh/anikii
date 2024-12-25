import { anikiiApi } from "@/lib/mods/requests/axios";
import { AnimeInfo, AnimeProps, CharacterData } from "@/lib/types/anime/__animeDetails";
import { pageInfo, responseStatus, setAnimeDetails, setAnimeStream } from "@/store/reducers/listReducer";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAnimeInfos() {
  const response = useSelector((s: RootState) => s.AnimeDetails);
  const responseStream = useSelector((s: RootState) => s.AnimeStream);
  const [characters, setCharacters] = useState<{ ok: boolean, status: responseStatus, data?: CharacterData, pageInfo?: pageInfo }>()
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
  const fetchInfoCasts = useCallback(
    async (id:number,page=1) => {
      setCharacters({ ok: true, status: "initiated" })
      try {
        setCharacters({ ok: true, status: "loading" })
        const anime = await anikiiApi<[{result:{pageInfo:pageInfo,characters:CharacterData}}, number]>(`/anime/${id}/characters?page=${page}`);
        const datas: CharacterData = anime.data[0].result.characters
        const pageInfo = anime.data[0].result.pageInfo
        setCharacters({ ok: true, data: datas, status: "done",pageInfo })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setCharacters({ ok: false, status: "error" })
      }
    },
    []
  );
  

  return { fetchInfo, response,fetchInfoStream,responseStream,fetchInfoCasts,characters };
}

