import { Link } from "react-router";
import type { IAnime } from "../../types";

export function Carousel({ anime_list }: { anime_list: IAnime[] }) {
  if (!anime_list.length) return null;
  
  const hero = anime_list[0];
  const title = typeof hero.title === 'string' ? hero.title : hero.title.english || hero.title.romaji;

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-box overflow-hidden mb-10 group">
      <img 
        src={hero.coverImage.bannerImage || hero.coverImage.cover_image} 
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3">
        <span className="bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
          FEATURED
        </span>
        <h1 className="text-3xl md:text-5xl font-black mb-4 line-clamp-2">
          {title}
        </h1>
        <Link 
          to={`/anime/${hero.id}`}
          className="bg-primary hover:bg-primary/90 text-primary-content px-8 py-3 rounded-full font-bold inline-block transition-colors"
        >
          Watch Now
        </Link>
      </div>
    </div>
  );
}
