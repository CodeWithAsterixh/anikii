import { MagnifyingGlass, XCircle } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import React, { useState } from "react";

type SearchProps = React.HTMLProps<HTMLInputElement> & {
  customButton?: React.ReactNode | "no-button";
  containerClass?: string;
  onSearch?: (term: string) => void;
  onKeyed?: (value: string) => void;
};

function Search({
  onSearch,
  customButton,
  containerClass,
  onKeyed,
  ...props
}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Handle the search functionality here (e.g., API call)
    event?.preventDefault();
    if (searchTerm.trim() !== "") {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.key.toLowerCase() === "enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <div
        className={clsx("flex items-center max-w-sm mx-auto", containerClass)}
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          {searchTerm.trim() !== "" ? (
            <div
              onClick={clearSearch}
              className="z-[1] cursor-pointer absolute inset-y-0 start-0 flex items-center ps-0.5 min-[498px]:ps-2 pointer-events-auto"
            >
              <XCircle className="text-base" />
            </div>
          ) : null}
          <input
            type="text"
            id="simple-search"
            value={searchTerm}
            onKeyDown={(e) => handleEnter(e)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (onKeyed) {
                onKeyed(e.target.value);
              }
            }}
            className={clsx(
              "bg-gray-50 border border-gray-300 text-gray-900 relative z-0 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 min-[498px]:ps-7 p-1.5 min-[498px]:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              {
                "ps-1": searchTerm.trim() == "",
              }
            )}
            placeholder="Search branch name..."
            {...props}
          />
        </div>
        {customButton && customButton !== "no-button" ? (
          customButton
        ) : customButton == "no-button" ? null : (
          <button
            onClick={handleSearch}
            type="button"
            className="p-2 ms-1 min-[498px]:p-2.5 min-[498px]:ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <MagnifyingGlass className="text-base" />
            <span className="sr-only">Search</span>
          </button>
        )}
      </div>
    </>
  );
}

export default Search;
