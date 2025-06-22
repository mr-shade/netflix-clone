import React, { useState, useRef, useEffect } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown, Volume2, VolumeX, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';
import VideoPlayer from './VideoPlayer';

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

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onInfo: (movie: Movie) => void;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay, onInfo, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showFullInfo, setShowFullInfo] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const expandTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      expandTimeoutRef.current = setTimeout(() => {
        setIsExpanded(true);
      }, 500); // Delay before showing expanded card
    }, 300); // Delay before hover effect
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current);
    }
    setIsHovered(false);
    setIsExpanded(false);
    setShowFullInfo(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
      }
    };
  }, []);

  const matchPercentage = movie.matchPercentage || Math.floor(Math.random() * 20) + 80;
  const duration = movie.duration || `${Math.floor(Math.random() * 60) + 90}m`;

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-500 ease-out transform-gpu ${
        isHovered ? 'scale-150 z-50' : 'scale-100 z-10'
      } ${isExpanded ? 'translate-y-[-20%]' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transitionDelay: isHovered ? `${index * 100}ms` : '0ms'
      }}
    >
      {/* Base Card */}
      <div className={`relative w-full aspect-[16/9] rounded-md overflow-hidden bg-gray-900 shadow-lg ${
        isHovered ? 'shadow-2xl shadow-black/50' : 'shadow-md'
      }`}>
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        )}

        {!isHovered ? (
          <>
            {/* Thumbnail Image */}
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-semibold text-sm mb-1 truncate">{movie.title}</h3>
              <div className="flex items-center space-x-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-green-400 font-medium">{matchPercentage}% Match</span>
                <span className="border border-gray-500 px-1">{movie.rating}</span>
                <span>{movie.year}</span>
              </div>
            </div>
          </>
        ) : (
          /* Expanded Hover Card */
          <div className="absolute inset-0 bg-netflix-black rounded-lg shadow-2xl border border-gray-700 overflow-hidden transform scale-100 origin-center">
            {/* Video Preview */}
            <div className="relative w-full aspect-[16/9] bg-black">
              <VideoPlayer
                src={movie.videoUrl}
                poster={movie.thumbnail}
                autoPlay={isExpanded}
                muted={isMuted}
                controls={false}
                className="w-full h-full"
              />
              
              {/* Video controls overlay */}
              <div className="absolute bottom-2 right-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 p-0 backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>

              {/* Progress indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div className="h-full bg-netflix-red w-1/3 animate-pulse"></div>
              </div>
            </div>

            {/* Enhanced Content Section */}
            <div className="p-4 bg-gradient-to-b from-netflix-black to-black">
              {/* Primary Action Buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlay(movie);
                    }}
                    className="w-9 h-9 rounded-full bg-white text-black hover:bg-gray-200 p-0 flex items-center justify-center transform hover:scale-110 transition-transform duration-200 shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-9 h-9 rounded-full border-2 border-gray-400 text-white hover:border-white hover:bg-white/10 p-0 flex items-center justify-center transform hover:scale-110 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-9 h-9 rounded-full border-2 border-gray-400 text-white hover:border-white hover:bg-white/10 p-0 flex items-center justify-center transform hover:scale-110 transition-all duration-200"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onInfo(movie);
                  }}
                  className="w-9 h-9 rounded-full border-2 border-gray-400 text-white hover:border-white hover:bg-white/10 p-0 flex items-center justify-center transform hover:scale-110 transition-all duration-200"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              {/* Movie Title */}
              <h3 className="text-white font-bold text-base mb-2 leading-tight">{movie.title}</h3>
              
              {/* Enhanced Metadata */}
              <div className="flex items-center space-x-3 text-xs mb-3">
                <span className="text-green-400 font-semibold flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {matchPercentage}% Match
                </span>
                <span className="border border-gray-500 px-2 py-0.5 text-xs font-medium text-gray-300">
                  {movie.rating}
                </span>
                <span className="text-gray-300 font-medium">{movie.year}</span>
                <span className="flex items-center text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {duration}
                </span>
              </div>

              {/* Genre tags */}
              <div className="flex items-center space-x-2 mb-3">
                {movie.genre.split(',').map((genre, idx) => (
                  <span key={idx} className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded-full">
                    {genre.trim()}
                  </span>
                ))}
              </div>

              {/* Description preview */}
              {isExpanded && (
                <div className="animate-fadeIn">
                  <p className="text-gray-300 text-xs leading-relaxed mb-2 line-clamp-2">
                    {movie.description || "An exciting story that will keep you on the edge of your seat with compelling characters and thrilling plot developments."}
                  </p>
                  
                  {/* Cast preview */}
                  {movie.cast && (
                    <div className="text-xs text-gray-400">
                      <span className="text-gray-300">Starring: </span>
                      {movie.cast.slice(0, 2).join(', ')}
                      {movie.cast.length > 2 && '...'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
