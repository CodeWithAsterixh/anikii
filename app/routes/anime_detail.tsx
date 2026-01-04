import { useParams } from "react-router";
import { MainLayout } from "../layouts/main_layout";
import { SectionTitle } from "../components/section_title/section_title";
import { EpisodeList } from "../components/episode_list/episode_list";
import { AnimeCard } from "../components/anime_card/anime_card";
import { use_anime } from "../hooks/use_anime";

export default function AnimeDetail() {
  const { id } = useParams();
  const anime_id = Number(id);
  const { details, recommended } = use_anime(anime_id);

  if (details.loading) return <MainLayout><div className="animate-pulse h-96 bg-base-200 rounded-box" /></MainLayout>;
  if (!details.data) return <MainLayout><div>Anime not found</div></MainLayout>;

  const anime = details.data.data;

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/4 shrink-0">
          <img 
            src={anime.coverImage.cover_image} 
            alt={anime.title.english || anime.title.romaji} 
            className="w-full rounded-box shadow-xl"
          />
        </div>
        
        <div className="flex-grow">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            {anime.title.english || anime.title.romaji}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {anime.genres.map(genre => (
              <span key={genre} className="bg-base-200 px-3 py-1 rounded-full text-xs font-semibold">
                {genre}
              </span>
            ))}
          </div>
          <p className="text-base-content/80 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: anime.description }} />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-base-200">
            <div>
              <p className="text-xs opacity-50 uppercase font-bold">Status</p>
              <p className="font-semibold">{anime.status}</p>
            </div>
            <div>
              <p className="text-xs opacity-50 uppercase font-bold">Format</p>
              <p className="font-semibold">{anime.format}</p>
            </div>
            <div>
              <p className="text-xs opacity-50 uppercase font-bold">Episodes</p>
              <p className="font-semibold">{anime.episodes}</p>
            </div>
            <div>
              <p className="text-xs opacity-50 uppercase font-bold">Season</p>
              <p className="font-semibold">{anime.season.type} {anime.season.year}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <SectionTitle title="Episodes" />
        <EpisodeList anime_id={anime_id} total_episodes={anime.episodes} />
      </section>

      {recommended.data && (
        <section>
          <SectionTitle title="Recommended For You" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {recommended.data.data.data.map((rec) => (
              <AnimeCard key={rec.id} anime={rec} />
            ))}
          </div>
        </section>
      )}
    </MainLayout>
  );
}
