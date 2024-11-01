"use client";

import BreadCrumbed from "@/ui/components/Breadcrumbed";
import MovieCard from "@/ui/major/MovieCard";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { gogoPopular } from "../page";
import { SmileySad } from "@phosphor-icons/react/dist/ssr";
import { Button } from "flowbite-react";
import Loader from "@/ui/components/loader";
import axios from "axios";

type Props = object;

function SearchFor({}: Props) {
  const params = useSearchParams();
  const [searchResult, setSearchResult] = useState<gogoPopular[] | null>(null);
  const [process, setProcess] = useState({
    loading: false,
    error: false,
  });
  const term = params.get("term");
  async function search() {
    setProcess({ error: false, loading: true });
    try {
      const animes = await axios.get(`/api/search?term=${term}`, {
        onDownloadProgress() {
          setProcess({ error: false, loading: true });
        },
        timeout: 10000,
      });

      const animeResult = animes.data;

      setSearchResult(animeResult);
      setProcess({ error: false, loading: false });
    } catch (err) {
      setProcess({ error: true, loading: false });
      return err;
    }
  }
  useEffect(() => {
    if (term) {
      search();
    }
  }, [term]);

  return (
    <main className=" w-full h-fit flex items-start justify-start flex-col pb-32">
      <BreadCrumbed />

      {process.error ? (
        <>
          <h3 className="text-secondary w-full h-fit flex items-center justify-center flex-col gap-3 font-bold">
            <SmileySad className="text-5xl" weight="fill" /> Error searching
            for: {term}
            <section className="w-full flex items-center justify-center h-fit p-2">
              <Button
                onClick={search}
                className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit"
              >
                Retry search
              </Button>
            </section>
          </h3>
        </>
      ) : process.loading ? (
        <Loader />
      ) : (
        <>
          <h3 className="p-2 text-lg text-primary">
            Search result for: {term}
          </h3>
          <ul className="w-full h-fit flex items-start justify-start flex-wrap gap-2 p-2">
            {!process.loading &&
              searchResult &&
              searchResult.map((anime, index) => (
                <MovieCard
                  isList
                  key={index}
                  image={anime.img}
                  title={anime.title}
                  id={anime.id}
                />
              ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default SearchFor;
