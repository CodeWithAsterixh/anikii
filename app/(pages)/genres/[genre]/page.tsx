"use client";

import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import Pagination from "@/ui/components/pagination/Pagination";
import useGenre from "@/ui/hooks/useGenreHook";
import GenreLister from "@/ui/sections/genresSection/GenreLister";
import GenresSectionList from "@/ui/sections/genresSection/GenresSectionList";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type Props = object;

export default function Genres_GENRE({}: Props) {
  const { responseGL, fetchGenresSpecific } = useGenre();
  const {genre} = useParams()

  useEffect(() => {
    fetchGenresSpecific(1,typeof genre === "string" ? genre :Array.isArray(genre)?genre.join('-'):"");
  }, [fetchGenresSpecific, genre]);
  useEffect(() => {
    console.log(responseGL.data);
  }, [responseGL]);

  return (
    <div className="w-full h-fit pb-10">
      <GenreLister/>

      <GenresSectionList
            type="grid"
             reloader={
                  <AnimeListReloader
                    variant="grid"
                    reloader={() => {
                      fetchGenresSpecific(1,typeof genre === "string" ? genre :Array.isArray(genre)?genre.join('-'):"");
                    }}
                  />
                }
                animes={responseGL.data}
                genre={typeof genre === "string" ? genre :Array.isArray(genre)?genre.join('-'):""}
                processInfo={responseGL.status}
              />
              <Pagination
                      page={
                        responseGL.pageInfo
                          ? responseGL.pageInfo
                          : {
                              currentPage: 0,
                              lastPage: 0,
                            }
                      }
                    />
    </div>
  );
}
