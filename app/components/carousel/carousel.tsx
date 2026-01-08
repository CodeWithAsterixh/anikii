import { Link } from "react-router";
import type { IAnime } from "../../types";

export function Carousel({ anime_list }: Readonly<{ anime_list: IAnime[] }>) {
  // Graceful handling of empty or missing list
  if (!Array.isArray(anime_list) || anime_list.length === 0) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-box bg-base-200 flex items-center justify-center opacity-50 mb-10">
        <p>No featured content available</p>
      </div>
    );
  }
  
  const hero = anime_list[0];
  if (!hero) return null;

  const title = typeof hero.title === 'string' 
    ? hero.title 
    : (hero.title?.english || hero.title?.romaji || hero.title?.native || "Unknown Title");

  const image_src = hero.coverImage?.bannerImage || hero.coverImage?.cover_image || "/placeholder-banner.png";

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-box overflow-hidden mb-10 group border border-base-300/10 shadow-lg">
      <img 
        src={image_src} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder-banner.png";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3">
        <span className="bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
          FEATURED
        </span>
        <h1 className="text-3xl md:text-5xl font-black mb-4 line-clamp-2 drop-shadow-lg">
          {title}
        </h1>
        <Link 
          to={`/anime/${hero.id}`}
          className="bg-primary hover:bg-primary/90 text-primary-content px-8 py-3 rounded-full font-bold inline-block transition-all hover:shadow-[0_0_20px_rgba(var(--color-primary),0.5)] active:scale-95"
        >
          Watch Now
        </Link>
      </div>
    </div>
  );
}
