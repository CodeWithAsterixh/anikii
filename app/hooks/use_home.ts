import { useEffect } from "react";
import { useAsync } from "./use_async";
import { 
  get_popular_anime, 
  get_trending_anime, 
  get_upcoming_anime 
} from "../helpers/home_controller";

export function useHome() {
  const popular = useAsync(get_popular_anime);
  const trending = useAsync(get_trending_anime);
  const upcoming = useAsync(get_upcoming_anime);

  useEffect(() => {
    popular.execute();
    trending.execute();
    upcoming.execute();
  }, []);

  return {
    popular,
    trending,
    upcoming,
  };
}
