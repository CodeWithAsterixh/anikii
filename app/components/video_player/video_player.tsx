import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Play } from "lucide-react";

declare global {
  interface Window {
    Hls: any;
  }
}

export function VideoPlayer({ src }: { src: string }) {
  const [error, set_error] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    set_error(false);

    const is_hls = src.toLowerCase().includes(".m3u8");

    if (is_hls) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = src;
      } else if (window.Hls && window.Hls.isSupported()) {
        // hls.js support
        const hls = new window.Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(window.Hls.Events.ERROR, (_event: any, data: any) => {
          if (data.fatal) {
            set_error(true);
          }
        });
        return () => hls.destroy();
      } else {
        // No HLS support
        set_error(true);
      }
    } else {
      // Direct MP4 or other
      video.src = src;
    }
  }, [src]);

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

  // Detect if source is a direct video link or needs an iframe
  // Proxied links from Anikii backend usually contain "/stream/ep/" and "/download", "/download-direct" or "/live"
  const is_direct_video = 
    src.includes("/download") || 
    src.includes("/download-direct") || 
    src.includes("/live") || 
    src.toLowerCase().endsWith(".mp4") || 
    src.toLowerCase().endsWith(".m3u8") ||
    src.toLowerCase().includes(".mp4?") ||
    src.toLowerCase().includes(".m3u8?");

  return (
    <div className="aspect-video w-full bg-black rounded-box overflow-hidden shadow-2xl relative">
      {is_direct_video ? (
        <video 
          ref={videoRef}
          controls 
          className="w-full h-full"
          onError={() => set_error(true)}
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      ) : (
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
      )}
    </div>
  );
}
