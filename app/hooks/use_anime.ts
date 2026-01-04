import { useEffect } from "react";
import { use_async } from "./use_async";
import { 
  get_anime_details, 
  get_recommended_anime 
} from "../helpers/anime_controller";

export function use_anime(id: number) {
  const details = use_async(get_anime_details);
  const recommended = use_async(get_recommended_anime);

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
