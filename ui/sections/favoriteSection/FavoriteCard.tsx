"use client";
import { MiniAnimeInfo } from "@/lib/types/anime/__releases";
import Image from "@/ui/components/Image/Image";
import useTracker from "@/ui/hooks/useTracker";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiHeart } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";

const FavoriteCard: React.FC<MiniAnimeInfo> = ({ coverImage, id, title }) => {
  const [isFavorited, setIsFavorited] = useState(true);
  const { trackable, handleRemoveFromFavorite, handleAddToFavorite } =
    useTracker();
  const router = useRouter();

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

  const handleCardClick = () => {
    router.push(`/anime/${id}`);
  };

  return (
    <Card
      className="!w-full !bg-base-white dark:!bg-base-black !grid grid-cols-[3fr_10fr] !items-stretch !cursor-pointer"
      onClick={handleCardClick}
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
        <Button
          variant="contained"
          startIcon={isFavorited ? <BsFillHeartFill /> : <BiHeart />}
          onClick={handleFavoriteToggle}
          color="primary"
        >
          {isFavorited ? "Remove from favorite" : "Add to favorite"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FavoriteCard;
