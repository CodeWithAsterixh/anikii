"use client";

import { anikiiApi } from "@/lib/mods/requests/axios";
import { addItem, setStatus } from "@/store/reducers/animeListReducer";
import { AppDispatch, RootState } from "@/store/store";
import AnimeCard from "@/ui/components/AnimeCard/AnimeCard";
import ENDOFLINE from "@/ui/components/ENDOFLINE";
import GenreList from "@/ui/components/GenreList/GenreList";
import Loader from "@/ui/components/Loader/Loader";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";


type Props = object;

export default function Home({}: Props) {
  const genreList = useSelector((s:RootState)=>s.GenreList)
  const genreListAnime = useSelector((s:RootState)=>s.GenreListAnime)
  const dispatch = useDispatch<AppDispatch>()

  const fetchGenre = useCallback(
    async (genre:string)=>{
      try {
        const res = await anikiiApi(`/genres/${genre}`);
        const resData = res.data;
        dispatch(addItem({genre,items:resData.data}))
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch],
  )
  

  useEffect(() => {
    if(genreList.length > 0 && genreListAnime.data.length <=0){
      dispatch(setStatus("loading"))
      genreList.map(({genre},i)=>{
        fetchGenre(genre)
        if(i == genreList.length-1){
          dispatch(setStatus("done"))
        }
      })
    }
  }, [dispatch, fetchGenre, genreList, genreListAnime.data.length])

  useEffect(() => {
    const GLAlEN = genreListAnime.data.length
    const GlEN = genreList.length
    if(GLAlEN !==GlEN ){
      dispatch(setStatus("loading"))
    }else{
      dispatch(setStatus("done"))
    }
  }, [dispatch, genreList.length, genreListAnime.data.length])
  


  
  

  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <GenreList className="!scroll-px-2 !px-2 !rounded-none sticky top-16 shadow-md shadow-accent/20 py-2 z-10 bg-accent"/>
      {
        genreListAnime.data.map(({genre,items},i)=>(
          <section key={i} className="w-full flex flex-col gap-2">
            <div className="w-full px-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-tertiary">{genre}</h2>
            <Link href={`/categories/${genre}`} className="text-sm text-tertiary/40 flex items-center justify-center gap-1">see all <BiArrowToRight className="text-base"/></Link>
            </div>
            <div className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-px-2 px-2 gap-2 py-4">
              {
                items.map((anime)=>(<AnimeCard sx={{
                  cardProps:{
                    className:"!shrink-0 !w-52 !snap-start"
                  }
                }} key={anime.id} anime={anime} />))
              }
            </div>
          </section>
        ))
      }
      {
        (genreListAnime.status!=="done"||genreList.length<=0)?<div className="w-full flex items-center justify-center *:scale-75">
          <Loader/>
        </div>:<ENDOFLINE text="That's all for now" className="my-5 text-sm font-normal"/>
      }
    </div>
  );
}
