"use client";
import { Container } from "@mui/material";
import AnimeCard from "../AnimeCard/AnimeCard";
import AnimeCardSkeleton from "../AnimeCard/AnimeCardSkeleton";

type Props = {
  animes: {
    image?: string;
    title?: string;
    extra?: string;
    id?: string;
  }[];
};

export default function AnimeGrid({ animes }: Props) {
  return (
    <Container className="!w-full !p-0 !shadow-none grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] min-[498px]:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-2">
      {animes &&
        animes.map((anime, index) => <AnimeCard key={index} {...anime} />)}
    </Container>
  );
}
export function AnimeGridSkeleton() {
  return (
    <Container className="!w-full !p-0 !shadow-none grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] min-[498px]:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-2">
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
      <AnimeCardSkeleton />
    </Container>
  );
}
