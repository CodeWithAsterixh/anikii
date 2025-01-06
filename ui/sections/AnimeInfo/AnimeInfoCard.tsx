import { AnimeInfo } from '@/lib/types/anime/__animeDetails';
import { Chip, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import Image from '../../components/Image/Image';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { responseStatus } from '@/store/reducers/listReducer';

type AnimeCardProps = {
  anime?: AnimeInfo | null; // null for loading state
  reloader?:React.ReactNode;
  status:responseStatus
};

const AnimeInfoCard: React.FC<AnimeCardProps> = ({ anime,status,reloader }) => {
    const {mode} = useSelector((s: RootState) => s.ThemePreference);

  if (status !=="done" || !anime?.data) {
    // Skeleton Loader for loading state
    return (
      <div className="!p-4 !mb-5 !bg-gradient-to-r relative !from-black/20 !to-black/35 !backdrop-blur-md dark:!from-black/80 dark:!to-black">
        {/* reloader */}
        {(status==="error"&&!anime?.data) &&reloader}
        <Skeleton variant="rectangular" className="!w-full !h-64 !rounded-lg !bg-base-white dark:!bg-base-black" />
        <Skeleton variant="text" className="!mt-4 !w-3/4 !h-6 !rounded !bg-base-white dark:!bg-base-black" />
        {
          status ==="done" == !anime?.data&&<span className='w-fit block absolute bg-white/30 dark:bg-black/30 backdrop-blur-lg rounded-md p-2 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
          <Typography className='!text-black dark:!text-white'>No detail available, please see other animes</Typography>
        </span>
        }
        <Skeleton variant="text" className="!mt-2 !w-1/2 !h-5 !rounded !bg-base-white dark:!bg-base-black" />
        <Skeleton variant="text" className="!mt-4 !w-full !h-4 !rounded !bg-base-white dark:!bg-base-black" />
      </div>
    );
  }
  const gradientEndColor = mode==="dark" ? 'black' : 'white';
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${anime.data.coverImage.color || '#ffffff'}, ${gradientEndColor})`,
  };

  return (
    <div
      className="p-4 isolate relative mb-5 rounded-md overflow-hidden"
    >
        <div className='size-full absolute -z-10 inset-0 opacity-20' style={gradientStyle}/>
        {anime.data.bannerImage&&<div className='size-full overflow-hidden absolute -z-20 brightness-[.3] inset-0'>
        <Image
            src={anime.data.bannerImage}
            alt={anime.data.title.romaji}
            width={300}
            height={450}
            className="!size-full blur-md"
          />
        </div>}
      <div className="flex flex-col sm:grid grid-cols-[300px,1fr] sm:items-stretch gap-4">
        {/* Cover Image */}
        <div className="flex-shrink-0 h-full sm:w-full overflow-hidden rounded-md">
          <Image
            src={anime.data.coverImage.extraLarge}
            alt={anime.data.title.romaji}
            width={300}
            height={450}
            className="!rounded-lg !size-full !object-center !object-cover hover:scale-150 duration-[10s]"
          />
        </div>

        {/* Anime Details */}
        <div>
          {/* Title */}
          <h2 className="text-2xl w-fit font-bold text-white border-b-4" style={{
            borderColor:anime.data.coverImage.color||"#fff"
          }}>
            {anime.data.title.english || anime.data.title.romaji}
          </h2>

          {/* Meta Information */}
          <p className="text-white text-sm mt-1">
            {anime.data.season} {anime.data.seasonYear} • {anime.data.status}
          </p>

          {/* Description */}
          <div
            className="text-white text-sm mt-3"
            dangerouslySetInnerHTML={{ __html: anime.data.description }}
          />

          {/* Genres */}
          <div className="mt-4 flex flex-wrap gap-2">
            {anime.data.genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                className="!bg-white !text-black dark:!bg-black dark:!text-white !text-xs"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfoCard;
