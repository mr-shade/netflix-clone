import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  year: string;
  genre: string;
  rating: string;
}

interface ContentRowProps {
  title: string;
  movies: Movie[];
  onPlayMovie: (movie: Movie) => void;
  onMovieInfo: (movie: Movie) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, movies, onPlayMovie, onMovieInfo }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative group mb-8">
      {/* Row Title */}
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-8 lg:px-16">
        {title}
      </h2>

      {/* Movies Container */}
      <div className="relative">
        {/* Left Scroll Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Right Scroll Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Scrollable Movies */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-16 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="flex-none w-48 md:w-64 lg:w-72"
              style={{ scrollSnapAlign: 'start' }}
            >
              <MovieCard
                movie={movie}
                onPlay={onPlayMovie}
                onInfo={onMovieInfo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
