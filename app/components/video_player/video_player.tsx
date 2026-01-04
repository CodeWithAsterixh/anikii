export function VideoPlayer({ src }: { src: string }) {
  if (!src) {
    return (
      <div className="aspect-video w-full bg-base-300 rounded-box flex items-center justify-center text-opacity-50">
        No video source selected
      </div>
    );
  }

  return (
    <div className="aspect-video w-full bg-black rounded-box overflow-hidden shadow-2xl">
      <iframe
        src={src}
        className="w-full h-full"
        allowFullScreen
        scrolling="no"
        frameBorder="0"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}
