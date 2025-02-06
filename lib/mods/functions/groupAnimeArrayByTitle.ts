import { AnimeListItem } from "@/lib/types/anime/__animeListItem";

export type GroupedResult = Record<string, AnimeListItem[]> | AnimeListItem[];

export function groupByTitle(array: AnimeListItem[]): GroupedResult {
  const result: Record<string, AnimeListItem[]> = {};
  const keyCount: Record<string, number> = {};

  // Step 1: Identify unique base keys
  array.forEach(({ title }, index) => {
    const eitherTitle =
      title || `No title: anime result #${index}`;

    if (eitherTitle) {
      const key = eitherTitle.includes(":")
        ? eitherTitle.split(":")[0].trim().toLowerCase()
        : eitherTitle.trim().toLowerCase();
      keyCount[key] = (keyCount[key] || 0) + 1;
    }
  });

  // Step 2: Identify main keys
  const mainKeys = Object.keys(keyCount).filter((key) => keyCount[key] > 1);

  // Step 3: Group by exact key matches without merging unrelated keys
  array.forEach((obj, index) => {
    const title =
      obj.title||
      `No title: anime result #${index}`;

    if (title) {
      const titleKey = title.includes(":")
        ? title.split(":")[0].trim().toLowerCase()
        : title.trim().toLowerCase();

      // Ensure grouping is only done for exact matches
      const matchedKey =
        mainKeys.find(
          (key) => titleKey.split("(DUB)".toLowerCase())[0].trim() === key
        ) || "others";

      if (!result[matchedKey]) {
        result[matchedKey] = [];
      }

      // Clean the title if it has a prefix matching the key
      const newTitle =
        matchedKey !== "others" &&
        title.toLowerCase().startsWith(`${matchedKey}:`)
          ? title.slice(matchedKey.length + 1).trim()
          : title;

      result[matchedKey].push({
        ...obj,
        title:newTitle,
      });
    } else {
      // Handle items with no title
      if (!result["others"]) {
        result["others"] = [];
      }
      result["others"].push(obj);
    }
  });

  // Step 4: If "others" is the only category, skip sorting and return
  const keys = Object.keys(result);
  if (keys.length === 1 && keys[0] === "others") {
    return result["others"];
  }

  // Step 5: Sort "others" alphabetically if it exists
  if (result["others"]) {
    result["others"].sort((a, b) => {
      const aTtile = a.title;
      const bTtile = b.title;
      if (!aTtile) return 1;
      if (!bTtile) return -1;
      return aTtile.localeCompare(bTtile);
    });
  }

  // Step 6: Sort each array by title alphabetically
  Object.keys(result).forEach((key) => {
    result[key].sort((a, b) => {
      const aTtile = a.title;
      const bTtile = b.title;
      if (!aTtile) return 1;
      if (!bTtile) return -1;
      return aTtile.localeCompare(bTtile);
    });
  });

  // Step 7: Ensure "others" is the last category
  const sortedResult: Record<string, AnimeListItem[]> = {};
  const otherItems = result["others"];
  delete result["others"]; // Temporarily remove "others"

  // Sort and re-add categories
  Object.keys(result)
    .sort()
    .forEach((key) => {
      sortedResult[key] = result[key];
    });

  if (otherItems) {
    sortedResult["others"] = otherItems;
  }

  // Step 8: If only "others" exists, return it directly
  if (Object.keys(sortedResult).length === 1 && sortedResult["others"]) {
    return sortedResult.others;
  }

  return sortedResult;
}
