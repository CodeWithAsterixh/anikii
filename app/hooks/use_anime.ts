import { useEffect } from "react";
import { useAsync } from "./use_async";
import {
  get_anime_details,
  get_recommended_anime,
} from "../helpers/anime_controller";

export function useAnime(id: number) {
  const details = useAsync(get_anime_details);
  const recommended = useAsync(get_recommended_anime);

  useEffect(() => {
    if (id) {
      details.execute(id);
      recommended.execute(id);
    }
  }, [id]);

  return {
    details,
    recommended,
  };
}
