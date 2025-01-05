import { StreamingEpisode } from '@/lib/types/anime/__animeDetails';
import { setCurrentlyPlayed } from '@/store/reducers/listReducer';
import { AppDispatch } from '@/store/store';
import useAnimeInfos from '@/ui/hooks/useAnimeInfos';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

type StreamingSectionProps = {
  episode?: StreamingEpisode;
  loading: boolean;
};

const StreamingSection: React.FC<StreamingSectionProps> = ({ episode, loading }) => {

  const dispatch = useDispatch<AppDispatch>();
  const {streamer} = useAnimeInfos()

  const handleChangeStreamer = useCallback(
    (data:{
        type: string;
        url: string;
    }) => {
      dispatch(
            setCurrentlyPlayed({
              ok: true,
              status: "loading",
              data: {
                ...streamer.data,
                current: {
                  title: streamer?.data?.srcs?.anime_info.title
                    ? streamer?.data?.srcs?.anime_info.title
                    : "",
                  type: data.type,
                  url: data.url,
                },
              },
            })
          );
    },
    [dispatch, streamer.data],
  )
  
    
  if (!episode && loading) {
    return (
      <div className="flex justify-center items-center h-32 bg-neutral-100 dark:bg-neutral-900">
        <CircularProgress />
      </div>
    );
  }

  if (episode?.error) {
    return (
      <div className="error-section bg-red-200 dark:bg-red-800 p-4 rounded-md">
        <p className="text-red-800 dark:text-red-200">{episode.error}</p>
      </div>
    );
  }

  return (
    <section className="streaming-section p-4 bg-neutral-50 dark:bg-neutral-900 rounded-md shadow-md my-2">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
        {episode?.anime_info.title}
      </h2>
      <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
        Category: {episode?.anime_info.category}
      </p>
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
        Episode: {episode?.episode_info.title}
      </h3>
      <div className="mt-4 flex items-center justify-start gap-2">
        {episode && episode.stream_links.length > 0 ? (
          episode.stream_links.map((link, index) => (
            <button
              key={index}
              onClick={() => handleChangeStreamer({
                type:link.name,
                url: link.url,
              })}
              className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {link.name}
            </button>
          ))
        ) : (
          <p className="text-neutral-700 dark:text-neutral-300">
            No streaming links available.
          </p>
        )}
      </div>
    </section>
  );
};

export default StreamingSection;
