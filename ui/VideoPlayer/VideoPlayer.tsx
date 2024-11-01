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
interface videoConfig {
  isFull: boolean;
  muted: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  landscape: boolean;
}
function VideoPlayer({ name, content }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement | null>(null);
  const [videoConfig, setVideoConfig] = useState<videoConfig>({
    isFull: false,
    muted: false,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    landscape: false,
  });
  const [controlsShown, setControlsShown] = useState(false);

  function fullScreen() {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.requestFullscreen();
      setVideoConfig((prev) => ({ ...prev, isFull: true }));
    }
  }
  function closeFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setVideoConfig((prev) => ({ ...prev, isFull: false }));
    }
  }
  function mute(value: boolean = true) {
    if (videoRef.current) {
      if (value) {
        videoRef.current.volume = 0;
        setVideoConfig((prev) => ({ ...prev, muted: true }));
      } else {
        videoRef.current.volume = 1;
        setVideoConfig((prev) => ({ ...prev, muted: false }));
      }
    }
  }
  function play(value: boolean = true) {
    if (videoRef.current) {
      if (value) {
        videoRef.current.play();
        setVideoConfig((prev) => ({ ...prev, isPlaying: true }));
      } else {
        videoRef.current.pause();
        setVideoConfig((prev) => ({ ...prev, isPlaying: false }));
      }
    }
  }
  function speed(value: "forward" | "backward" = "forward") {
    if (videoRef.current) {
      if (value == "forward") {
        videoRef.current.currentTime = videoRef.current.currentTime + 10;
      } else if (value == "backward") {
        videoRef.current.currentTime = videoRef.current.currentTime - 10;
      }
    }
  }
  function secondsToTimeFormat(seconds: number) {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${Math.round(parseInt(secs))}`;
  }
  function handleLandScapeToggle() {
    if (videoConfig.landscape) {
      setOrientation("unlock");
      setVideoConfig((prev) => ({ ...prev, landscape: false }));
    } else {
      setOrientation();
      setVideoConfig((prev) => ({ ...prev, landscape: true }));
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      setVideoConfig((prev) => ({
        ...prev,
        duration: video ? (video.duration ? video.duration : 0) : 0,
      }));
      videoRef.current.addEventListener("timeupdate", () => {
        setVideoConfig((prev) => ({
          ...prev,
          currentTime: video ? video.currentTime : 0,
        }));
      });
      videoRef.current.addEventListener("ended", () => {
        video.currentTime = 0;
        setVideoConfig((prev) => ({
          ...prev,
          currentTime: 0,
          isPlaying: false,
        }));
      });
    }
  }, [videoRef, videoConfig.isPlaying]);
  useEffect(() => {
    if (content && videoRef.current) {
      videoRef.current.load();
    }
  }, [content, videoRef]);
  useEffect(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.addEventListener("mouseenter", () => {
        setControlsShown(true);
      });

      videoPlayerRef.current.addEventListener("mouseleave", () => {
        setControlsShown(false);
      });

      if (videoConfig.isPlaying) {
        setTimeout(() => {
          setControlsShown(false);
        }, 3000);
      }
      setControlsShown(true);
    }
  }, [videoPlayerRef, videoConfig.isPlaying]);

  return (
    <div
      ref={videoPlayerRef}
      className="w-full p-2 h-80 max-h-[50vh] relative bg-white/50 dark:bg-black/50"
    >
      {!content ? (
        <div className="size-[calc(100%-(0.5rem*2))] m-2 rounded-lg relative z-0"></div>
      ) : (
        content.src.trim() !== "" && (
          <>
            {content.isVideo ? (
              <>
                <video
                  ref={videoRef}
                  className="size-[calc(100%-(0.5rem*2))] m-2 rounded-lg relative z-0"
                  controls={false}
                >
                  <source src={content?.src} type="video/mp4" />
                  your browser does not support video players
                </video>
                <aside
                  className={clsx(
                    "size-full flex flex-col duration-300 items-center justify-between overflow-hidden absolute inset-0  z-[1] rounded-lg bg-gradient-to-t from-black to-transparent",
                    !controlsShown ? "opacity-0" : ""
                  )}
                >
                  {name && (
                    <section className="w-full h-fit p-2 box-border bg-gradient-to-b from-black to-transparent">
                      <p>{name}</p>
                    </section>
                  )}
                  <ul
                    className={clsx(
                      "w-fit h-fit absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-2 box-border",
                      "flex items-center justify-center gap-3",
                      "text-5xl *:cursor-pointer"
                    )}
                  >
                    <li
                      className={clsx(
                        "relative size-fit",
                        "before:absolute before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2",
                        "before:content-['10s'] before:!text-xs before:scale-90"
                      )}
                    >
                      <button
                        onClick={() => speed("backward")}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <ArrowCounterClockwise />
                      </button>
                    </li>
                    <li className="scale-150">
                      <button
                        onClick={() =>
                          videoConfig.isPlaying ? play(false) : play(true)
                        }
                        className="w-full h-full flex items-center justify-center"
                      >
                        {!videoConfig.isPlaying ? (
                          <PlayCircle weight="fill" />
                        ) : (
                          <PauseCircle weight="fill" />
                        )}
                      </button>
                    </li>
                    <li
                      className={clsx(
                        "relative size-fit",
                        "before:absolute before:size-fit before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2",
                        "before:content-['10s'] before:!text-xs before:scale-90"
                      )}
                    >
                      <button
                        onClick={() => speed()}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <ArrowClockwise />
                      </button>
                    </li>
                  </ul>
                  <ul className="w-full h-fit p-2 flex items-center justify-start gap-2">
                    <li
                      className={clsx(
                        "w-full h-fit flex flex-col items-start justify-start relative isolate"
                      )}
                    >
                      <span className="w-fit flex items-center justify-start gap-2">
                        <em className="not-italic">
                          {videoRef.current
                            ? secondsToTimeFormat(videoConfig.currentTime)
                            : "00:00"}
                        </em>
                        /
                        <em className="not-italic">
                          {videoRef.current
                            ? secondsToTimeFormat(videoConfig.duration)
                            : "00:00"}
                        </em>
                      </span>

                      <Ranger
                        value={
                          videoConfig.currentTime < 1
                            ? 0
                            : parseInt(
                                (
                                  (videoConfig.currentTime /
                                    videoConfig.duration) *
                                  102
                                ).toFixed(3)
                              )
                        }
                      />
                    </li>
                    <li className="w-fit h-fit flex items-center justify-center gap-2">
                      {videoConfig.isFull && (
                        <button
                          onClick={handleLandScapeToggle}
                          className="text-2xl text-base-white"
                        >
                          {!videoConfig.landscape ? (
                            <DeviceRotate className="rotate-90" />
                          ) : (
                            <DeviceRotate />
                          )}
                        </button>
                      )}
                      <button
                        onClick={() =>
                          videoConfig.muted ? mute(false) : mute(true)
                        }
                        className="text-2xl text-base-white"
                      >
                        {videoConfig.muted ? <SpeakerX /> : <SpeakerHigh />}
                      </button>
                      <button
                        onClick={
                          videoConfig.isFull ? closeFullScreen : fullScreen
                        }
                        className="text-2xl text-base-white"
                      >
                        {videoConfig.isFull ? <ArrowsIn /> : <ArrowsOut />}
                      </button>
                    </li>
                  </ul>
                </aside>
              </>
            ) : (
              <iframe
                src={content.src}
                className={clsx("size-full block rounded-lg")}
              ></iframe>
            )}
          </>
        )
      )}
    </div>
  );
}

export default VideoPlayer;
