import { gogoPopular } from "@/mods/schemas";
import { SmileySad } from "@phosphor-icons/react/dist/ssr";
import { Button } from "flowbite-react";
import React from "react";
import MovieCard from "../major/MovieCard";
import Loader from "../components/loader";

type prop = {
  error?: boolean;
  loading?: boolean;
  onReload?: () => void;
  recentReleaseList?: gogoPopular[];
};

function RecentReleasesSection({
  recentReleaseList,
  error,
  loading,
  onReload,
}: prop) {
  return (
    <section className="w-full h-fit p-2">
      {!error ? (
        loading ? (
          <Loader />
        ) : (
          <>
            <h3 className="text-secondary font-bold">Recent Releases</h3>
            <div className="w-full h-fit flex items-start justify-start flex-wrap gap-2">
              {recentReleaseList &&
                recentReleaseList.map((anime, index) => (
                  <MovieCard
                    key={index}
                    image={anime.image}
                    title={anime.title}
                    id={anime.id}
                  />
                ))}
            </div>
          </>
        )
      ) : (
        <h3 className="text-secondary w-full h-fit flex items-center flex-col gap-3 justify-center font-bold">
          <SmileySad className="text-5xl" weight="fill" /> Error loading Recent
          Releases
          <section className="w-full flex items-center justify-center h-fit p-2">
            <Button
              onClick={onReload}
              className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit"
            >
              Reload Recents
            </Button>
          </section>
        </h3>
      )}
    </section>
  );
}

export default RecentReleasesSection;
