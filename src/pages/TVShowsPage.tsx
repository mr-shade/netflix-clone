import React, { useState, useEffect } from 'react';
import ContentRow from '../components/ContentRow';
import LoadingSkeleton from '../components/LoadingSkeleton';

interface Movie {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  year: string;
  genre: string;
  rating: string;
  duration?: string;
  matchPercentage?: number;
  description?: string;
  cast?: string[];
  type?: 'movie' | 'series';
}

interface TVShowsPageProps {
  onPlayMovie?: (movie: Movie) => void;
  onMovieInfo?: (movie: Movie) => void;
}

const TVShowsPage: React.FC<TVShowsPageProps> = ({ onPlayMovie, onMovieInfo }) => {
  const [tvShows, setTvShows] = useState<{
    featured: Movie[];
    originals: Movie[];
    drama: Movie[];
    comedy: Movie[];
    crime: Movie[];
    scifi: Movie[];
    reality: Movie[];
    international: Movie[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const handlePlayMovie = (movie: Movie) => {
    if (onPlayMovie) {
      onPlayMovie(movie);
    } else {
      console.log('Playing TV show:', movie.title);
    }
  };

  const handleMovieInfo = (movie: Movie) => {
    if (onMovieInfo) {
      onMovieInfo(movie);
    } else {
      console.log('TV show info:', movie.title);
    }
  };

  useEffect(() => {
    const loadTVShows = async () => {
      try {
        const response = await fetch('/data/movies.json');
        const data = await response.json();
        
        // Filter and categorize TV shows
        const allContent = [
          ...data.categories.trending,
          ...data.categories.popular,
          ...data.categories.originals,
          ...data.categories.action
        ];

        // Mock TV show categorization (in real app, this would come from API)
        const tvShowsData = {
          featured: allContent.slice(0, 8).map((show: Movie) => ({
            ...show,
            type: 'series' as const,
            duration: `${Math.floor(Math.random() * 5) + 1} Seasons`
          })),
          originals: allContent.slice(2, 10).map((show: Movie) => ({
            ...show,
            type: 'series' as const,
            duration: `${Math.floor(Math.random() * 4) + 1} Seasons`
          })),
          drama: allContent.slice(1, 9).map((show: Movie) => ({
            ...show,
            type: 'series' as const,
            genre: 'Drama',
            duration: `${Math.floor(Math.random() * 6) + 1} Seasons`
          })),
          comedy: allContent.slice(3, 11).map((show: Movie) => ({
            ...show,
            type: 'series' as const,
            genre: 'Comedy',
            duration: `${Math.floor(Math.random() * 3) + 1} Seasons`
          })),
          crime: allContent.slice(0, 8).map((show: Movie) => ({
            ...show,
            type: 'series' as const,
            genre: 'Crime',
            duration: `${Math.floor(Math.random() * 4) + 2} Seasons`
          })),
          scifi: allContent.slice(2, 10).map((show: Movie) => ({
            ...show,
            type: 'series' as const,
            genre: 'Sci-Fi',
            duration: `${Math.floor(Math.random() * 3) + 1} Seasons`
          })),
          reality: allContent.slice(1, 9).map((show: Movie) => ({
            ...show,
            type: 'series' as const,
            genre: 'Reality TV',
            duration: `${Math.floor(Math.random() * 2) + 1} Seasons`
          })),
          international: allContent.slice(4, 12).map((show: Movie) => ({
            ...show,
            type: 'series' as const,
            genre: 'International',
            duration: `${Math.floor(Math.random() * 3) + 1} Seasons`
          }))
        };

        setTvShows(tvShowsData);
      } catch (error) {
        console.error('Error loading TV shows:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTVShows();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="px-4 md:px-8 lg:px-16 mb-8">
          <div className="h-12 w-48 bg-gray-800 rounded animate-pulse"></div>
        </div>
        <LoadingSkeleton type="row" />
        <LoadingSkeleton type="row" />
        <LoadingSkeleton type="row" />
      </div>
    );
  }

  if (!tvShows) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Failed to load TV shows</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Page Header */}
      <div className="px-4 md:px-8 lg:px-16 mb-8">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">TV Shows</h1>
        <p className="text-gray-300 text-lg max-w-2xl">
          From award-winning dramas to laugh-out-loud comedies, discover your next binge-worthy series.
        </p>
      </div>

      {/* Content Rows */}
      <div className="space-y-8">
        <ContentRow
          title="Featured TV Shows"
          movies={tvShows.featured}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
          priority={true}
        />

        <ContentRow
          title="Netflix Original Series"
          movies={tvShows.originals}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Drama Series"
          movies={tvShows.drama}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Comedy Series"
          movies={tvShows.comedy}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Crime Shows"
          movies={tvShows.crime}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Sci-Fi & Fantasy"
          movies={tvShows.scifi}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Reality TV"
          movies={tvShows.reality}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="International TV Shows"
          movies={tvShows.international}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />
      </div>
    </div>
  );
};

export default TVShowsPage;
