"use client";

import RecommendationsSection from "@/ui/sections/RecommendationsSection";
import StreamingSection from "@/ui/sections/StreamingSection";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function AnimeTitle() {
  const query = useSearchParams();

  const anime_episode = query.get("anime_episode");

  const [played, setPlayed] = useState<string | null>(null);

  useEffect(() => {
    if (anime_episode) {
      const splitEp = anime_episode.split("-episode-");
      setPlayed(splitEp[splitEp.length - 1]);
    }
  }, [anime_episode]);

  return (
    <div className="w-full h-fit">
      <StreamingSection
        anime_episode={anime_episode}
        played={played ? played : undefined}
      />
      <RecommendationsSection anime_episode={anime_episode} />
    </div>
  );
}

export default AnimeTitle;
