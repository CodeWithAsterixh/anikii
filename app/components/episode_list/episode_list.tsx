import { Link } from "react-router";

export function EpisodeList({ 
  anime_id, 
  total_episodes, 
  current_ep 
}: { 
  anime_id: number; 
  total_episodes: number;
  current_ep?: number;
}) {
  const episodes = Array.from({ length: total_episodes }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
      {episodes.map((ep) => (
        <Link
          key={ep}
          to={`/anime/${anime_id}/watch/${ep}`}
          className={`
            aspect-square flex items-center justify-center rounded-md font-bold transition-colors
            ${current_ep === ep 
              ? 'bg-primary text-primary-content' 
              : 'bg-base-200 hover:bg-base-300 text-base-content'}
          `}
        >
          {ep}
        </Link>
      ))}
    </div>
  );
}
