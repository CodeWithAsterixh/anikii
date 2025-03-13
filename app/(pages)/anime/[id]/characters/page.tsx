"use client";

import useQuery from "@/hooks/useQuery";
import { CharacterData } from "@/lib/types/anime/__animeDetails";
import Image from "@/ui/components/Image/Image";
import Pagination from "@/ui/components/pagination/Pagination";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = object;

export default function Category({}: Props) {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams()
  const page = searchParams.get("page")||1
  const characters = useQuery<{
    pageInfo:{ lastPage: number, currentPage: number },
    characters: CharacterData[]
  }>(`/anime/${id}/characters?page=${page}`);
  const [languages, setLanguages] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string>("Japanese");

  useEffect(() => {
    if (
      characters.status.status == "done" &&
      characters.data &&
      languages.length === 0
    ) {
      const languages = [
        ...new Set(
          characters.data.characters
            .map((character: CharacterData) =>
              character.voiceActors.map((va) => va.language)
            )
            .flat()
        ),
      ];
      setLanguages(languages);
    }
  }, [characters, languages.length]);

  return (
    <div className="w-full h-fit flex flex-col gap-4 isolate relative">
      <div className="w-full flex items-center justify-end sticky top-36 bg-accent py-1 shadow-md">
        <div className="w-fit flex items-center justify-center gap-2">
          <b className="shrink-0">Select Language:</b>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              label="Age"
              variant="standard"
            >
              {languages.map((language, index) => (
                <MenuItem key={index} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="w-full grid grid-col-1 sm:grid-cols-2 p-2 gap-2">
        <div className="w-full flex flex-col gap-2">
          {characters.data &&
            characters.data.characters
              .slice(0, characters.data.characters.length / 2)
              .map((char, ind) => {
                const voiceActor = char.voiceActors.filter(
                  (va) => va.language === currentLanguage
                )[0];

                return (
                  <div
                    className="w-full flex items-center justify-between bg-primary/30 p-3 rounded-md"
                    key={ind}
                  >
                    {/* character */}
                    <div className="w-full flex items-center gap-2">
                      <span className="size-14 rounded-full overflow-hidden bg-tertiary items-center justify-center">
                        <Image
                          className="size-full"
                          src={char.character.image}
                          alt={char.character.name}
                        />
                      </span>
                      <span className="flex flex-col gap-2">
                        <b className="text-sm">{char.character.name}</b>
                        <b className="text-xs">{char.character.role}</b>
                      </span>
                    </div>

                    {/* voice actor */}
                    {voiceActor && (
                      <div className="w-full flex flex-row-reverse items-center gap-2">
                        <span className="size-14 rounded-full overflow-hidden bg-tertiary items-center justify-center">
                          <Image
                            className="size-full"
                            src={voiceActor.image}
                            alt={voiceActor.name}
                          />
                        </span>
                        <span className="flex flex-col gap-2 text-right">
                          <b className="text-sm">{voiceActor.name}</b>
                          <b className="text-xs">{voiceActor.language}</b>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
        <div className="w-full flex flex-col gap-2">
          {characters.data &&
            characters.data.characters
              .slice(characters.data.characters.length / 2)
              .map((char, ind) => {
                const voiceActor = char.voiceActors.filter(
                  (va) => va.language === currentLanguage
                )[0];

                return (
                  <div
                    className="w-full flex items-center justify-between bg-primary/30 p-3 rounded-md"
                    key={ind}
                  >
                    {/* character */}
                    <div className="w-full flex items-center gap-2">
                      <span className="size-14 rounded-full overflow-hidden bg-tertiary items-center justify-center">
                        <Image
                          className="size-full"
                          src={char.character.image}
                          alt={char.character.name}
                        />
                      </span>
                      <span className="flex flex-col gap-2">
                        <b className="text-sm">{char.character.name}</b>
                        <b className="text-xs">{char.character.role}</b>
                      </span>
                    </div>

                    {/* voice actor */}
                    {voiceActor && (
                      <div className="w-full flex flex-row-reverse items-center gap-2">
                        <span className="size-14 rounded-full overflow-hidden bg-tertiary items-center justify-center">
                          <Image
                            className="size-full"
                            src={voiceActor.image}
                            alt={voiceActor.name}
                          />
                        </span>
                        <span className="flex flex-col gap-2 text-right">
                          <b className="text-sm">{voiceActor.name}</b>
                          <b className="text-xs">{voiceActor.language}</b>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
      {characters.data?.pageInfo&&<Pagination page={characters.data.pageInfo}/>}
    </div>
  );
}
