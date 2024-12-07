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

export default function AnimeList({ animes }: Props) {
  return (
    <Container className="!w-full !px-0 !py-3 !shadow-none flex gap-2 overflow-x-auto">
      {animes &&
        animes.map((anime, index) => (
          <AnimeCard
            key={index}
            {...anime}
            sx={{
              cardProps: {
                className: "!shrink-0 !w-40",
              },
            }}
          />
        ))}
    </Container>
  );
}

export function AnimeListSkeleton() {
  return (
    <Container className="!w-full !px-0 !py-3 !shadow-none flex gap-2 overflow-x-auto">
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
