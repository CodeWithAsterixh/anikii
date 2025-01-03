"use client";

import React, { useEffect } from "react";
import useTracker from "../../hooks/useTracker";
import FavoriteCard from "./FavoriteCard";

type Props = object;

export default function FavoriteModal({}: Props) {
  const { trackable } = useTracker();
  const { favorite } = trackable;

  useEffect(() => {
    console.log(favorite);
  }, [favorite, trackable]);

  return (
    <div className="size-full bg-fade-white dark:bg-fade-black p-2">
      {favorite &&
        favorite.map((anime) => <FavoriteCard key={anime.id} {...anime} />)}
    </div>
  );
}
