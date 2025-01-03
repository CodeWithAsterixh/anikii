import { anikiiApi } from "@/lib/mods/requests/axios";
import { AnimeData, AnimeInfo, CharacterData } from "@/lib/types/anime/__animeDetails";
import { pageInfo, responseStatus, setAnimeDetails, setAnimeStreamMain, setAnimeStreamProccess } from "@/store/reducers/listReducer";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAnimeInfos() {
  const response = useSelector((s: RootState) => s.AnimeDetails);
  const responseStream = useSelector((s: RootState) => s.AnimeStream);
  const [characters, setCharacters] = useState<{ ok: boolean, status: responseStatus, data?: CharacterData[], pageInfo?: pageInfo }>()
  const dispatch = useDispatch<AppDispatch>();
  const defaultData = useMemo(() => ({
    data: {
      episodes: 0,
      streamingEpisodes: [],
      externalLinks: []
    },
    streamingEpisodesDub: [],
    streamingEpisodesSub: []
  }), []);
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
      dispatch(setAnimeStreamProccess({ ok: true, status: "initiated",data:defaultData }));
      try {
        dispatch(setAnimeStreamProccess({ ok: true, status: "loading",data:defaultData }));
        const animeMain = await anikiiApi<AnimeData>(`/anime/${id}/stream`);
        
        const datas:AnimeData = animeMain.data
        dispatch(setAnimeStreamProccess({ ok: true, status: "done",data:defaultData}));
        dispatch(
          setAnimeStreamMain(datas)
        );
        
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
        dispatch(setAnimeStreamProccess({ ok: false, status: "error",data:defaultData}));
      }
    },
    [defaultData, dispatch]
  );
  



  const fetchInfoCasts = useCallback(
    async (id:number,page=1) => {
      setCharacters({ ok: true, status: "initiated" })
      try {
        setCharacters({ ok: true, status: "loading" })
        const anime = await anikiiApi<[{result:{pageInfo:pageInfo,characters:CharacterData[]}}, number]>(`/anime/${id}/characters?page=${page}`);
        const datas: CharacterData[] = anime.data[0].result.characters
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

