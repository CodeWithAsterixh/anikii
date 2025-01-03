import React from "react";
import { Typography } from "@mui/material";
import Image from "@/ui/components/Image/Image";
import { CharacterData } from "../../../lib/types/anime/__animeDetails";
import { randomColors } from "@/lib/mods/functions/randomColor";

type Props = {
  character: CharacterData;
  length?: number;
};

function CharacterModal({ character }: Props) {
    const length = character.voiceActors.length+1;
    const colorsFull = randomColors({length, shade: 100});
    // const colorsFade10 = randomColors({length: character.voiceActors.length, shade: 10});
    // const colorsFade30 = randomColors({length: character.voiceActors.length, shade: 30});
  return (
    <div
      id={`character-${character.id}`}
      className="w-full min-h-full h-fit flex flex-col gap-2 p-2 dark:bg-neutral-800"
    >
      {/* Main Character Info */}
      <div className="sticky top-0 bg-white dark:bg-black p-4 rounded-md shadow-md z-10">
        <div className="flex items-center gap-4">
          <Image
            src={character.image.medium}
            alt={character.name || "Unknown Character"}
            className="w-16 h-16 object-cover rounded-full border-2"
            width={500}
            height={500}
            style={{
              borderColor: colorsFull[0],
            }}
          />
          <div>
            <Typography
              variant="h6"
              className="text-lg font-bold !text-black dark:!text-white"
            >
              {character.name || "Unknown Character"}
            </Typography>
            <Typography
              variant="body2"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              {character.role}
            </Typography>
            <Typography
              variant="body2"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              {character.gender}
            </Typography>
          </div>
        </div>
      </div>

      {/* Voice Actors Heading */}
      <Typography
        variant="h6"
        className="mt-4 !text-black dark:!text-white mb-2 text-lg font-bold"
      >
        Voice Actors
      </Typography>

      {/* Voice Actors List */}
      <div className="flex flex-col gap-2 p-2 h-full overflow-y-auto scrollbar-h">
        {character.voiceActors.map((actor, actorIndex) => (
          <div
            key={actorIndex}
            className="rounded-md w-full p-2 flex items-center !duration-200 text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 gap-2 mb-2"
          >
            {/* Voice Actor Image */}
            <Image
              src={actor.image.medium}
              alt={actor.name.full}
              className="w-12 h-12 object-cover shrink-0 rounded-full border-2"
              width={500}
              height={500}
              style={{
                borderColor: colorsFull[actorIndex+1],
              }}
            />
            <div className="w-full flex gap-1">
              {/* Voice Actor Name */}
              <Typography
                variant="body2"
                className="text-sm !w-full font-medium"
              >
                {actor.name.full}
              </Typography>
              {/* Voice Actor Language */}
              <Typography
                variant="caption"
                className="text-xs text-gray-600 dark:text-gray-300"
              >
                {actor.languageV2}
              </Typography>
            </div>
            {/* Language Flag */}
            <Typography
              variant="body2"
              className="text-xs"
              style={{
                backgroundColor: colorsFull[actorIndex+1],
                color: "#fff",
                padding: "0.2rem 0.5rem",
                borderRadius: "0.25rem",
              }}
            >
              {actor.languageV2.slice(0, 2).toUpperCase()}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterModal;
