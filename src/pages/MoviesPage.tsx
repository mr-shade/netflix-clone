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

interface MoviesPageProps {
  onPlayMovie?: (movie: Movie) => void;
  onMovieInfo?: (movie: Movie) => void;
}

const MoviesPage: React.FC<MoviesPageProps> = ({ onPlayMovie, onMovieInfo }) => {
  const [movies, setMovies] = useState<{
    blockbusters: Movie[];
    action: Movie[];
    comedy: Movie[];
    drama: Movie[];
    horror: Movie[];
    romance: Movie[];
    thriller: Movie[];
    documentary: Movie[];
    international: Movie[];
    indie: Movie[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetch('/data/movies.json');
        const data = await response.json();
        
        // Categorize movies
        const allContent = [
          ...data.categories.trending,
          ...data.categories.popular,
          ...data.categories.originals,
          ...data.categories.action
        ];

        const moviesData = {
          blockbusters: allContent.slice(0, 8).map((movie: Movie) => ({
            ...movie,
            type: 'movie' as const,
            genre: 'Action',
            duration: `${Math.floor(Math.random() * 60) + 90}m`
          })),
          action: allContent.slice(1, 9).map((movie: Movie) => ({
            ...movie,
            type: 'movie' as const,
            genre: 'Action',
            duration: `${Math.floor(Math.random() * 40) + 100}m`
          })),
          comedy: allContent.slice(2, 10).map((movie: Movie) => ({
            ...movie,
            type: 'movie' as const,
            genre: 'Comedy',
            duration: `${Math.floor(Math.random() * 30) + 90}m`
          })),
          drama: allContent.slice(3, 11).map((movie: Movie) => ({
            ...movie,
            type: 'movie' as const,
            genre: 'Drama',
            duration: `${Math.floor(Math.random() * 50) + 105}m`
          })),
          horror: allContent.slice(0, 8).map((movie: Movie) => ({
            ...movie,
            type: 'movie' as const,
            genre: 'Horror',
            duration: `${Math.floor(Math.random() * 30) + 85}m`
          })),
          romance: allContent.slice(2, 10).map((movie: Movie) => ({
            ...movie,
            type: 'movie' as const,
            genre: 'Romance',
            duration: `${Math.floor(Math.random() * 40) + 95}m`
          })),
          thriller: allContent.slice(1, 9).map((movie: Movie) => ({
            ...movie,
            type: 'movie' as const,
            genre: 'Thriller',
            duration: `${Math.floor(Math.random() * 45) + 100}m`
          })),
          documentary: allContent.slice(4, 12).map((movie: Movie) => ({
            ...movie,
            type: 'movie' as const,
            genre: 'Documentary',
            duration: `${Math.floor(Math.random() * 60) + 80}m`
          })),
          international: allContent.slice(3, 11).map((movie: Movie) => ({
            ...movie,
            type: 'movie' as const,
            genre: 'International',
            duration: `${Math.floor(Math.random() * 50) + 95}m`
          })),
          indie: allContent.slice(5, 13).map((movie: Movie) => ({
            ...movie,
            type: 'movie' as const,
            genre: 'Independent',
            duration: `${Math.floor(Math.random() * 40) + 85}m`
          }))
        };

        setMovies(moviesData);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="px-4 md:px-8 lg:px-16 mb-8">
          <div className="h-12 w-32 bg-gray-800 rounded animate-pulse"></div>
        </div>
        <LoadingSkeleton type="row" />
        <LoadingSkeleton type="row" />
        <LoadingSkeleton type="row" />
      </div>
    );
  }

  if (!movies) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Failed to load movies</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Page Header */}
      <div className="px-4 md:px-8 lg:px-16 mb-8">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Movies</h1>
        <p className="text-gray-300 text-lg max-w-2xl">
          From blockbuster hits to indie gems, find the perfect movie for your mood.
        </p>
      </div>

      {/* Filter Pills (Future enhancement) */}
      <div className="px-4 md:px-8 lg:px-16 mb-8">
        <div className="flex flex-wrap gap-3">
          {['All Genres', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller'].map((genre) => (
            <button
              key={genre}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                genre === 'All Genres'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Content Rows */}
      <div className="space-y-8">
        <ContentRow
          title="Blockbuster Movies"
          movies={movies.blockbusters}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
          priority={true}
        />

        <ContentRow
          title="Action Movies"
          movies={movies.action}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Comedy Movies"
          movies={movies.comedy}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Drama Movies"
          movies={movies.drama}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Horror Movies"
          movies={movies.horror}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Romantic Movies"
          movies={movies.romance}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Thrillers"
          movies={movies.thriller}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Documentaries"
          movies={movies.documentary}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="International Movies"
          movies={movies.international}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />

        <ContentRow
          title="Independent Films"
          movies={movies.indie}
          onPlayMovie={onPlayMovie}
          onMovieInfo={onMovieInfo}
        />
      </div>
    </div>
  );
};

export default MoviesPage;
