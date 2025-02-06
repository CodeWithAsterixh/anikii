import { AnimeListItem } from "@/lib/types/anime/__animeListItem";

/**
 * Calculate the Levenshtein distance between two strings.
 */
function levenshteinDistance(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          Math.min(
            dp[i - 1][j], // deletion
            dp[i][j - 1], // insertion
            dp[i - 1][j - 1] // substitution
          ) + 1;
      }
    }
  }

  return dp[a.length][b.length];
}

/**
 * Get the value of a nested subkey from an object using a dot-separated key path.
 */
function getNestedValue<T>(obj: T, keyPath: string): string | null {
  return keyPath.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key as keyof typeof acc];
    }
    return null;
  }, obj as unknown) as string | null;
}

/**
 * Get the value of the first existing nested subkey from a list of key paths.
 */
function getFirstExistingValue<T>(obj: T, keyPaths: string[]): string | null {
  for (const keyPath of keyPaths) {
    const value = getNestedValue(obj, keyPath);
    if (value !== null) {
      return value;
    }
  }
  return null;
}

/**
 * Sort an array of ReleasesType objects by the similarity of nested keys' values to a target string.
 */
export function sortReleasesByKey(
  target: string,
  releases: AnimeListItem[],
  keyPaths: string[]
): AnimeListItem[] {
  return releases.sort((a, b) => {
    const valueA = getFirstExistingValue(a, keyPaths) || ""; // Fallback to an empty string
    const valueB = getFirstExistingValue(b, keyPaths) || ""; // Fallback to an empty string
    const distA = levenshteinDistance(target, valueA);
    const distB = levenshteinDistance(target, valueB);
    return distA - distB;
  });
}
