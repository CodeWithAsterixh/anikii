"use client";
import useQuery from "@/hooks/useQuery";
import { generateContrastColors } from "@/lib/mods/functions/colorGeneratorBlender";
import { genreListItem } from "@/store/reducers/__types";
import { setGenres } from "@/store/reducers/animeListReducer";
import { AppDispatch, RootState } from "@/store/store";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GenreList({className}:{className?:string}) {
  const genres = useSelector((s: RootState) => s.GenreList);
  const genresResult = useQuery<string[]>("/genres",genres.length<=0);

  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    if (genresResult.data && genres.length === 0) {
      const colorsGenerate = generateContrastColors(
        "#fff6f1",
        genresResult.data.length
      );

      const genreListArray:genreListItem[] = []

      genresResult.data.map((genre,i)=>{
        genreListArray.push({
          genre,
          color: colorsGenerate[i],
        })
      })
      dispatch(setGenres(genreListArray))
    }
  }, [dispatch, genresResult, genres.length]);
  return (
    <div className={
      clsx("w-full snap-x snap-mandatory scroll-px-2 px-2 sm:rounded-md sm:scroll-px-0 sm:px-0 flex gap-2 overflow-x-auto max-w-[100vw]",className)
    }>
      {genres &&
        genres.map(({genre,color}, i) => (
          <Link
            href={`/categories/${genre}`}
            key={i}
            style={{
              backgroundColor: color,
            }}
            className="w-fit px-4 py-2  rounded-md flex items-center justify-center shrink-0 snap-start text-accent"
          >
            {genre}
          </Link>
        ))}
    </div>
  );
}
