import { useEffect, useRef, useState, useMemo } from "react";
import { AlertTriangle, Play } from "lucide-react";

declare global {
  interface Window {
    Hls: any;
  }
}

export function VideoPlayer({ src }: { src: string }) {
  const [error, set_error] = useState(false);
  const [loading, set_loading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const is_safe_url = useMemo(() => {
    if (!src) return false;
    try {
      const url = new URL(src, window.location.origin);
      return ["http:", "https:"].includes(url.protocol);
    } catch {
      return false;
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!src || !is_safe_url) return;

    set_error(false);
    set_loading(true);

    const is_hls = src.toLowerCase().includes(".m3u8");

    if (is_hls && video) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      } else if (window.Hls && window.Hls.isSupported()) {
        const hls = new window.Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(window.Hls.Events.ERROR, (_event: any, data: any) => {
          if (data.fatal) {
            set_error(true);
            set_loading(false);
          }
        });
        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          set_loading(false);
        });
        return () => hls.destroy();
      } else {
        set_error(true);
        set_loading(false);
      }
    } else if (video) {
      video.src = src;
    } else {
      // If no video ref yet (e.g. iframe mode), we still need to clear loading
      const timer = setTimeout(() => set_loading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [src]);

  const handle_error = () => {
    set_error(true);
    set_loading(false);
  };

  const handle_load = () => {
    set_loading(false);
  };

  return (
    <div className="aspect-video w-full bg-black rounded-box overflow-hidden shadow-2xl relative group">
      {!src && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-opacity-40 bg-base-300 border-2 border-dashed border-base-content/10">
          <Play size={48} className="mb-4" />
          <p className="font-semibold text-base-content">No video source selected</p>
        </div>
      )}

      {src && !is_safe_url && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-base-300 text-error p-6 text-center">
          <AlertTriangle size={48} className="mb-4" />
          <p className="font-bold text-lg">Security Warning</p>
          <p className="text-sm opacity-80 mt-2">The video source URL is invalid or unsafe.</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-base-300 text-error p-6 text-center">
          <AlertTriangle size={48} className="mb-4" />
          <p className="font-bold text-lg">Source Issue Detected</p>
          <div className="max-w-xs space-y-2 mt-2 mb-6">
            <p className="text-sm opacity-80">The current server is having trouble loading assets (thumbnails/subtitles) or is blocked by your browser.</p>
            <p className="text-xs font-semibold bg-error/10 py-1 px-2 rounded">Fix: Please try switching to another server below.</p>
          </div>
          <p className="text-xs opacity-50 italic">HD-1 and HD-2 are recommended for best compatibility.</p>
        </div>
      )}

      {loading && !error && src && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-xs font-bold tracking-widest text-white/50 uppercase">Initializing Stream</p>
        </div>
      )}

      {src && is_safe_url && (
        <div className={`w-full h-full ${error ? "hidden" : "block"}`}>
          {(() => {
            const is_direct_video = 
              src.includes("/download") || 
              src.includes("/download-direct") || 
              src.includes("/live") || 
              src.toLowerCase().includes(".mp4") || 
              src.toLowerCase().includes(".m3u8");

            return is_direct_video ? (
              <video 
                ref={videoRef}
                controls 
                className="w-full h-full"
                onError={handle_error}
                onLoadedData={handle_load}
                autoPlay
                controlsList="nodownload"
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
                allow="autoplay; encrypted-media; picture-in-picture"
                title="Anime Stream"
                onError={handle_error}
                onLoad={handle_load}
                sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
              />
            );
          })()}
        </div>
      )}
    </div>
  );
}
