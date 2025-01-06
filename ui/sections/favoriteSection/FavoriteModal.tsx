"use client";

import React, { useEffect } from "react";
import useTracker from "../../hooks/useTracker";
import FavoriteCard from "./FavoriteCard";

type Props = object;

export default function FavoriteModal({}: Props) {
  const { trackable,handleUpdateFavorite } = useTracker();
  const { favorite } = trackable;

  useEffect(() => {
    handleUpdateFavorite()    
  }, [handleUpdateFavorite]);
  useEffect(() => {
    return()=>{
      if(favorite.length){ localStorage.setItem("favorite", JSON.stringify(favorite))}
     
    }
  }, [favorite]);

  return (
    <div className="size-full bg-fade-white dark:bg-fade-black p-2 flex flex-col gap-2">
      {favorite &&
        favorite.map((anime) => <FavoriteCard key={anime.id} {...anime} />)}
    </div>
  );
}
