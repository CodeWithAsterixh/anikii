import { anikiiApi } from "@/lib/mods/requests/axios";
import {
  AnimeData,
  AnimeInfo,
  CharacterData,
  StreamingEpisode,
} from "@/lib/types/anime/__animeDetails";
import { ReleasesType } from "@/lib/types/anime/__releases";
import {
  addAnimeStreamDub,
  addAnimeStreamSub,
  pageInfo,
  setAnimeDetails,
  setAnimeStreamMain,
  setAnimeStreamProccess,
  setCharacters,
  setRecommendations,
} from "@/store/reducers/listReducer";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAnimeInfos() {
  const response = useSelector((s: RootState) => s.AnimeDetails);
  const responseStream = useSelector((s: RootState) => s.AnimeStream);
  const characters = useSelector((s: RootState) => s.castsInfo);
  const recommendationsInfo = useSelector(
    (s: RootState) => s.recommendationsInfo
  );
  const dispatch = useDispatch<AppDispatch>();
  const defaultData = useMemo(
    () => ({
      data: {
        episodes: 0,
        streamingEpisodes: [],
        externalLinks: [],
      },
      streamingEpisodesDub: [],
      streamingEpisodesSub: [],
    }),
    []
  );
  const fetchInfo = useCallback(
    async (id: number) => {
      dispatch(setAnimeDetails({ ok: true, status: "initiated" }));
      try {
        dispatch(setAnimeDetails({ ok: true, status: "loading" }));
        const anime = await anikiiApi<[{ result: AnimeInfo }, number]>(
          `/anime/${id}`
        );
        const datas: AnimeInfo = anime.data[0].result;
        dispatch(setAnimeDetails({ ok: true, data: datas, status: "done" }));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setAnimeDetails({ ok: false, status: "error" }));
      }
    },
    [dispatch]
  );
  const fetchInfoStream = useCallback(
    async (id: number) => {
      dispatch(
        setAnimeStreamProccess({
          ok: true,
          status: "initiated",
          data: defaultData,
        })
      );
      try {
        dispatch(
          setAnimeStreamProccess({
            ok: true,
            status: "loading",
            data: defaultData,
          })
        );
        const animeMain = await anikiiApi<AnimeData>(`/anime/${id}/stream`);

        const datas: AnimeData = animeMain.data;
        dispatch(
          setAnimeStreamProccess({
            ok: true,
            status: "done",
            data: defaultData,
          })
        );
        dispatch(setAnimeStreamMain(datas));

        // let ep = 1;

        // load sub and dub
        // const loadThem = setInterval(async () => {
        //   if(ep === datas.episodes+1){
        //     clearInterval(loadThem)
        //   }else{
        //     const animeSub = await anikiiApi<[{result:StreamingEpisode}, number]>(`/anime/${id}/stream/${ep}`);
        //     if(animeSub.data[0].result.error){
        //       clearInterval(loadThem)
        //       return
        //     }
        //     dispatch(addAnimeStreamSub(animeSub.data[0].result))
        //     const animeDub = await anikiiApi<[{result:StreamingEpisode}, number]>(`/anime/${id}/stream/${ep}/dub`);
        //     if(animeDub.data[0].result.error){
        //       clearInterval(loadThem)
        //       return
        //     }
        //     dispatch(addAnimeStreamDub(animeDub.data[0].result))
        //   }
        //   ep++

        // }, 10000);

        // return () => {
        //   clearInterval(loadThem)
        // }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(
          setAnimeStreamProccess({
            ok: false,
            status: "error",
            data: defaultData,
          })
        );
      }
    },
    [defaultData, dispatch]
  );
  const fetchInfoStreamEp = useCallback(
    async (id: number, ep: number, isDub=false) => {
      dispatch(
        setAnimeStreamProccess({
          ok: true,
          status: "initiated",
          data: defaultData,
        })
      );
      try {
        dispatch(
          setAnimeStreamProccess({
            ok: true,
            status: "loading",
            data: defaultData,
          })
        );
        const anime = await anikiiApi<[{ result: StreamingEpisode }, number]>(
          `/anime/${id}/stream/${ep}${isDub ? "/dub" : ""}`
        );

        if (isDub) {
          dispatch(addAnimeStreamDub(anime.data[0].result));
        } else {
          dispatch(addAnimeStreamSub(anime.data[0].result));
        }
        console.log(anime.data[0].result)


        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(
          setAnimeStreamProccess({
            ok: false,
            status: "error",
            data: defaultData,
          })
        );
      }
    },
    [defaultData, dispatch]
  );

  const fetchInfoCasts = useCallback(
    async (id: number, page = 1) => {
      dispatch(setCharacters({ ok: true, status: "initiated", data: [] }));
      try {
        dispatch(setCharacters({ ok: true, status: "loading", data: [] }));
        const anime = await anikiiApi<
          [
            { result: { pageInfo: pageInfo; characters: CharacterData[] } },
            number
          ]
        >(`/anime/${id}/characters?page=${page}`);
        const datas: CharacterData[] = anime.data[0].result.characters;
        const pageInfo = anime.data[0].result.pageInfo;
        dispatch(
          setCharacters({ ok: true, data: datas, status: "done", pageInfo })
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setCharacters({ ok: false, status: "error", data: [] }));
      }
    },
    [dispatch]
  );
  const fetchRecommendations = useCallback(
    async (id: number, page = 1) => {
      dispatch(setRecommendations({ ok: true, status: "initiated", data: [] }));
      try {
        dispatch(setRecommendations({ ok: true, status: "loading", data: [] }));
        const anime = await anikiiApi<
          [
            {pageInfo: pageInfo; recommendations: ReleasesType[] },
            number
          ]
        >(`/anime/${id}/recommended?page=${page}`);
        console.log(anime)
        const datas: ReleasesType[] = anime.data[0].recommendations;
        const pageInfo = anime.data[0].pageInfo;
        dispatch(
          setRecommendations({
            ok: true,
            data: datas,
            status: "done",
            pageInfo,
          })
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(setRecommendations({ ok: false, status: "error", data: [] }));
      }
    },
    [dispatch]
  );

  return {
    fetchInfo,
    response,
    fetchInfoStream,
    responseStream,
    fetchInfoCasts,
    characters,
    fetchRecommendations,
    recommendationsInfo,
    fetchInfoStreamEp
  };
}
