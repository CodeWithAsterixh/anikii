import { Link } from "react-router";
import { Play } from "lucide-react";

export function EpisodeList({ 
  anime_id, 
  total_episodes, 
  current_ep 
}: { 
  anime_id: number; 
  total_episodes: number;
  current_ep?: number;
}) {
  // Guard against invalid or missing episodes
  if (!total_episodes || total_episodes <= 0) {
    return (
      <div className="bg-base-200/50 rounded-box p-8 text-center border border-dashed border-base-300">
        <p className="opacity-50 text-sm">No episodes available yet.</p>
      </div>
    );
  }

  // Cap the number of episodes to prevent memory issues with massive lists (unlikely but safe)
  const safe_total = Math.min(total_episodes, 2000);
  const episodes = Array.from({ length: safe_total }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3">
      {episodes.map((ep) => (
        <Link
          key={ep}
          to={`/anime/${anime_id}/watch/${ep}`}
          className={`
            aspect-square flex flex-col items-center justify-center rounded-lg font-bold transition-all active:scale-90
            ${current_ep === ep 
              ? 'bg-primary text-primary-content shadow-[0_0_15px_rgba(var(--color-primary),0.3)]' 
              : 'bg-base-200 hover:bg-base-300 text-base-content border border-base-300/10'}
          `}
        >
          {current_ep === ep && <Play size={10} className="mb-0.5 fill-current" />}
          <span>{ep}</span>
        </Link>
      ))}
    </div>
  );
}
