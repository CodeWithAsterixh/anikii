import React from "react";
import { CharacterData } from "../../../lib/types/anime/__animeDetails";
import Image from "@/ui/components/Image/Image";


type Props = {
  data: CharacterData;
};

const CharacterList: React.FC<Props> = ({ data }) => {
  return (
    <div className="p-4 bg-black text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Characters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.result.characters.map((character) => (
          <div
            key={character.id}
            className="bg-white text-black p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            {/* Character Image */}
            <Image
              src={character.image.medium}
              alt={character.name || "Unknown Character"}
              className="w-32 h-32 object-cover rounded-full mb-4"
              width={500}
              height={500}
            />
            {/* Character Name */}
            <h3 className="text-lg font-bold">
              {character.name || "Unknown Character"}
            </h3>
            {/* Character Role */}
            <p className="text-sm text-gray-600">{character.role}</p>
            {/* Gender */}
            <p className="text-sm text-gray-600">{character.gender}</p>

            {/* Voice Actors */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Voice Actors</h4>
              {character.voiceActors.map((actor, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  {/* Voice Actor Image */}
                  <Image
                    src={actor.image.medium}
                    alt={actor.name.full}
                    className="w-10 h-10 object-cover rounded-full"
                    width={500}
                    height={500}
                    />
                  <div>
                    {/* Voice Actor Name */}
                    <p className="text-sm font-medium">{actor.name.full}</p>
                    {/* Voice Actor Language */}
                    <p className="text-xs text-gray-500">{actor.languageV2}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Info */}
      <div className="mt-6 text-center">
        <p>
          Page {data.result.pageInfo.currentPage} of{" "}
          {data.result.pageInfo.lastPage}
        </p>
      </div>
    </div>
  );
};

export default CharacterList;
