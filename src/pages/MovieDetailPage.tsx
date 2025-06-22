import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ThumbsDown, Share2, Download, ChevronDown, Star, Calendar, Clock, Globe, Users, Award } from 'lucide-react';
import NetflixHeader from '../components/NetflixHeader';
import ContentRow from '../components/ContentRow';
import LoadingSkeleton from '../components/LoadingSkeleton';
import NetflixFooter from '../components/NetflixFooter';
import { Button } from '../components/ui/button';

interface MovieDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  year: string;
  genre: string[];
  rating: string;
  duration: string;
  thumbnail: string;
  backdropImage: string;
  videoUrl: string;
  logoImage?: string;
  director: string;
  cast: string[];
  creators?: string[];
  seasons?: number;
  episodes?: number;
  language: string;
  country: string;
  awards: string[];
  imdbRating: number;
  netflixRating: number;
  releaseDate: string;
  ageRating: string;
  tags: string[];
  trailerUrl: string;
  isInMyList: boolean;
  liked?: boolean;
  disliked?: boolean;
}

interface Movie {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  year: string;
  genre: string;
  rating: string;
}

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [moreFromDirector, setMoreFromDirector] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<'episodes' | 'trailers' | 'more'>('episodes');
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handlePlayMovie = (movie: Movie) => {
    console.log('Playing movie:', movie.title);
  };

  const handleMovieInfo = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handlePlay = () => {
    console.log('Playing main movie');
    setIsTrailerPlaying(true);
  };

  const handleAddToList = () => {
    if (movieDetail) {
      setMovieDetail({ ...movieDetail, isInMyList: !movieDetail.isInMyList });
    }
  };

  const handleLike = () => {
    if (movieDetail) {
      setMovieDetail({
        ...movieDetail,
        liked: !movieDetail.liked,
        disliked: movieDetail.liked ? movieDetail.disliked : false
      });
    }
  };

  const handleDislike = () => {
    if (movieDetail) {
      setMovieDetail({
        ...movieDetail,
        disliked: !movieDetail.disliked,
        liked: movieDetail.disliked ? movieDetail.liked : false
      });
    }
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock detailed movie data
        const mockMovieDetail: MovieDetail = {
          id: id,
          title: 'Stranger Things',
          description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
          longDescription: 'Set in 1980s Indiana, Stranger Things follows the residents of the fictional town of Hawkins as they discover dark secrets about a nearby government laboratory. When young Will Byers disappears, his mother Joyce teams up with the town sheriff to find him. Meanwhile, Will\'s friends discover a mysterious girl with psychokinetic abilities who may hold the key to finding their missing friend. As they delve deeper into the mystery, they uncover a parallel dimension called the Upside Down and face terrifying creatures that threaten their world.',
          year: '2016',
          genre: ['Sci-Fi', 'Drama', 'Horror', 'Thriller'],
          rating: 'TV-14',
          duration: '4 Seasons',
          thumbnail: '/images/featured/stranger-things.jpg',
          backdropImage: '/images/featured/stranger-things.jpg',
          videoUrl: '/videos/stranger-things-trailer.mp4',
          logoImage: '/images/logos/stranger-things-logo.png',
          director: 'The Duffer Brothers',
          cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Gaten Matarazzo', 'Caleb McLaughlin', 'Noah Schnapp', 'Sadie Sink', 'Natalia Dyer', 'Charlie Heaton', 'Joe Keery', 'Maya Hawke', 'Priah Ferguson', 'Brett Gelman', 'Cara Buono', 'Sean Astin', 'Paul Reiser', 'Dacre Montgomery', 'Matthew Modine'],
          creators: ['Matt Duffer', 'Ross Duffer'],
          seasons: 4,
          episodes: 34,
          language: 'English',
          country: 'United States',
          awards: ['Screen Actors Guild Award', 'People\'s Choice Award', 'Teen Choice Award'],
          imdbRating: 8.7,
          netflixRating: 96,
          releaseDate: '2016-07-15',
          ageRating: 'TV-14',
          tags: ['Supernatural', '80s', 'Friendship', 'Government Conspiracy', 'Parallel Dimensions'],
          trailerUrl: '/videos/stranger-things-trailer.mp4',
          isInMyList: false,
          liked: false,
          disliked: false
        };

        const mockSimilarMovies: Movie[] = [
          {
            id: 'similar-1',
            title: 'Dark',
            thumbnail: '/images/popular/dark.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2017',
            genre: 'Sci-Fi Mystery',
            rating: 'TV-MA'
          },
          {
            id: 'similar-2',
            title: 'The Umbrella Academy',
            thumbnail: '/images/originals/umbrella-academy.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2019',
            genre: 'Superhero Comedy',
            rating: 'TV-14'
          },
          {
            id: 'similar-3',
            title: 'Locke & Key',
            thumbnail: '/images/action/extraction.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2020',
            genre: 'Fantasy Horror',
            rating: 'TV-14'
          }
        ];

        const mockMoreFromDirector: Movie[] = [
          {
            id: 'director-1',
            title: 'Hidden',
            thumbnail: '/images/action/the-gray-man.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2015',
            genre: 'Horror Thriller',
            rating: 'R'
          }
        ];

        setMovieDetail(mockMovieDetail);
        setSimilarMovies(mockSimilarMovies);
        setMoreFromDirector(mockMoreFromDirector);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <NetflixHeader onSearch={handleSearch} />
        <div className="pt-16">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (!movieDetail) {
    return (
      <div className="min-h-screen bg-netflix-black text-white">
        <NetflixHeader onSearch={handleSearch} />
        <div className="pt-16 px-4 md:px-12 lg:px-16 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-gray-400 mb-8">The movie you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} className="bg-netflix-red hover:bg-red-700">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <NetflixHeader onSearch={handleSearch} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative">
          {/* Background Image */}
          <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transform scale-105"
              style={{ 
                backgroundImage: `url(${movieDetail.backdropImage})`,
                objectPosition: 'top' // Crop from top for authenticity
              }}
            />
            {/* Video Overlay */}
            {isTrailerPlaying && (
              <div className="absolute inset-0 z-10">
                <video
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover object-top" // Crop top part
                  style={{ objectPosition: '50% 20%' }} // Show middle-lower part of video
                >
                  <source src={movieDetail.trailerUrl} type="video/mp4" />
                </video>
              </div>
            )}
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-4 md:px-12 lg:px-16 max-w-4xl">
              {/* Logo or Title */}
              {movieDetail.logoImage ? (
                <img 
                  src={movieDetail.logoImage} 
                  alt={movieDetail.title}
                  className="w-full max-w-md h-auto mb-6"
                />
              ) : (
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg">
                  {movieDetail.title}
                </h1>
              )}

              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-4 text-sm md:text-base">
                <span className="text-green-400 font-semibold">{movieDetail.netflixRating}% Match</span>
                <span>{movieDetail.year}</span>
                <span className="px-2 py-1 border border-gray-400 text-xs">{movieDetail.ageRating}</span>
                <span>{movieDetail.duration}</span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {movieDetail.language}
                </span>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl mb-8 max-w-2xl text-shadow leading-relaxed">
                {movieDetail.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  onClick={handlePlay}
                  className="bg-white hover:bg-gray-200 text-black font-semibold text-lg px-8 py-3 rounded-md flex items-center gap-2"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Play
                </Button>
                <Button
                  onClick={handleAddToList}
                  variant="outline"
                  className={`border-2 font-semibold text-lg px-8 py-3 rounded-md flex items-center gap-2 ${
                    movieDetail.isInMyList
                      ? 'bg-green-600 border-green-600 text-white hover:bg-green-700'
                      : 'border-gray-400 text-white hover:border-white'
                  }`}
                >
                  <Plus className="w-6 h-6" />
                  {movieDetail.isInMyList ? 'Added' : 'My List'}
                </Button>
              </div>

              {/* Rating Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-full border border-gray-400 hover:border-white transition-colors ${
                    movieDetail.liked ? 'bg-green-600 border-green-600' : ''
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDislike}
                  className={`p-2 rounded-full border border-gray-400 hover:border-white transition-colors ${
                    movieDetail.disliked ? 'bg-red-600 border-red-600' : ''
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full border border-gray-400 hover:border-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full border border-gray-400 hover:border-white transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-4 md:px-12 lg:px-16 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex border-b border-gray-700 mb-6">
                <button
                  onClick={() => setActiveTab('episodes')}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === 'episodes' ? 'border-b-2 border-netflix-red text-white' : 'text-gray-400'
                  }`}
                >
                  Episodes
                </button>
                <button
                  onClick={() => setActiveTab('trailers')}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === 'trailers' ? 'border-b-2 border-netflix-red text-white' : 'text-gray-400'
                  }`}
                >
                  Trailers & More
                </button>
                <button
                  onClick={() => setActiveTab('more')}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === 'more' ? 'border-b-2 border-netflix-red text-white' : 'text-gray-400'
                  }`}
                >
                  More Details
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'episodes' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Season 1</h3>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((episode) => (
                      <div key={episode} className="flex gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 cursor-pointer">
                        <div className="text-2xl font-bold text-gray-500 w-8">{episode}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">Episode {episode}</h4>
                          <p className="text-gray-400 text-sm mb-2">45 min</p>
                          <p className="text-sm">Episode description goes here...</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-full hover:bg-gray-700">
                            <Play className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-full hover:bg-gray-700">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'trailers' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Trailers & Clips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                      <div className="aspect-video bg-gray-800 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold">Official Trailer</h4>
                        <p className="text-sm text-gray-400">2:30</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'more' && (
                <div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Synopsis</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {showFullDescription ? movieDetail.longDescription : movieDetail.description}
                      </p>
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-netflix-red hover:underline mt-2 flex items-center gap-1"
                      >
                        {showFullDescription ? 'Show Less' : 'Show More'}
                        <ChevronDown className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Cast</h3>
                      <div className="flex flex-wrap gap-2">
                        {movieDetail.cast.slice(0, 8).map((actor) => (
                          <span key={actor} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                            {actor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">IMDb Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{movieDetail.imdbRating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Release Date</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(movieDetail.releaseDate).getFullYear()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Runtime</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{movieDetail.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Language</span>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <span>{movieDetail.language}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movieDetail.genre.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-netflix-red rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {movieDetail.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Awards */}
              {movieDetail.awards.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Awards
                  </h3>
                  <ul className="space-y-1">
                    {movieDetail.awards.map((award) => (
                      <li key={award} className="text-sm text-gray-400">• {award}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Content */}
        {similarMovies.length > 0 && (
          <div className="px-4 md:px-12 lg:px-16">
            <ContentRow
              title="More Like This"
              movies={similarMovies}
              onPlayMovie={handlePlayMovie}
              onMovieInfo={handleMovieInfo}
            />
          </div>
        )}

        {/* More from Director */}
        {moreFromDirector.length > 0 && (
          <div className="px-4 md:px-12 lg:px-16">
            <ContentRow
              title={`More from ${movieDetail.director}`}
              movies={moreFromDirector}
              onPlayMovie={handlePlayMovie}
              onMovieInfo={handleMovieInfo}
            />
          </div>
        )}
      </main>

      <NetflixFooter />
    </div>
  );
};

export default MovieDetailPage;
