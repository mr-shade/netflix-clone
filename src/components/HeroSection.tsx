import React, { useState, useEffect } from 'react';
import { Play, Info, Plus, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import VideoPlayer from './VideoPlayer';

interface HeroContent {
  id: string;
  title: string;
  description: string;
  year: string;
  genre: string;
  rating: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  logo?: string;
  creators?: string[];
  cast?: string[];
}

interface HeroSectionProps {
  content: HeroContent;
  onPlayClick: () => void;
  onInfoClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content, onPlayClick, onInfoClick }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showReplay, setShowReplay] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Auto-unmute after 3 seconds if user hasn't interacted
    const timer = setTimeout(() => {
      if (isMuted && isVideoLoaded) {
        setIsMuted(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isMuted, isVideoLoaded]);

  const handleVideoEnd = () => {
    setShowReplay(true);
  };

  const handleReplay = () => {
    setShowReplay(false);
    // Video replay logic would go here
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <VideoPlayer
          src={content.videoUrl}
          poster={content.thumbnail}
          autoPlay={true}
          muted={isMuted}
          controls={false}
          className="w-full h-full object-cover"
        />
        
        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Video Controls */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        {showReplay && (
          <Button
            onClick={handleReplay}
            variant="ghost"
            size="sm"
            className="bg-black/60 text-white hover:bg-black/80 rounded-full p-3 backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        )}
        
        <Button
          onClick={() => setIsMuted(!isMuted)}
          variant="ghost"
          size="sm"
          className="bg-black/60 text-white hover:bg-black/80 rounded-full p-3 backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-300"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-4 md:px-8 lg:px-16 max-w-3xl animate-slideUp">
          {/* Logo or Title */}
          {content.logo ? (
            <div className="mb-6">
              <img 
                src={content.logo} 
                alt={content.title}
                className="w-auto h-24 md:h-40 lg:h-48 max-w-lg object-contain drop-shadow-2xl animate-scaleIn"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
              {content.title}
            </h1>
          )}

          {/* Enhanced Metadata */}
          <div className="flex items-center space-x-4 mb-6 text-sm md:text-base">
            <span className="bg-netflix-red text-white px-3 py-1 text-sm font-bold rounded">
              {content.rating}
            </span>
            <span className="text-white font-semibold">{content.year}</span>
            <span className="border border-gray-400 text-gray-300 px-2 py-0.5 text-xs rounded">
              HD
            </span>
            <span className="text-gray-300">{content.duration}</span>
            <div className="flex space-x-1">
              {content.genre.split(',').slice(0, 2).map((genre, index) => (
                <span key={index} className="text-gray-300 text-sm">
                  {genre.trim()}{index === 0 && content.genre.includes(',') ? ' •' : ''}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced Description */}
          <p className="text-white text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed max-w-2xl font-medium drop-shadow-lg">
            {content.description}
          </p>

          {/* Cast/Creator Info */}
          {(content.cast || content.creators) && (
            <div className="mb-6 text-gray-300 text-sm md:text-base">
              {content.creators && (
                <p className="mb-1">
                  <span className="text-gray-400">Created by:</span> {content.creators.slice(0, 2).join(', ')}
                </p>
              )}
              {content.cast && (
                <p>
                  <span className="text-gray-400">Starring:</span> {content.cast.slice(0, 3).join(', ')}
                </p>
              )}
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onPlayClick}
              className="bg-white text-black hover:bg-gray-200 font-bold px-8 py-3 rounded-md flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-xl text-lg group"
            >
              <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
              <span>Play</span>
            </Button>

            <Button
              onClick={onInfoClick}
              variant="secondary"
              className="bg-gray-600/80 text-white hover:bg-gray-600/90 backdrop-blur-sm font-bold px-8 py-3 rounded-md flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-xl text-lg group border border-white/20"
            >
              <Info className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>More Info</span>
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:text-gray-300 border-2 border-white/30 hover:border-white/60 hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-md flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-xl text-lg group"
            >
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>My List</span>
            </Button>
          </div>

          {/* Maturity Rating & Tags */}
          <div className="mt-8 flex items-center space-x-4 text-xs text-gray-400">
            <span className="border border-gray-600 px-2 py-1 rounded">
              Maturity Rating: {content.rating}
            </span>
            <span>Violence, Adult Content</span>
          </div>
        </div>
      </div>

      {/* Enhanced fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
