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
              "!py-2 !text-tertiary !text-sm sm:!text-base",
            placeholder: "Search anime (e.g, naruto)",
          },
          input: {
            className:
              "!rounded-l-md !outline-tertiary !rounded-r-none !border-tertiary",
          },
        }}
      />
      <IconButton
        onClick={handleSearch}
        className="!bg-primary !rounded-l-none  !rounded-r-md !text-xl sm:!text-2xl !text-accent"
      >
        <BiSearchAlt />
      </IconButton>
    </div>
  );
}
