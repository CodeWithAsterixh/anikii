import { useState } from "react";
import { AlertTriangle, Play } from "lucide-react";

export function VideoPlayer({ src }: { src: string }) {
  const [error, set_error] = useState(false);

  if (!src) {
    return (
      <div className="aspect-video w-full bg-base-300 rounded-box flex flex-col items-center justify-center text-opacity-40 border-2 border-dashed border-base-content/10">
        <Play size={48} className="mb-4" />
        <p className="font-semibold">No video source selected</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aspect-video w-full bg-error/10 rounded-box flex flex-col items-center justify-center text-error border border-error/20">
        <AlertTriangle size={48} className="mb-4" />
        <p className="font-bold">Failed to load video</p>
        <p className="text-sm opacity-70">This source might be unavailable.</p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full bg-black rounded-box overflow-hidden shadow-2xl relative">
      <iframe
        src={src}
        className="w-full h-full"
        allowFullScreen
        scrolling="no"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        title="Anime Stream"
        onError={() => set_error(true)}
      />
    </div>
  );
}
