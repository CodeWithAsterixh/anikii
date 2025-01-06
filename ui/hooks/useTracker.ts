import { MiniAnimeInfo, ReleasesType } from "@/lib/types/anime/__releases";
import { modifyFavorite } from "@/store/reducers/trackingReducer";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useTracker() {
  const trackable = useSelector((s: RootState) => s.UserTracker);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToFavorite = useCallback(

    (anime:ReleasesType|MiniAnimeInfo)=>{
        const {coverImage,id,title} = anime
        dispatch(modifyFavorite({data:{
          coverImage,
          id,
          title
        },type:"ADD"}))
      },
    [dispatch]
  );
  const handleRemoveFromFavorite = useCallback(
    (id:number)=>{
        dispatch(modifyFavorite({data:{
          id
        },type:"REMOVE"}))

      },
    [dispatch]
  );
  const handleUpdateFavorite = useCallback(
    ()=>{
        dispatch(modifyFavorite({data: {
          id: 0
        }, type:"UPDATE"}))

      },
    [dispatch]
  );

  useEffect(() => {
    handleUpdateFavorite()
  }, [handleUpdateFavorite])
  

  return { trackable, handleUpdateFavorite,handleAddToFavorite,handleRemoveFromFavorite };
}
