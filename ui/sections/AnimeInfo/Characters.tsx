import { pageInfo } from "@/store/reducers/listReducer";
import Image from "@/ui/components/Image/Image";
import Pagination from "@/ui/components/pagination/Pagination";
import { useModal } from "@/ui/Modal/Modal";
import { Card, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { CharacterData } from "../../../lib/types/anime/__animeDetails";
import CharacterModal from "./CharacterModal";
import useAnimeInfos from "@/ui/hooks/useAnimeInfos";

type Props = {
  data: CharacterData[];
  pageInfo?:pageInfo;
  id:number
};

const CharacterList: React.FC<Props> = ({ data,pageInfo,id }) => {
  const { openModal } = useModal();
  const {fetchInfoCasts} = useAnimeInfos()
  
  const toggleOpenCharacterModal = (
    id: string | number,
    character: CharacterData
  ) => {
    openModal(
      <CharacterModal character={character} length={data.length} />,
      {
        closeOutClick: true,
        containerStyles: "!p-0",
        boxStyles:
          "!px-0 !box-border !gap-2 !pt-2 sm:!pt-0 sm:!pb-0 !h-[80vh] !w-[500px] !justify-start dark:bg-black",
      },
      `character-${id}`
    );
  };
  
   
    const handleNextPage = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_: unknown, page: number) => {
        fetchInfoCasts(id,page);
      },
      [fetchInfoCasts, id]
    );

  return (
    <div className="p-4 bg-white dark:bg-black text-black dark:text-white shadow-lg">
      <Typography variant="h4" className="!text-2xl !font-bold !mb-4">
        Characters
      </Typography>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4">
        {data.map((character, index) => (
          <Card
            key={index}
            className="!relative hover:!scale-95 !duration-200 !bg-neutral-200 dark:!bg-base-black !text-black dark:!text-white !p-4 !rounded-lg !shadow-md !flex !flex-col !items-center !cursor-pointer"
            onClick={() => toggleOpenCharacterModal(character.id, character)}
          >
            {/* Character Image */}
            <Image
              src={character.image.medium}
              alt={
                character.name.userPreferred ||
                character.name.full ||
                "Unknown Character"
              }
              className="!size-16 !object-cover !rounded-full !mb-2"
              width={500}
              height={500}
            />
            {/* Character Name */}
            {character.name && (
              <Typography
                variant="h6"
                className="!text-lg !w-full !font-bold !text-center !line-clamp-1"
                noWrap
              >
                {character.name.userPreferred ||
                  character.name.full ||
                  "Unknown Character"}
              </Typography>
            )}
          </Card>
        ))}
      </div>
      <Pagination
      onChange={handleNextPage}
        page={
          pageInfo?pageInfo: {
                currentPage: 0,
                lastPage: 0,
              }
        }
      />
    </div>
  );
};

export default CharacterList;
