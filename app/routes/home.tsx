import React, { useCallback, useMemo } from "react";
import { AppLayout } from "../components/layout/app_layout";
import { FeaturedCarousel, MovieList } from "../components/ui";
import { HomeSkeleton, HomeError, HomeStats } from "../components/home";
import { useHomeData } from "../../lib/providers/anikii/hooks";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Anikii" },
    { name: "description", content: "Welcome to Anikii - Your anime discovery platform" },
  ];
}

const HomeComponent = () => {
  const { data: homeData, loading: isLoading, error: hasError } = useHomeData();

  const popularAnime = useMemo(() => homeData?.popular?.data || [], [homeData?.popular?.data]);
  const recentReleases = useMemo(() => homeData?.releases?.data || [], [homeData?.releases?.data]);
  const upcomingAnime = useMemo(() => homeData?.upcoming?.data || [], [homeData?.upcoming?.data]);
  const featuredAnime = useMemo(() => popularAnime.slice(0, 5), [popularAnime]);

  const handleRetry = useCallback(() => window.location.reload(), []);

  if (isLoading) return <AppLayout><HomeSkeleton /></AppLayout>;
  if (hasError) return <AppLayout><HomeError error={hasError} onRetry={handleRetry} /></AppLayout>;

  return (
    <AppLayout>
      {featuredAnime.length > 0 && (
        <FeaturedCarousel animes={featuredAnime} autoPlay={true} interval={6000} showThumbnails={true} />
      )}

      <div className="space-y-8 mt-8 sm:mt-12 md:mt-16">
        {popularAnime.length > 0 && (
          <Section wrapperColor="primary" bgColor="base-100">
            <MovieList animes={popularAnime.slice(0, 6)} title="🔥 Popular This Season" gridCols="lg" cardSize="md" />
          </Section>
        )}

        {recentReleases.length > 0 && (
          <Section wrapperColor="secondary" bgColor="base-100">
            <MovieList animes={recentReleases.slice(0, 6)} title="✨ Recent Releases" gridCols="lg" cardSize="sm" />
          </Section>
        )}

        {upcomingAnime.length > 0 && (
          <Section wrapperColor="accent" bgColor="base-100">
            <MovieList animes={upcomingAnime.slice(0, 8)} title="🎯 Recommended For You" gridCols="lg" cardSize="md" />
          </Section>
        )}
      </div>

      <HomeStats />
    </AppLayout>
  );
};

const Section = ({ children, wrapperColor }: { children: React.ReactNode; wrapperColor: string; bgColor: string }) => (
  <div className="relative">
    <div className="absolute inset-0 rounded-3xl opacity-10" style={{ backgroundColor: `var(--color-${wrapperColor})` }} />
    <div className="relative backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-base-300/20 shadow-2xl bg-base-100/80">
      {children}
    </div>
  </div>
);

export default React.memo(HomeComponent);
