"use client";

import { Container } from "@mui/material";
import AnimeCard from "../AnimeCard/AnimeCard";
import AnimeCardSkeleton from "../AnimeCard/AnimeCardSkeleton";
import { ReleasesType } from "@/lib/types/anime/__releases";

type Props = {
  animes: ReleasesType[];
};

export default function AnimeList({ animes }: Props) {
  return (
    <Container className="!w-full !px-0 !py-3  !shadow-none !flex !gap-2 !overflow-x-auto !snap-x !snap-mandatory">
      {animes &&
        animes.map((anime, index) => (
          <AnimeCard
            key={index}
            anime={anime}
            sx={{
              cardProps: {
                className: "!shrink-0 !w-40 !snap-center",
              },
            }}
          />
        ))}
    </Container>
  );
}

export function AnimeListSkeleton() {
  return (
    <Container className="!w-full !px-0 !py-3 !shadow-none flex gap-2 overflow-x-hidden">
      <AnimeCardSkeleton
        sx={{
          cardProps: {
            className: "!shrink-0 !min-w-40",
          },
        }}
      />
      <AnimeCardSkeleton
        sx={{
          cardProps: {
            className: "!shrink-0 !min-w-40",
          },
        }}
      />
      <AnimeCardSkeleton
        sx={{
          cardProps: {
            className: "!shrink-0 !min-w-40",
          },
        }}
      />
      <AnimeCardSkeleton
        sx={{
          cardProps: {
            className: "!shrink-0 !min-w-40",
          },
        }}
      />
      <AnimeCardSkeleton
        sx={{
          cardProps: {
            className: "!shrink-0 !min-w-40",
          },
        }}
      />
      <AnimeCardSkeleton
        sx={{
          cardProps: {
            className: "!shrink-0 !min-w-40",
          },
        }}
      />
    </Container>
  );
}
