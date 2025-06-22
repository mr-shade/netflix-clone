import React, { useRef, useState, useEffect } from 'react';
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
  duration?: string;
  matchPercentage?: number;
  description?: string;
  cast?: string[];
}

interface ContentRowProps {
  title: string;
  movies: Movie[];
  onPlayMovie: (movie: Movie) => void;
  onMovieInfo: (movie: Movie) => void;
  priority?: boolean;
}

const ContentRow: React.FC<ContentRowProps> = ({ 
  title, 
  movies, 
  onPlayMovie, 
  onMovieInfo, 
  priority = false 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      return () => container.removeEventListener('scroll', checkScrollability);
    }
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container || isScrolling) return;

    setIsScrolling(true);
    const scrollAmount = container.clientWidth * 0.85;
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });

    // Reset scrolling state after animation
    setTimeout(() => setIsScrolling(false), 600);
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="relative group mb-12 overflow-hidden">
      {/* Enhanced Row Title */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 lg:px-16">
        <h2 className="text-white text-xl md:text-2xl font-bold flex items-center group-hover:text-gray-200 transition-colors duration-300">
          {title}
          {priority && (
            <span className="ml-3 text-xs bg-netflix-red text-white px-2 py-1 rounded-full font-semibold animate-pulse">
              HOT
            </span>
          )}
        </h2>
        
        {/* Explore All Link */}
        <button className="text-gray-400 hover:text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Explore All
          <ChevronRight className="w-4 h-4 inline ml-1" />
        </button>
      </div>

      {/* Movies Container */}
      <div className="relative">
        {/* Enhanced Left Scroll Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft || isScrolling}
          className={`absolute left-0 top-0 z-30 w-16 h-full bg-gradient-to-r from-black/80 via-black/60 to-transparent hover:from-black/90 hover:via-black/70 text-white transition-all duration-300 rounded-none ${
            canScrollLeft ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
          } ${isScrolling ? 'pointer-events-none' : ''}`}
        >
          <ChevronLeft className="w-8 h-8 drop-shadow-lg" />
        </Button>

        {/* Enhanced Right Scroll Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scroll('right')}
          disabled={!canScrollRight || isScrolling}
          className={`absolute right-0 top-0 z-30 w-16 h-full bg-gradient-to-l from-black/80 via-black/60 to-transparent hover:from-black/90 hover:via-black/70 text-white transition-all duration-300 rounded-none ${
            canScrollRight ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
          } ${isScrolling ? 'pointer-events-none' : ''}`}
        >
          <ChevronRight className="w-8 h-8 drop-shadow-lg" />
        </Button>

        {/* Scrollable Movies */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-1 md:space-x-2 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-16 pb-8 pt-2"
          style={{ 
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="flex-none w-48 md:w-56 lg:w-64 xl:w-72 first:ml-2 last:mr-2"
              style={{ scrollSnapAlign: 'start' }}
            >
              <MovieCard
                movie={movie}
                onPlay={onPlayMovie}
                onInfo={onMovieInfo}
                index={index}
              />
            </div>
          ))}
          
          {/* End spacer for better scrolling experience */}
          <div className="flex-none w-4" />
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 lg:left-16 lg:right-16 h-0.5 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div 
            className="h-full bg-netflix-red transition-all duration-300"
            style={{
              width: `${((scrollContainerRef.current?.scrollLeft || 0) / 
                Math.max((scrollContainerRef.current?.scrollWidth || 1) - (scrollContainerRef.current?.clientWidth || 0), 1)) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
