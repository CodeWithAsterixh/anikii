"use client";

// AnimeComponent.tsx
import Image from "@/ui/components/Image/Image";
import { Tab, Tabs } from "@mui/material";
import clsx from "clsx";
import React, { useState } from "react";
import { AiFillBilibili, AiFillYoutube } from "react-icons/ai";
import { BsInfoCircleFill, BsTvFill, BsTwitterX } from "react-icons/bs";
import { AnimeProps } from "../../../lib/types/anime/__animeDetails";
import Link from "next/link";

const AnimeInfoStream: React.FC<{ data: AnimeProps; id: number }> = ({
  data,
  id,
}) => {
  const [streamTabs, setStreamTabs] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setStreamTabs(newValue);
  };
  const [lengths, setLengths] = useState({
    max: Math.min(100, data.data.episodes),
    min: 0,
  });

  const tabs = [
    {
      id: "1",
      label: "External",
    },
    {
      id: "2",
      label: "Sub",
    },
    {
      id: "3",
      label: "Dub",
    },
  ];
  const Episodes = ({
    sx,
    type="sub"
  }: {
    sx?: {
      containerClass?: string;
      text1Class?: string;
      text2Class?: string;
    };
    type:"sub"|"dub"
  }) => (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-2">
      {Array.from({ length: lengths.max - lengths.min }).map((_, index) => (
        <Link
          href={type==="sub"?`/anime/${id}/watch/${lengths.min + index + 1}`:`/anime/${id}/watch/${lengths.min + index + 1}?dub=true`}
          className={clsx(
            "flex items-center cursor-pointer justify-center gap-1 bg-black/30 dark:bg-white/30 p-2 rounded-md backdrop-blur-md",
            sx?.containerClass
          )}
          key={index}
        >
          <span className={clsx(sx?.text1Class)}>Ep</span>
          <span
            className={clsx(
              "pl-2 border-l-2 border-black/60 dark:border-white/60",
              sx?.text2Class
            )}
          >
            {lengths.min + index + 1}
          </span>
        </Link>
      ))}
    </div>
  );
  const EpisodesRange = ({
    sx,
  }: {
    sx?: {
      containerClass?: string;
      text1Class?: string;
      text2Class?: string;
    };
  }) => (
    <div className="w-fit max-w-full flex overflow-x-auto gap-2 py-2">
      {Array.from({ length: Math.ceil(data.data.episodes / 100) }).map(
        (_, index) => (
          <span
            className={clsx(
              "flex items-center cursor-pointer justify-center gap-1 bg-black/30 dark:bg-white/30 p-2 rounded-md backdrop-blur-md",
              sx?.containerClass
            )}
            onClick={() => {
              setLengths({
                max: data.data.episodes>100?(index + 1) * 100:data.data.episodes,
                min: index * 100,
              });
            }}
            key={index}
          >
            <span className={clsx(sx?.text1Class)}>{index * 100}</span>
            <span>-</span>
            <span className={clsx(sx?.text2Class)}>
              {index === Math.floor(data.data.episodes / 100)
                ? data.data.episodes
                : (index + 1) * 100}
            </span>
          </span>
        )
      )}
    </div>
  );
  return (
    <div className="p-0 bg-gradient-to-r isolate relative max-h-[calc(100vh_-_100px)] overflow-y-auto from-neutral-200 to-neutral-50 dark:from-neutral-900 dark:to-neutral-700">
      {/* Anime Title */}
      <div className="w-full sticky top-0 z-10">
        <Tabs
          value={streamTabs}
          onChange={handleChange}
          aria-label="streaming links tabs"
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          className="!bg-white/30 dark:!bg-black/30 !backdrop-blur-lg"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={tab.label}
              className={clsx("!py-4 !text-lg ", {
                "text-blue-500 dark:!text-blue-300": streamTabs === tab.id,
                "!text-black dark:!text-white": streamTabs !== tab.id,
              })}
            />
          ))}
        </Tabs>
      </div>
      {streamTabs === "1" ? (
        <>
          {/* Episode Links */}
          <div className="mt-4 p-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Episodes
            </h2>
            {data.data.streamingEpisodes.map((episode, index) => (
              <div key={index} className="flex flex-col mt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-gray-700 dark:text-gray-300 text-sm">
                    {episode.title}
                  </h4>
                  <Image
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
                <Link
                  href={episode.url}
                  target="_blank"
                  className="text-blue-500"
                >
                  Watch on {episode.site}
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : streamTabs === "2" ? (
        <>
          {/* Sub Episodes */}
          <div className="mt-6 p-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Sub Episodes
            </h2>
            <EpisodesRange />
            <Episodes
            type="sub"
              sx={{
                containerClass: "!bg-blue-600/30",
              }}
            />
          </div>
        </>
      ) : (
        <>
          {/* Dub Episodes */}
          <div className="mt-6 p-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Dub Episodes
            </h2>
            <EpisodesRange />
            <Episodes
            type="dub"
              sx={{
                containerClass: "!bg-red-600/30",
              }}
            />

            {/* {streamingEpisodesDub.map(
              (episode, index) =>
                !episode.error && (
                  <div
                    key={index}
                    className="grid grid-cols-[10fr_1fr] group items-stretch gap-1 mt-2 bg-white dark:bg-black rounded-md overflow-hidden"
                  >
                    <div className="w-full p-2">
                      <h4 className="text-gray-700 dark:text-gray-300 text-sm">
                        {episode.episode_info.title}
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {episode.stream_links.map((link, idx) => (
                          <Button
                            key={idx}
                            onClick={() =>
                              handleSetCurrentlyStreamed({
                                url: link.url,
                                title: episode.episode_info.title,
                                type: link.name,
                              })
                            }
                            className="!bg-red-600 dark:!bg-red-400 !text-white !text-xs !py-1 !px-3 !rounded-lg"
                          >
                            {link.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button className="!w-24 !rounded-none !bg-fade-white !text-black dark:!bg-fade-black dark:!text-white !h-full !flex !items-center !justify-center !text-2xl">
                      <Image
                        alt="bg"
                        className="size-full absolute -z-10 inset-0 group-hover:brightness-50 duration-300"
                        src={
                          data.data.streamingEpisodes[index].thumbnail ||
                          data.data.streamingEpisodes[0].thumbnail
                        }
                      />
                      <span
                        onClick={() =>
                          handleSetCurrentlyStreamed({
                            url: episode.stream_links[0].url,
                            title: episode.episode_info.title,
                            type: episode.stream_links[0].name,
                          })
                        }
                        className="block size-fit"
                      >
                        {episode.episode_info.title ===
                        currentlyPlayed.data.data?.title ? (
                          <BsPauseCircleFill />
                        ) : (
                          <BsPlayCircleFill />
                        )}
                      </span>
                    </Button>
                  </div>
                )
            )} */}
          </div>
        </>
      )}

      {/* External Links */}
      <div className="mt-6 p-4">
        <h3 className="text-lg text-gray-800 dark:text-gray-200">
          External Links
        </h3>
        {data.data.externalLinks.map((link, index) => (
          <div key={index} className="mt-2">
            <Link
              href={link.url}
              target="_blank"
              className="!w-fit !text-blue-500 !flex !items-center !justify-start gap-2"
            >
              {link.type === "INFO" ? (
                <>
                  More Info{" "}
                  <b className="text-neutral-600 dark:text-neutral-400 flex items-center justify-start gap-2">
                    <BsInfoCircleFill />
                    {link.url.split("/")[2]}
                  </b>
                </>
              ) : link.type === "SOCIAL" ? (
                <>
                  Follow on Twitter{" "}
                  <b className="text-neutral-600 dark:text-neutral-400 flex items-center justify-start gap-2">
                    <BsTwitterX />
                    {link.url.split("/")[link.url.split("/").length - 1]}
                  </b>
                </>
              ) : (
                <>
                  Watch on Streaming{" "}
                  <b className="text-neutral-600 dark:text-neutral-400 flex items-center justify-start gap-2">
                    {link.url.split("/")[2].includes("bili") ? (
                      <AiFillBilibili />
                    ) : link.url.split("/")[2].includes("youtube") ? (
                      <AiFillYoutube />
                    ) : (
                      <BsTvFill />
                    )}{" "}
                    {link.url.split("/")[2]}
                  </b>
                </>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeInfoStream;
