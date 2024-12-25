"use client";

// AnimeComponent.tsx
import { setCurrentlyPlayed } from "@/store/reducers/listReducer";
import { AppDispatch, RootState } from "@/store/store";
import Image from "@/ui/components/Image/Image";
import { Button, Link, Tab, Tabs } from "@mui/material";
import clsx from "clsx";
import React, { useState } from "react";
import { AiFillBilibili, AiFillYoutube } from "react-icons/ai";
import {
  BsInfoCircleFill,
  BsPauseCircleFill,
  BsPlayCircleFill,
  BsTvFill,
  BsTwitterX,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AnimeProps } from "../../../lib/types/anime/__animeDetails";
import { useParams, useRouter } from "next/navigation";

const AnimeInfoStream: React.FC<AnimeProps> = ({
  streamingEpisodesSub,
  streamingEpisodesDub,
  data,
}) => {
  const currentlyPlayed = useSelector((s: RootState) => s.currentlyPlayed);
  const dispatch = useDispatch<AppDispatch>();
  const [streamTabs, setStreamTabs] = useState("1");
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setStreamTabs(newValue);
  };
  const { id } = useParams();

  function handleSetCurrentlyStreamed(data: {
    url: string;
    type: string;
    title: string;
  }) {
    if (
      currentlyPlayed.status === "available" &&
      data.title === currentlyPlayed.data?.title &&
      data.url === currentlyPlayed.data?.url
    ) {
      dispatch(
        setCurrentlyPlayed({
          ok: true,
          status: "not initiated",
          data: {
            url: "",
            title: "",
            type: "",
          },
        })
      );
    } else {
      dispatch(
        setCurrentlyPlayed({
          ok: true,
          status: "available",
          data,
        })
      );
      router.push(`/anime/${id}/watch`);
    }
  }

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
  return (
    <div className="p-0 bg-gradient-to-r isolate relative max-h-[calc(100vh_-_100px)] overflow-y-auto from-neutral-200 to-neutral-50 dark:from-neutral-900 dark:to-neutral-700 rounded-lg">
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
            {data.streamingEpisodes.map((episode, index) => (
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
            {streamingEpisodesSub.map(
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
                            className="!bg-blue-600 !text-white !text-xs !py-1 !px-3 !rounded-lg"
                          >
                            {link.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button className="!w-24 !relative !isolate !overflow-hidden !rounded-none !bg-fade-white !text-black dark:!bg-fade-black dark:!text-white !h-full !flex !items-center !justify-center !text-2xl">
                      <Image
                        alt="bg"
                        className="size-full absolute -z-10 inset-0 group-hover:brightness-50 duration-300"
                        src={
                          data.streamingEpisodes[index].thumbnail ||
                          data.streamingEpisodes[0].thumbnail
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
                        currentlyPlayed.data?.title ? (
                          <BsPauseCircleFill />
                        ) : (
                          <BsPlayCircleFill />
                        )}
                      </span>
                    </Button>
                  </div>
                )
            )}
          </div>
        </>
      ) : (
        <>
          {/* Dub Episodes */}
          <div className="mt-6 p-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Dub Episodes
            </h2>
            {streamingEpisodesDub.map(
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
                          data.streamingEpisodes[index].thumbnail ||
                          data.streamingEpisodes[0].thumbnail
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
                        currentlyPlayed.data?.title ? (
                          <BsPauseCircleFill />
                        ) : (
                          <BsPlayCircleFill />
                        )}
                      </span>
                    </Button>
                  </div>
                )
            )}
          </div>
        </>
      )}

      {/* External Links */}
      <div className="mt-6 p-4">
        <h3 className="text-lg text-gray-800 dark:text-gray-200">
          External Links
        </h3>
        {data.externalLinks.map((link, index) => (
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
