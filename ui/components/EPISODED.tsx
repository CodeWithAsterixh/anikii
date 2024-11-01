"use client";

import {
  ArrowCounterClockwise,
  CaretRight,
  CircleNotch,
  DownloadSimple,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useModal } from "../Modal/Modal";
import Search from "../Search";
// import axios from "axios";

export type EPProp = {
  episodeNumber?: number;
  episodeDesc?: string;
  isPlaying?: boolean;
};
export function EpListItem({ episodeNumber, isPlaying, episodeDesc }: EPProp) {
  const router = useRouter();
  const navigate = router.push;
  const { closeModal } = useModal();
  const handleNavigation = useCallback(() => {
    navigate(`/watch?anime_episode=${episodeDesc}`);
    closeModal("epList");
  }, [closeModal, episodeDesc, navigate]);

  return (
    <li
      className={clsx(
        "w-full h-fit p-2 box-border rounded-md hover:bg-opacity-50",
        "flex items-center justify-between",
        "bg-base-white/40 dark:bg-gray-700/40",
        "text-base-black dark:text-base-white",
        "hover:bg-base-white/60 dark:hover:bg-gray-700/60",
        {
          "-order-1": isPlaying,
          "border-l-4 border-secondary rounded-l-none mb-5": isPlaying,
        }
      )}
      onClick={handleNavigation}
    >
      <p className="w-full line-clamp-1">
        Episode {episodeNumber}
        {episodeDesc && ": " + episodeDesc}
      </p>
      <span className="text-xl shrink-0 flex items-center justify-center gap-2">
        {isPlaying && (
          <i className="text-sm text-secondary not-italic">now playing</i>
        )}
        <CaretRight />
      </span>
    </li>
  );
}

type MPEXT = {
  epnum?: number;
  isPlaying?: boolean;
  episodeDesc?: string;
};
export function MoviePlayerEpCard({
  epnum = 1,
  isPlaying,
  episodeDesc,
}: MPEXT) {
  const router = useRouter();
  const navigate = router.push;
  return (
    <li
      className={clsx(
        `w-[128px] h-20 border-2 relative isolate flex items-end rounded-md overflow-hidden shrink-0 snap-center`,
        {
          "border-2 border-secondary": isPlaying,
        }
      )}
      onClick={() => navigate(`/watch?anime_episode=${episodeDesc}`)}
    >
      {isPlaying && (
        <i className="text-sm w-full h-fit py-0.5 px-2 flex items-center justify-end absolute top-0 left-0 z-[1] bg-gradient-to-b from-black/50 to-transparent text-secondary not-italic">
          now playing
        </i>
      )}
      <span className="size-full block absolute z-0 inset-0 bg-gray-500"></span>
      <p className="relative w-full h-fit bg-base-black text-base-white px-2 text-sm line-clamp-1">
        Ep{epnum}
      </p>
    </li>
  );
}

export type EPListProp = {
  episodes?: EPProp[];
};

export function EpList({
  episodes = [
    { episodeNumber: 1 },
    { episodeNumber: 2 },
    { episodeNumber: 3 },
    { episodeNumber: 4 },
  ],
}: EPListProp) {
  const [filterEp, setFilterEp] = useState<EPProp[]>(episodes);
  function handleSearchFilter(e: number | string) {
    const filter = episodes.filter((ep) =>
      String(ep.episodeNumber).includes(String(e))
    );

    setFilterEp(filter);
  }

  return (
    <aside className="w-full min-[498px]:w-[450px] sm:w-[500px] h-[70vh] overflow-y-auto max-h-[800px] p-0 flex flex-col gap-2 items-center justify-start *:w-full *:shrink-0">
      <div className="w-full grid grid-cols-1 items-center justify-start gap-2 bg-white dark:bg-gray-800 sticky top-0 z-[1]">
        <div className="w-full h-fit flex items-center justify-start gap-2">
          <span className="w-fit px-2 py-1 shrink-o flex items-center justify-center border-2 text-base-black dark:text-base-white border-base-black/60 dark:border-base-white/60 rounded-md">
            Total Episodes: {episodes.length}
          </span>
          {episodes.find((ep) => ep.isPlaying) && (
            <span className="w-fit px-2 py-1 shrink-o flex items-center justify-center border-2 border-base-black/60 dark:border-base-white/60 rounded-md text-secondary">
              now playing:{" "}
              <i className="not-italic text-base-black dark:text-base-white">
                {episodes.find((ep) => ep.isPlaying)?.episodeNumber}
              </i>
            </span>
          )}
        </div>
        <Search
          onKeyed={handleSearchFilter}
          placeholder="search episode"
          type="number"
          customButton="no-button"
          containerClass="!max-w-full !w-full !m-0 text-base-black dark:text-base-white"
        />
      </div>
      <ul className="w-full h-full overflow-y-auto relative z-0 flex flex-col items-center justify-start gap-2">
        {episodes &&
          filterEp.map((ep, index) => (
            <EpListItem
              episodeNumber={ep.episodeNumber}
              episodeDesc={ep.episodeDesc}
              isPlaying={ep.isPlaying}
              key={index}
            />
          ))}
      </ul>
    </aside>
  );
}

