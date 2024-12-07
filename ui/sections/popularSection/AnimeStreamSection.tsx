"use client";

import { StreamInfo } from "@/lib/types/__anikii_api";
import { useState } from "react";
import { FaLink, FaPlay } from "react-icons/fa";

const AnimeStreamSection = ({ data }: { data: StreamInfo }) => {
  const { animeInfo, episodeInfo, streamLink } = data;

  // State to track the currently selected stream link
  const [currentStream, setCurrentStream] = useState<string>(
    streamLink && streamLink.length > 0 ? Object.values(streamLink[0])[0] : "" // Fallback to an empty string if streamLink is undefined or empty
  );

  const handleStreamChange = (link: string) => {
    setCurrentStream(link);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Anime Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-400 mb-2">
            {animeInfo.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {animeInfo.category}
          </p>
        </div>

        {/* Episode Title */}
        <div className="mb-6 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
            {episodeInfo.title}
          </h2>
        </div>

        {/* Stream Display */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h3 className="flex items-center justify-center text-lg font-bold text-blue-800 dark:text-blue-400 mb-4">
            <FaPlay className="mr-2" />
            Streaming
          </h3>
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{
              paddingTop: "56.25%", // Aspect ratio for 16:9
              maxHeight: "70vh",
            }}
          >
            <iframe
              src={currentStream}
              title="Anime Stream"
              className="absolute top-0 left-0 w-full h-full border-none rounded-lg"
              style={{
                maxHeight: "70vh",
              }}
            ></iframe>
          </div>
        </div>

        {/* Stream Links */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h3 className="flex items-center text-lg font-bold text-blue-800 dark:text-blue-400 mb-4 border-b-2 border-blue-300">
            <FaLink className="mr-2" />
            Available Streams
          </h3>
          <ul className="space-y-3">
            {streamLink &&
              streamLink.map((link, index) => {
                const [serverName, url] = Object.entries(link)[0];
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleStreamChange(url as string)}
                      className={`w-full flex items-center text-left px-4 py-2 rounded-md transition-colors ${
                        currentStream === url
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-300"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-800"
                      }`}
                    >
                      <span
                        className={`font-semibold ${
                          currentStream === url
                            ? "text-blue-800 dark:text-blue-300"
                            : "text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {serverName}
                      </span>
                      <FaLink
                        className="ml-2 text-blue-600 dark:text-blue-300"
                        title="Open Link"
                      />
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AnimeStreamSection;
