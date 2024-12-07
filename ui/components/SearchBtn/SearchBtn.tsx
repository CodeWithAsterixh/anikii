"use client";

import { IconButton, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

type Props = {
  onSearch?: (keyword: string) => void;
};

export default function SearchBtn({ onSearch }: Props) {
  const [keyWord, setKeyWord] = useState("");
  const handleSearch = useCallback(() => {
    if (onSearch) {
      onSearch(keyWord);
      setKeyWord("");
    }
  }, [keyWord, onSearch]);

  return (
    <div className="w-fit flex items-center justify-center">
      <TextField
        variant="outlined"
        type="search"
        value={keyWord}
        onChange={(e) => setKeyWord(e.target.value)}
        onKeyUp={(e) => {
          if (e.key.toLowerCase() === "enter") {
            handleSearch();
          }
        }}
        slotProps={{
          htmlInput: {
            className:
              "!py-2 !text-black dark:!text-white !text-sm sm:!text-base",
            placeholder: "Search anime (e.g, naruto)",
          },
          input: {
            className:
              "!rounded-l-md !outline-base-black dark:!outline-base-white !rounded-r-none",
          },
        }}
      />
      <IconButton
        onClick={handleSearch}
        className="!bg-base-black/10 dark:!bg-base-white/10 !rounded-l-none !rounded-r-md !text-xl sm:!text-2xl !text-black dark:!text-white"
      >
        <BiSearchAlt />
      </IconButton>
    </div>
  );
}
