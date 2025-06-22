import React, { useState, useEffect } from 'react';
import NetflixHeader from '../components/NetflixHeader';
import HeroSection from '../components/HeroSection';
import ContentRow from '../components/ContentRow';
import LoadingSkeleton from '../components/LoadingSkeleton';
import NetflixFooter from '../components/NetflixFooter';

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

interface NetflixData {
  featured: {
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
  };
  categories: {
    trending: Movie[];
    popular: Movie[];
    originals: Movie[];
    action: Movie[];
    comedy?: Movie[];
    drama?: Movie[];
    thriller?: Movie[];
    documentary?: Movie[];
  };
}

interface HomePageProps {
  onPlayMovie?: (movie: Movie) => void;
  onMovieInfo?: (movie: Movie) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPlayMovie, onMovieInfo }) => {
  const [netflixData, setNetflixData] = useState<NetflixData | null>(null);
  const [loading, setLoading] = useState(true);

  const handlePlayMovie = (movie: Movie) => {
    if (onPlayMovie) {
      onPlayMovie(movie);
    } else {
      console.log('Playing movie:', movie.title);
      // Handle navigation to movie detail page or player
    }
  };

  const handleMovieInfo = (movie: Movie) => {
    if (onMovieInfo) {
      onMovieInfo(movie);
    } else {
      console.log('Movie info:', movie.title);
      // Handle navigation to movie detail page
    }
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // For immediate testing, let's use fallback data right away
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
            videoUrl: "/videos/stranger-things-trailer.mp4",
            logo: "/images/logos/stranger-things-logo.png",
            creators: ["The Duffer Brothers"],
            cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"]
          },
          categories: {
            trending: [
              { id: 'trending-1', title: 'The Crown', thumbnail: '/images/trending/the-crown.jpg', videoUrl: '/videos/the-crown-trailer.mp4', year: '2016', genre: 'Historical Drama', rating: 'TV-MA' },
              { id: 'trending-2', title: 'Squid Game', thumbnail: '/images/trending/squid-game.jpg', videoUrl: '/videos/squid-game-trailer.mp4', year: '2021', genre: 'Thriller', rating: 'TV-MA' },
            ],
            popular: [
              { id: 'popular-1', title: 'Breaking Bad', thumbnail: '/images/popular/breaking-bad.jpg', videoUrl: '/videos/stranger-things-trailer.mp4', year: '2008', genre: 'Crime Drama', rating: 'TV-MA' },
              { id: 'popular-2', title: 'Dark', thumbnail: '/images/popular/dark.jpg', videoUrl: '/videos/squid-game-trailer.mp4', year: '2017', genre: 'Sci-Fi', rating: 'TV-MA' },
            ],
            originals: [
              { id: 'originals-1', title: 'House of Cards', thumbnail: '/images/originals/house-of-cards.jpg', videoUrl: '/videos/the-crown-trailer.mp4', year: '2013', genre: 'Political Drama', rating: 'TV-MA' },
              { id: 'originals-2', title: 'Umbrella Academy', thumbnail: '/images/originals/umbrella-academy.jpg', videoUrl: '/videos/stranger-things-trailer.mp4', year: '2019', genre: 'Superhero', rating: 'TV-14' },
            ],
            action: [
              { id: 'action-1', title: 'Extraction', thumbnail: '/images/action/extraction.jpg', videoUrl: '/videos/squid-game-trailer.mp4', year: '2020', genre: 'Action Thriller', rating: 'R' },
              { id: 'action-2', title: '6 Underground', thumbnail: '/images/action/6-underground.jpg', videoUrl: '/videos/the-crown-trailer.mp4', year: '2019', genre: 'Action', rating: 'R' },
            ]
          }
        });
        
        // Try to load from JSON file as backup
        try {
          const response = await fetch('/data/movies.json');
          if (response.ok) {
            const data = await response.json();
            setNetflixData(data);
          }
        } catch (jsonError) {
          console.log('JSON file not found, using fallback data');
        }
        
      } catch (error) {
        console.error('Error loading Netflix data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleHeroPlay = () => {
    if (netflixData?.featured) {
      const featuredAsMovie: Movie = {
        id: netflixData.featured.id,
        title: netflixData.featured.title,
        thumbnail: netflixData.featured.thumbnail,
        videoUrl: netflixData.featured.videoUrl,
        year: netflixData.featured.year,
        genre: netflixData.featured.genre,
        rating: netflixData.featured.rating,
        description: netflixData.featured.description,
        cast: netflixData.featured.cast
      };
      onPlayMovie(featuredAsMovie);
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
        rating: netflixData.featured.rating,
        description: netflixData.featured.description,
        cast: netflixData.featured.cast
      };
      onMovieInfo(featuredAsMovie);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <NetflixHeader onSearch={handleSearch} />
        <LoadingSkeleton type="hero" />
        <div className="relative z-10 -mt-32">
          <LoadingSkeleton type="row" />
          <LoadingSkeleton type="row" />
          <LoadingSkeleton type="row" />
        </div>
      </div>
    );
  }

  if (!netflixData) {
    return (
      <div className="min-h-screen bg-black">
        <NetflixHeader onSearch={handleSearch} />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-xl">Failed to load content</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <NetflixHeader onSearch={handleSearch} />
      
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

        {netflixData.categories.comedy && (
          <ContentRow
            title="Comedy Movies"
            movies={netflixData.categories.comedy}
            onPlayMovie={handlePlayMovie}
            onMovieInfo={handleMovieInfo}
          />
        )}

        {netflixData.categories.drama && (
          <ContentRow
            title="Dramas"
            movies={netflixData.categories.drama}
            onPlayMovie={handlePlayMovie}
            onMovieInfo={handleMovieInfo}
          />
        )}

        {netflixData.categories.thriller && (
          <ContentRow
            title="Thrillers"
            movies={netflixData.categories.thriller}
            onPlayMovie={handlePlayMovie}
            onMovieInfo={handleMovieInfo}
          />
        )}

        {netflixData.categories.documentary && (
          <ContentRow
            title="Documentaries"
            movies={netflixData.categories.documentary}
            onPlayMovie={handlePlayMovie}
            onMovieInfo={handleMovieInfo}
          />
        )}
      </div>
      
      <NetflixFooter />
    </div>
  );
};

export default HomePage;
