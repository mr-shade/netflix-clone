import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
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
}

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onInfo: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay, onInfo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer transition-all duration-300 transform hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Card */}
      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-gray-800">
        {!isHovered ? (
          <>
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                // Fallback to a placeholder color
                e.currentTarget.style.display = 'none';
              }}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                <span className="text-white text-sm">{movie.title}</span>
              </div>
            )}
            
            {/* Title overlay on base card */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
            </div>
          </>
        ) : (
          /* Expanded Card on Hover */
          <div className="absolute inset-0 bg-netflix-black rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
            {/* Video Preview */}
            <div className="relative w-full aspect-[16/9]">
              <VideoPlayer
                src={movie.videoUrl}
                poster={movie.thumbnail}
                autoPlay={true}
                muted={true}
                controls={false}
                className="w-full h-full"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => onPlay(movie)}
                    className="w-8 h-8 rounded-full bg-white text-black hover:bg-gray-200 p-0 flex items-center justify-center"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 rounded-full border border-gray-500 text-white hover:border-white p-0 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 rounded-full border border-gray-500 text-white hover:border-white p-0 flex items-center justify-center"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onInfo(movie)}
                  className="w-8 h-8 rounded-full border border-gray-500 text-white hover:border-white p-0 flex items-center justify-center"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              {/* Movie Info */}
              <h3 className="text-white font-semibold text-sm mb-2">{movie.title}</h3>
              
              <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                <span className="text-green-500 font-medium">98% Match</span>
                <span className="border border-gray-500 px-1 text-xs">{movie.rating}</span>
                <span>{movie.year}</span>
              </div>

              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <span>{movie.genre}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
