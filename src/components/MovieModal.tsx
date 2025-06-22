import React from 'react';
import { X, Play, Plus, ThumbsUp, ThumbsDown, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
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

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose, onPlay }) => {
  if (!movie) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-netflix-black border-gray-700 p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <h2>{movie.title}</h2>
        </DialogHeader>

        {/* Video Section */}
        <div className="relative aspect-video">
          <VideoPlayer
            src={movie.videoUrl}
            poster={movie.thumbnail}
            autoPlay={true}
            muted={true}
            controls={true}
            className="w-full h-full"
          />

          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-black/90 p-0 flex items-center justify-center z-10"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-black to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title and Actions */}
              <div className="mb-6">
                <h1 className="text-white text-3xl font-bold mb-4">{movie.title}</h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <Button
                    onClick={() => onPlay(movie)}
                    className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-2 rounded flex items-center space-x-2"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Play</span>
                  </Button>

                  <Button
                    variant="ghost"
                    className="text-white border border-gray-500 hover:border-white px-4 py-2 rounded flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>My List</span>
                  </Button>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-10 h-10 rounded-full border border-gray-500 text-white hover:border-white p-0 flex items-center justify-center"
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-10 h-10 rounded-full border border-gray-500 text-white hover:border-white p-0 flex items-center justify-center"
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Match Score and Rating */}
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-green-500 font-semibold">97% Match</span>
                  <span className="border border-gray-500 px-2 py-1 text-xs text-gray-300">{movie.rating}</span>
                  <span className="text-gray-300">{movie.year}</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 border border-gray-500 flex items-center justify-center">
                      <span className="text-xs text-gray-300">HD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movie.title === "Stranger Things" 
                    ? "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl."
                    : movie.title === "The Crown"
                    ? "This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century."
                    : movie.title === "Squid Game"
                    ? "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes."
                    : "An engaging story that captivates audiences with compelling characters and thrilling plot developments that keep you on the edge of your seat."
                  }
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Cast and Crew */}
              <div className="mb-6">
                <div className="text-gray-400 text-sm mb-2">
                  <span className="text-gray-300">Cast:</span> Millie Bobby Brown, Finn Wolfhard, David Harbour, Winona Ryder
                </div>
                <div className="text-gray-400 text-sm mb-2">
                  <span className="text-gray-300">Genres:</span> {movie.genre}
                </div>
                <div className="text-gray-400 text-sm">
                  <span className="text-gray-300">This show is:</span> Suspenseful, Sci-Fi TV Shows, Teen TV Shows
                </div>
              </div>

              {/* More Like This */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">More Like This</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex space-x-3">
                      <div className="flex-shrink-0 w-24 h-14 bg-gray-700 rounded"></div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">Similar Content {item}</h4>
                        <p className="text-gray-400 text-xs">Thrilling adventures await...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieModal;
