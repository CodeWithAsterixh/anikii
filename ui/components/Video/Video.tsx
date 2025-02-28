/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaStepBackward,
  FaStepForward,
  FaDownload,
} from "react-icons/fa";

interface VideoPlayerProps {
  src: string;
  name?:string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src,name }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === 0) {
      video.muted = true;
      setIsMuted(true);
    } else {
      video.muted = false;
      setIsMuted(false);
    }
  };

  // Custom progress bar click: calculate the new time based on the click position
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newTime = (clickPosition / rect.width) * duration;
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Math.max(video.currentTime - 10, 0);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration)) return;
    const newTime = Math.min(video.currentTime + 10, video.duration);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullScreen = () => {
    const videoContainer = videoRef.current?.parentElement;
    if (!videoContainer) return;
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleDownload = ()=>{
    const a = document.createElement("a")
    a.href = src.replace("live","download")
    a.download = name+".mp4"

    a.click()
  }


  return (
    <div className="relative bg-black max-w-3xl mx-auto rounded overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        className="w-full h-auto"
        width="640"
        height="360"
        controls={false}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 p-4">
        {/* Main Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={togglePlay} className="text-white text-2xl hover:text-gray-300">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={skipBackward} className="text-white text-xl hover:text-gray-300">
              <FaStepBackward />
            </button>
            <button onClick={skipForward} className="text-white text-xl hover:text-gray-300">
              <FaStepForward />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={handleDownload} className="text-white text-xl hover:text-gray-300">
              <FaDownload />
            </button>
            <button onClick={toggleFullScreen} className="text-white text-xl hover:text-gray-300">
              <FaExpand />
            </button>
          </div>
        </div>

        {/* Secondary Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button onClick={toggleMute} className="text-white text-xl hover:text-gray-300">
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
          </div>

          <div className="text-white text-sm">
            {isNaN(duration) || !isFinite(duration)
              ? "Live"
              : `${formatTime(currentTime)} / ${formatTime(duration)}`}
          </div>
        </div>

        {/* Custom Progress Bar with Skip Feature */}
        {duration && isFinite(duration) && (
          <div
            className="w-full mt-2 h-2 bg-gray-700 rounded cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <div
              className="h-full bg-red-500 rounded"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
