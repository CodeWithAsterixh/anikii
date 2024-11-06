"use client";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowsIn,
  ArrowsOut,
  DeviceRotate,
  PauseCircle,
  PlayCircle,
  SpeakerHigh,
  SpeakerX,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import Ranger from "../Ranger/Ranger";
import { setOrientation } from "@/mods/fullscreen";

type Props = {
  content?: {
    src: string;
    isVideo?: boolean;
  };
  name?: string;
};

interface VideoConfig {
  isFull: boolean;
  muted: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  landscape: boolean;
}

function VideoPlayer({ name, content }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoPlayerRef = useRef<HTMLDivElement | null>(null);

  const [videoConfig, setVideoConfig] = useState<VideoConfig>({
    isFull: false,
    muted: false,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    landscape: false,
  });

  const [controlsShown, setControlsShown] = useState(false);

  // Helper function to toggle fullscreen mode
  const toggleFullScreen = () => {
    if (videoPlayerRef.current) {
      if (videoConfig.isFull) {
        document.exitFullscreen();
        setVideoConfig((prev) => ({ ...prev, isFull: false }));
      } else {
        videoPlayerRef.current.requestFullscreen();
        setVideoConfig((prev) => ({ ...prev, isFull: true }));
      }
    }
  };

  // Helper function to toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteStatus = !videoConfig.muted;
      videoRef.current.volume = newMuteStatus ? 0 : 1;
      setVideoConfig((prev) => ({ ...prev, muted: newMuteStatus }));
    }
  };

  // Play/Pause the video
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoConfig.isPlaying) {
        videoRef.current.pause();
        setVideoConfig((prev) => ({ ...prev, isPlaying: false }));
      } else {
        videoRef.current.play();
        setVideoConfig((prev) => ({ ...prev, isPlaying: true }));
      }
    }
  };

  // Skip forward/backward
  const skipTime = (direction: "forward" | "backward") => {
    if (videoRef.current) {
      const newTime =
        direction === "forward"
          ? videoRef.current.currentTime + 10
          : videoRef.current.currentTime - 10;
      videoRef.current.currentTime = newTime;
    }
  };

  // Convert seconds to formatted time
  const secondsToTimeFormat = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  // Toggle landscape mode
  const handleLandScapeToggle = () => {
    const newLandscape = !videoConfig.landscape;
    setOrientation(newLandscape ? "landscape" : "unlock");
    setVideoConfig((prev) => ({ ...prev, landscape: newLandscape }));
  };

  // Update video duration and current time
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      setVideoConfig((prev) => ({
        ...prev,
        duration: video.duration || 0,
      }));

      video.addEventListener("timeupdate", () => {
        setVideoConfig((prev) => ({
          ...prev,
          currentTime: video.currentTime || 0,
        }));
      });

      video.addEventListener("ended", () => {
        video.currentTime = 0;
        setVideoConfig((prev) => ({
          ...prev,
          currentTime: 0,
          isPlaying: false,
        }));
      });
    }
  }, []);

  // Load content when `content` changes
  useEffect(() => {
    if (content && videoRef.current) {
      videoRef.current.load();
    }
  }, [content]);

  // Show controls when mouse enters or video is playing
  useEffect(() => {
    if (videoPlayerRef.current) {
      const playerRef = videoPlayerRef.current;

      const handleMouseEnter = () => setControlsShown(true);
      const handleMouseLeave = () => setControlsShown(false);

      playerRef.addEventListener("mouseenter", handleMouseEnter);
      playerRef.addEventListener("mouseleave", handleMouseLeave);

      if (videoConfig.isPlaying) {
        setTimeout(() => setControlsShown(false), 3000);
      }

      return () => {
        playerRef.removeEventListener("mouseenter", handleMouseEnter);
        playerRef.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [videoConfig.isPlaying]);

  return (
    <div
      ref={videoPlayerRef}
      className="w-full p-2 h-80 max-h-[50vh] relative bg-white/50 dark:bg-black/50"
    >
      {!content ? (
        <div className="size-[calc(100%-(0.5rem*2))] m-2 rounded-lg relative z-0"></div>
      ) : (
        content.src.trim() && (
          <>
            {content.isVideo ? (
              <video
                ref={videoRef}
                className="size-[calc(100%-(0.5rem*2))] m-2 rounded-lg relative z-0"
                controls={false}
              >
                <source src={content.src} type="video/mp4" />
                your browser does not support video players
              </video>
            ) : (
              <iframe
                src={content.src}
                className={clsx("size-full block rounded-lg")}
              ></iframe>
            )}

            {/* Controls */}
            <aside
              className={clsx(
                "size-full flex flex-col duration-300 items-center justify-between overflow-hidden absolute inset-0 z-[1] rounded-lg bg-gradient-to-t from-black to-transparent",
                !controlsShown && "opacity-0"
              )}
            >
              {name && (
                <section className="w-full h-fit p-2 box-border bg-gradient-to-b from-black to-transparent">
                  <p>{name}</p>
                </section>
              )}
              <ul className="w-fit h-fit absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-2 box-border flex items-center justify-center gap-3 text-5xl cursor-pointer">
                <li onClick={() => skipTime("backward")}>
                  <ArrowCounterClockwise />
                </li>
                <li className="scale-150" onClick={togglePlay}>
                  {videoConfig.isPlaying ? (
                    <PauseCircle weight="fill" />
                  ) : (
                    <PlayCircle weight="fill" />
                  )}
                </li>
                <li onClick={() => skipTime("forward")}>
                  <ArrowClockwise />
                </li>
              </ul>
              <ul className="w-full h-fit p-2 flex items-center justify-start gap-2">
                <li>
                  <span className="w-fit flex items-center justify-start gap-2">
                    <em>{secondsToTimeFormat(videoConfig.currentTime)}</em>/
                    <em>{secondsToTimeFormat(videoConfig.duration)}</em>
                  </span>
                  <Ranger
                    value={parseInt(
                      (
                        (videoConfig.currentTime / videoConfig.duration) *
                        100
                      ).toFixed(0)
                    )}
                  />
                </li>
                <li className="flex items-center justify-center gap-2">
                  <button
                    onClick={handleLandScapeToggle}
                    className="text-2xl text-base-white"
                  >
                    {videoConfig.landscape ? (
                      <DeviceRotate />
                    ) : (
                      <DeviceRotate className="rotate-90" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="text-2xl text-base-white"
                  >
                    {videoConfig.muted ? <SpeakerX /> : <SpeakerHigh />}
                  </button>
                  <button
                    onClick={toggleFullScreen}
                    className="text-2xl text-base-white"
                  >
                    {videoConfig.isFull ? <ArrowsIn /> : <ArrowsOut />}
                  </button>
                </li>
              </ul>
            </aside>
          </>
        )
      )}
    </div>
  );
}

export default VideoPlayer;
