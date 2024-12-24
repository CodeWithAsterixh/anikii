export const getSeasonInfo = (title?: string | null): string | null => {
  if (!title) return null;
  const lowerTitle = title.toLowerCase();
  if (!lowerTitle.includes("season")) return null;

  const seasonParts = lowerTitle.split("season");
  return seasonParts[seasonParts.length - 1]?.trim() || "1";
};
