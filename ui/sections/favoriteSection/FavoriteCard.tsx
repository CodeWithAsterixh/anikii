"use client";
import { randomColors } from "@/lib/mods/functions/randomColor";
import { MiniAnimeInfo } from "@/lib/types/anime/__releases";
import Image from "@/ui/components/Image/Image";
import useTracker from "@/ui/hooks/useTracker";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { BiHeart } from "react-icons/bi";
import { BsFillHeartFill, BsPlayCircleFill } from "react-icons/bs";

const FavoriteCard: React.FC<MiniAnimeInfo> = ({ coverImage, id, title }) => {
  const [isFavorited, setIsFavorited] = useState(true);
  const { trackable, handleRemoveFromFavorite, handleAddToFavorite } =
    useTracker();
  const colorsFull = randomColors({ length:1, shade: 50 });

  const handleFavoriteToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const findId: boolean = trackable.favorite.find((f) => f.id === id) !== undefined;
    if (!findId) {
      handleAddToFavorite({ coverImage, id, title });
      setIsFavorited(true);
    } else {
      handleRemoveFromFavorite(id);
      setIsFavorited(false);
    }
    // Add logic to handle unfavorite action
  };


  return (
    <Card
      className="!w-full !bg-base-white dark:!bg-base-black !grid grid-cols-[3fr_10fr] !items-stretch !cursor-pointer"
      
    >
      <Image
        src={coverImage?.medium}
        alt={title?.english || title?.romaji}
        className="w-32 aspect-square"
      />
      <CardContent className="!flex !flex-col !gap-1 !p-2 !items-start">
        <Typography variant="h6" className="!text-black dark:!text-white">
          {title?.romaji}
        </Typography>
        <Typography
          variant="subtitle1"
          className="!text-black dark:!text-white"
        >
          {title?.english}
        </Typography>
        <div className="w-full flex gap-2">
        <Button
          variant="contained"
          startIcon={isFavorited ? <BsFillHeartFill /> : <BiHeart />}
          onClick={handleFavoriteToggle}
          color="primary"
          className="!bg-red-400"
          
        >
          {isFavorited ? "Remove" : "Add to favorite"}
        </Button>
        <Link
          href={`/anime/${id}`}
          className="w-fit p-2 flex items-center gap-2 border-2 isolate relative rounded-md overflow-hidden text-black dark:text-white"
          style={{
            borderColor:colorsFull[0]
          }}
        >
          <span className="size-full absolute inset-0 brightness-50 -z-10" style={{
            backgroundColor:colorsFull[0]
          }}/>
          <BsPlayCircleFill/>
          Play
        </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteCard;
