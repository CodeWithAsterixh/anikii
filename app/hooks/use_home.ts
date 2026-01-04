import { useEffect } from "react";
import { use_async } from "./use_async";
import { 
  get_popular_anime, 
  get_trending_anime, 
  get_upcoming_anime 
} from "../helpers/home_controller";

export function use_home() {
  const popular = use_async(get_popular_anime);
  const trending = use_async(get_trending_anime);
  const upcoming = use_async(get_upcoming_anime);

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