export function ViewAllEps({ episodes }: EPListProp) {
  const { openModal } = useModal();

  function openAllEpList() {
    openModal(
      <EpList episodes={episodes} />,
      { closeOutClick: true },
      "epList"
    );
  }
  return (
    <section className="w-full h-fit p-2">
      <Button
        onClick={openAllEpList}
        className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit"
      >
        Show all episodes list
      </Button>
    </section>
  );
}

interface downloadItem {
  quality?: string;
  url?: string;
  name?: string;
}
export function DownloadItem({ quality, url, name }: downloadItem) {
  const { closeModal } = useModal();
  const handleNavigation = useCallback(async () => {
    try {
      if (!url) {
        throw new Error("no url available");
      }

      // const response = await axios.get(`/api/downloadLink?url=${url}`, {
      //   timeout: 50000,
      // });

      // const urlBlob = window.URL.createObjectURL(
      //   new Blob([response.data], { type: "video/mp4" })
      // );
      const downloader = document.createElement("a");
      downloader.href = url;
      downloader.download = `${name ? name : "video"} (${quality}p)`;
      document.body.appendChild(downloader);
      downloader.click();
      document.body.removeChild(downloader);
      // window.URL.revokeObjectURL(urlBlob);
      closeModal("epList");
    } catch (error) {
      console.log(error);
    }
  }, [closeModal, name, quality, url]);

  return (
    <li
      className={clsx(
        "w-full h-fit p-2 box-border rounded-md hover:bg-opacity-50",
        "flex items-center justify-between",
        "bg-base-white/40 dark:bg-gray-700/40",
        "text-base-black dark:text-base-white",
        "hover:bg-base-white/60 dark:hover:bg-gray-700/60"
      )}
      onClick={handleNavigation}
    >
      <p className="w-full line-clamp-1">
        {quality?.toLowerCase()?.split("x").slice(-1)} download quality
      </p>
      <span className="text-xl shrink-0 flex items-center justify-center gap-2">
        <DownloadSimple />
      </span>
    </li>
  );
}

export function DownloadList({ items }: { items?: downloadItem[] }) {
  return (
    <aside className="w-full min-[498px]:w-[450px] sm:w-[500px] h-[70vh] overflow-y-auto max-h-[800px] p-0 flex flex-col gap-2 items-center justify-start *:w-full *:shrink-0">
      <div className="w-full grid grid-cols-1 items-center justify-start gap-2 bg-white dark:bg-gray-800 sticky top-0 z-[1]">
        <div className="w-full h-fit flex items-center justify-start gap-2">
          <span className="w-fit px-2 py-1 shrink-o flex items-center text-base-black dark:text-base-white justify-center border-2 border-base-black/60 dark:border-base-white/60 rounded-md">
            Available Services: {items?.length}
          </span>
        </div>
      </div>
      <ul className="w-full h-full overflow-y-auto relative z-0 flex flex-col items-center justify-start gap-2">
        {items &&
          items.map((item, index) => (
            <DownloadItem
              name={item.name}
              quality={item.quality}
              url={item.url}
              key={index}
            />
          ))}
      </ul>
    </aside>
  );
}

type downloadProp = {
  onClick?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  availableDownloads?: downloadItem[];
};

export function ViewDownloadAvailable({
  onClick,
  isLoading,
  isError,
  availableDownloads,
}: downloadProp) {
  const { openModal } = useModal();

  const openAllDownloadList = useCallback(() => {
    openModal(
      <DownloadList items={availableDownloads} />,
      { closeOutClick: true },
      "epList"
    );
  }, [availableDownloads, openModal]);

  const handleClick = useCallback(() => {
    if (!isLoading && availableDownloads) {
      openAllDownloadList();
    }
    if (onClick) {
      onClick();
    }
  }, [availableDownloads, isLoading, onClick, openAllDownloadList]);

  return (
    <section className="w-full h-fit p-2">
      <Button
        onClick={handleClick}
        className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            Loading
            <CircleNotch weight="bold" size={25} className="animate-spin" />
          </>
        ) : isError ? (
          <>
            Retry
            <ArrowCounterClockwise weight="bold" />
          </>
        ) : (
          "Download"
        )}
      </Button>
    </section>
  );
}
