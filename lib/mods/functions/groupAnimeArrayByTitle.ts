type Item = {
  image?: string;
  title?: string;
  extra?: string;
  id?: string;
};
export type GroupedResult = Record<string, Item[]> | Item[];

export function groupByTitle(array: Item[]): GroupedResult {
  const result: Record<string, Item[]> = {};
  const keyCount: Record<string, number> = {};

  // Step 1: Identify unique base keys
  array.forEach(({ title }) => {
    if (title) {
      const key = title.includes(":")
        ? title.split(":")[0].trim().toLowerCase()
        : title.trim().toLowerCase();
      keyCount[key] = (keyCount[key] || 0) + 1;
    }
  });

  // Step 2: Identify main keys
  const mainKeys = Object.keys(keyCount).filter((key) => keyCount[key] > 1);

  // Step 3: Group by exact key matches without merging unrelated keys
  array.forEach((obj) => {
    const title = obj.title;

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

      result[matchedKey].push({ ...obj, title: newTitle });
    } else {
      // Handle items with no title
      if (!result["others"]) {
        result["others"] = [];
      }
      result["others"].push(obj);
    }
  });

  // Step 4: Keep unrelated keys distinct, no reassigning
  if (result["others"]) {
    result["others"].sort((a, b) => {
      if (!a.title) return 1;
      if (!b.title) return -1;
      return a.title.localeCompare(b.title);
    });
  }

  // Step 5: Sort each array by title alphabetically
  Object.keys(result).forEach((key) => {
    result[key].sort((a, b) => {
      if (!a.title) return 1;
      if (!b.title) return -1;
      return a.title.localeCompare(b.title);
    });
  });

  // Step 6: Ensure "others" is the last category
  const sortedResult: Record<string, Item[]> = {};
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

  // Step 7: If only "others" exists, return it directly
  const keys = Object.keys(sortedResult);
  if (keys.length === 1 && keys[0] === "others") {
    return sortedResult.others || [];
  }

  return sortedResult;
}
