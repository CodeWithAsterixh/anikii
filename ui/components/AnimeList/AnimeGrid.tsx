"use client";
import { Container } from "@mui/material";
import AnimeCard from "../AnimeCard/AnimeCard";
import AnimeCardSkeleton from "../AnimeCard/AnimeCardSkeleton";
import { ReleasesType } from "@/lib/types/anime/__releases";

type Props = {
  animes: ReleasesType[];
};

export default function AnimeGrid({ animes }: Props) {
  return (
    <Container className="!w-full !p-0 !shadow-none grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-2">
      {animes &&
        animes.map((anime, index) => <AnimeCard key={index} anime={anime} />)}
    </Container>
  );
}
export function AnimeGridSkeleton() {
  return (
    <Container className="!w-full !p-0 !shadow-none grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-2">
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
    </Container>
  );
}
