"use client";

import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import { AnimeListSkeleton } from "@/ui/components/AnimeList/AnimeList";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import useGenre from "@/ui/hooks/useGenreHook";
import GenreLister from "@/ui/sections/genresSection/GenreLister";
import GenresSectionList from "@/ui/sections/genresSection/GenresSectionList";
import { useEffect } from "react";

type Props = object;

export default function Genres({}: Props) {
  const { response, fetchGenres } = useGenre();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);
  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <div className="w-full h-fit">
      <GenreLister/>
      <AnimeGrouper
        header={{
          error:
            response.status === "error"
              ? "Some error occurred, please reload"
              : undefined,
          loaded: response.status === "done" ? `genres Anime List` : undefined,
          loading:
            response.status === "loading"
              ? `Loading genres anime list...`
              : undefined,
        }}
        sxClasses={{
          containerClass:"!px-0",
        }}
      >
        {response.status === "done" ? (
          response.data ? (
            response.data.map((i, ind) => (
              <GenresSectionList
                key={ind}
                reloader={
                  <AnimeListReloader
                    variant="scroll"
                    reloader={() => {
                      fetchGenres();
                    }}
                  />
                }
                animes={i.data}
                genre={i.genre}
                processInfo={response.status}
              />
            ))
          ) : (
            <AnimeListReloader
              variant="scroll"
              reloader={() => {
                fetchGenres();
              }}
            />
          )
        ) : response.status === "error" ? (
          <AnimeListReloader
            variant="scroll"
            reloader={() => {
              fetchGenres();
            }}
          >
          </AnimeListReloader>
        ) : (
          <AnimeListSkeleton />
        )}
      </AnimeGrouper>
    </div>
  );
}
