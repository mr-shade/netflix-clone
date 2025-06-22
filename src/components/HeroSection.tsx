import React from 'react';
import { Play, Info, Plus } from 'lucide-react';
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
}

interface HeroSectionProps {
  content: HeroContent;
  onPlayClick: () => void;
  onInfoClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content, onPlayClick, onInfoClick }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <VideoPlayer
          src={content.videoUrl}
          poster={content.thumbnail}
          autoPlay={true}
          muted={true}
          controls={false}
          className="w-full h-full"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-4 md:px-8 lg:px-16 max-w-2xl">
          {/* Logo or Title */}
          {content.logo ? (
            <img 
              src={content.logo} 
              alt={content.title}
              className="w-auto h-20 md:h-32 mb-4 object-contain"
              onError={(e) => {
                // If logo fails to load, hide it and show text title
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              {content.title}
            </h1>
          )}

          {/* Metadata */}
          <div className="flex items-center space-x-4 mb-4 text-sm md:text-base">
            <span className="bg-netflix-red text-white px-2 py-1 text-xs font-bold">
              {content.rating}
            </span>
            <span className="text-white">{content.year}</span>
            <span className="text-white">{content.genre}</span>
            <span className="text-white">{content.duration}</span>
          </div>

          {/* Description */}
          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
            {content.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onPlayClick}
              className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 rounded flex items-center justify-center space-x-2 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </Button>

            <Button
              onClick={onInfoClick}
              variant="secondary"
              className="bg-gray-600/70 text-white hover:bg-gray-600/90 font-semibold px-8 py-3 rounded flex items-center justify-center space-x-2 transition-all"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:text-gray-300 border border-white/20 hover:border-white/40 px-8 py-3 rounded flex items-center justify-center space-x-2 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>My List</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default HeroSection;
