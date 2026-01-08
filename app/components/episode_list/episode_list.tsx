import { Link } from "react-router";
import { Play } from "lucide-react";
import { useState, useMemo } from "react";

export function EpisodeList({ 
  anime_id, 
  total_episodes, 
  current_ep 
}: Readonly<{ 
  anime_id: number; 
  total_episodes: number;
  current_ep?: number;
}>) {
  const EPISODES_PER_RANGE = 50;

  // Determine initial range based on current episode
  const initialRangeIndex = current_ep 
    ? Math.floor((current_ep - 1) / EPISODES_PER_RANGE) 
    : 0;

  const [activeRangeIndex, setActiveRangeIndex] = useState(initialRangeIndex);

  // Cap total episodes safely
  const safe_total = Math.max(0, Math.min(total_episodes || 0, 5000));
  
  // Calculate ranges
  const ranges = useMemo(() => {
    if (safe_total <= 0) return [];
    const r = [];
    for (let i = 0; i < safe_total; i += EPISODES_PER_RANGE) {
      const start = i + 1;
      const end = Math.min(i + EPISODES_PER_RANGE, safe_total);
      r.push({ start, end });
    }
    return r;
  }, [safe_total]);

  // Guard against invalid or missing episodes
  if (!total_episodes || total_episodes <= 0) {
    return (
      <div className="bg-base-200/50 rounded-box p-8 text-center border border-dashed border-base-300">
        <p className="opacity-50 text-sm">No episodes available yet.</p>
      </div>
    );
  }

  // Ensure activeRangeIndex is valid if total_episodes changes
  const validRangeIndex = Math.min(activeRangeIndex, ranges.length - 1);
  const currentRange = ranges[validRangeIndex] || ranges[0];

  const episodes = Array.from(
    { length: currentRange.end - currentRange.start + 1 }, 
    (_, i) => currentRange.start + i
  );

  return (
    <div className="space-y-6">
      {/* Range Tabs */}
      {ranges.length > 1 && (
        <div className="flex flex-wrap gap-2 pb-2 border-b border-base-200">
          {ranges.map((range, index) => (
            <button
              key={`${range.start}-${range.end}`}
              onClick={() => setActiveRangeIndex(index)}
              className={`
                px-4 py-2 rounded-full text-xs font-bold transition-all
                ${validRangeIndex === index 
                  ? 'bg-primary text-primary-content shadow-sm' 
                  : 'bg-base-200 hover:bg-base-300 text-base-content/70'}
              `}
            >
              {range.start} - {range.end}
            </button>
          ))}
        </div>
      )}

      {/* Episode Grid */}
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
    </div>
  );
}
