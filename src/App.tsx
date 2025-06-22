import React, { useState, useEffect } from 'react';
import './App.css';
import NetflixHeader from './components/NetflixHeader';
import HeroSection from './components/HeroSection';
import ContentRow from './components/ContentRow';
import MovieModal from './components/MovieModal';
import NetflixFooter from './components/NetflixFooter';

interface Movie {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  year: string;
  genre: string;
  rating: string;
}

interface FeaturedContent {
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

interface NetflixData {
  featured: FeaturedContent;
  categories: {
    trending: Movie[];
    popular: Movie[];
    originals: Movie[];
    action: Movie[];
  };
}

function App() {
  const [netflixData, setNetflixData] = useState<NetflixData | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState<Movie[]>([]);

  // Load Netflix data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/movies.json');
        const data = await response.json();
        setNetflixData(data);
      } catch (error) {
        console.error('Error loading Netflix data:', error);
        // Fallback data if JSON fails to load
        setNetflixData({
          featured: {
            id: "featured-1",
            title: "Stranger Things",
            description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
            year: "2016",
            genre: "Sci-Fi Horror",
            rating: "TV-14",
            duration: "51m",
            thumbnail: "/images/featured/stranger-things.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            logo: "/images/logos/stranger-things-logo.png"
          },
          categories: {
            trending: [],
            popular: [],
            originals: [],
            action: []
          }
        });
      }
    };

    loadData();
  }, []);

  // Handle search
  useEffect(() => {
    if (!netflixData || !searchQuery.trim()) {
      setFilteredContent([]);
      return;
    }

    const allMovies = [
      ...netflixData.categories.trending,
      ...netflixData.categories.popular,
      ...netflixData.categories.originals,
      ...netflixData.categories.action
    ];

    const filtered = allMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredContent(filtered);
  }, [searchQuery, netflixData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePlayMovie = (movie: Movie) => {
    console.log('Playing movie:', movie.title);
    // In a real app, this would navigate to a full-screen player
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleMovieInfo = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleHeroPlay = () => {
    if (netflixData?.featured) {
      console.log('Playing featured content:', netflixData.featured.title);
      // In a real app, this would start the featured content
    }
  };

  const handleHeroInfo = () => {
    if (netflixData?.featured) {
      const featuredAsMovie: Movie = {
        id: netflixData.featured.id,
        title: netflixData.featured.title,
        thumbnail: netflixData.featured.thumbnail,
        videoUrl: netflixData.featured.videoUrl,
        year: netflixData.featured.year,
        genre: netflixData.featured.genre,
        rating: netflixData.featured.rating
      };
      setSelectedMovie(featuredAsMovie);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (!netflixData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading Netflix...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <NetflixHeader onSearch={handleSearch} />

      {/* Main Content */}
      <main>
        {searchQuery.trim() ? (
          /* Search Results */
          <div className="pt-20 px-4 md:px-8 lg:px-16">
            <h2 className="text-white text-2xl font-semibold mb-8">
              Search Results for "{searchQuery}"
            </h2>
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredContent.map((movie) => (
                  <div key={movie.id} className="cursor-pointer" onClick={() => handleMovieInfo(movie)}>
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover rounded-lg hover:scale-105 transition-transform"
                    />
                    <h3 className="text-white text-sm mt-2 font-medium">{movie.title}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white text-lg">No results found</div>
            )}
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <HeroSection
              content={netflixData.featured}
              onPlayClick={handleHeroPlay}
              onInfoClick={handleHeroInfo}
            />

            {/* Content Rows */}
            <div className="relative z-10 -mt-32 bg-gradient-to-t from-black via-black to-transparent">
              <ContentRow
                title="Trending Now"
                movies={netflixData.categories.trending}
                onPlayMovie={handlePlayMovie}
                onMovieInfo={handleMovieInfo}
                priority={true}
              />

              <ContentRow
                title="Popular on Netflix"
                movies={netflixData.categories.popular}
                onPlayMovie={handlePlayMovie}
                onMovieInfo={handleMovieInfo}
              />

              <ContentRow
                title="Netflix Originals"
                movies={netflixData.categories.originals}
                onPlayMovie={handlePlayMovie}
                onMovieInfo={handleMovieInfo}
              />

              <ContentRow
                title="Action & Adventure"
                movies={netflixData.categories.action}
                onPlayMovie={handlePlayMovie}
                onMovieInfo={handleMovieInfo}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <NetflixFooter />

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPlay={handlePlayMovie}
      />
    </div>
  );
}

export default App;
