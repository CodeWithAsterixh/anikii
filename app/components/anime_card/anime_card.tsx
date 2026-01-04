import { Link } from "react-router";
import type { IAnime } from "../../types";

export function AnimeCard({ anime }: { anime: IAnime }) {
  if (!anime) return null;

  // Defensive title extraction
  const title = typeof anime.title === 'string' 
    ? anime.title 
    : (anime.title?.english || anime.title?.romaji || anime.title?.native || "Unknown Title");
  
  // Safe image fallbacks
  const image_src = anime.coverImage?.cover_image || "/placeholder-anime.png";
  
  return (
    <Link 
      to={`/anime/${anime.id}`} 
      className="group block relative overflow-hidden rounded-box bg-base-200 aspect-[3/4] transition-transform hover:scale-105 border border-base-300/10"
    >
      <img 
        src={image_src} 
        alt={title}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder-anime.png";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 p-3 w-full bg-gradient-to-t from-base-100/90 to-transparent">
        <h3 className="text-sm font-semibold line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-xs opacity-70 mt-1">
          {anime.format || "TV"} • {anime.episodes || "?"} eps
        </p>
      </div>
    </Link>
  );
}
