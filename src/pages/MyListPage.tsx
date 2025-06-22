import React, { useState, useEffect } from 'react';
import NetflixHeader from '../components/NetflixHeader';
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
}

const MyListPage: React.FC = () => {
  const [myListMovies, setMyListMovies] = useState<Movie[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<Movie[]>([]);
  const [watchAgain, setWatchAgain] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality
  };

  const handlePlayMovie = (movie: Movie) => {
    console.log('Playing movie:', movie.title);
    // Implement play functionality
  };

  const handleMovieInfo = (movie: Movie) => {
    console.log('Movie info:', movie.title);
    // Implement movie info functionality
  };

  useEffect(() => {
    const fetchMyListData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, this would come from user's saved list
        const mockMyList: Movie[] = [
          {
            id: 'list-1',
            title: 'Stranger Things',
            thumbnail: '/images/originals/umbrella-academy.jpg',
            videoUrl: '/videos/stranger-things-trailer.mp4',
            year: '2016',
            genre: 'Sci-Fi Drama',
            rating: 'TV-14'
          },
          {
            id: 'list-2',
            title: 'The Crown',
            thumbnail: '/images/trending/the-crown.jpg',
            videoUrl: '/videos/the-crown-trailer.mp4',
            year: '2016',
            genre: 'Historical Drama',
            rating: 'TV-MA'
          },
          {
            id: 'list-3',
            title: 'Bridgerton',
            thumbnail: '/images/originals/bridgerton.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2020',
            genre: 'Period Romance',
            rating: 'TV-MA'
          },
          {
            id: 'list-4',
            title: 'Ozark',
            thumbnail: '/images/trending/ozark.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2017',
            genre: 'Crime Drama',
            rating: 'TV-MA'
          },
          {
            id: 'list-5',
            title: 'The Witcher',
            thumbnail: '/images/trending/the-witcher.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2019',
            genre: 'Fantasy Adventure',
            rating: 'TV-MA'
          }
        ];

        const mockRecentlyAdded: Movie[] = [
          {
            id: 'recent-1',
            title: 'Wednesday',
            thumbnail: '/images/trending/wednesday.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2022',
            genre: 'Dark Comedy',
            rating: 'TV-14'
          },
          {
            id: 'recent-2',
            title: 'Squid Game',
            thumbnail: '/images/trending/squid-game.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2021',
            genre: 'Thriller',
            rating: 'TV-MA'
          }
        ];

        const mockWatchAgain: Movie[] = [
          {
            id: 'watch-1',
            title: 'Breaking Bad',
            thumbnail: '/images/popular/breaking-bad.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2008',
            genre: 'Crime Drama',
            rating: 'TV-MA'
          },
          {
            id: 'watch-2',
            title: 'The Office',
            thumbnail: '/images/popular/the-office.jpg',
            videoUrl: '/videos/squid-game-trailer.mp4',
            year: '2005',
            genre: 'Comedy',
            rating: 'TV-14'
          }
        ];

        setMyListMovies(mockMyList);
        setRecentlyAdded(mockRecentlyAdded);
        setWatchAgain(mockWatchAgain);
      } catch (error) {
        console.error('Error fetching my list data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListData();
  }, []);

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

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <NetflixHeader onSearch={handleSearch} />
      
      <main className="pt-16">
        {/* Page Header */}
        <div className="px-4 md:px-12 lg:px-16 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">My List</h1>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z"/>
                </svg>
                Sort
              </button>
            </div>
          </div>

          {myListMovies.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-6">
                <svg className="w-20 h-20 mx-auto text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your list is empty</h2>
              <p className="text-gray-400 mb-6">Add movies and shows to your list to see them here.</p>
              <button className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
                Browse Content
              </button>
            </div>
          ) : (
            <>
              {/* My List Content */}
              <ContentRow 
                title="My List" 
                movies={myListMovies}
                onPlayMovie={handlePlayMovie}
                onMovieInfo={handleMovieInfo}
              />

              {/* Recently Added */}
              {recentlyAdded.length > 0 && (
                <ContentRow 
                  title="Recently Added to List" 
                  movies={recentlyAdded}
                  onPlayMovie={handlePlayMovie}
                  onMovieInfo={handleMovieInfo}
                  priority={true}
                />
              )}

              {/* Watch Again */}
              {watchAgain.length > 0 && (
                <ContentRow 
                  title="Watch Again" 
                  movies={watchAgain}
                  onPlayMovie={handlePlayMovie}
                  onMovieInfo={handleMovieInfo}
                />
              )}
            </>
          )}

          {/* List Statistics */}
          {myListMovies.length > 0 && (
            <div className="mt-12 p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">List Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-netflix-red">{myListMovies.length}</div>
                  <div className="text-gray-400">Total Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-netflix-red">{recentlyAdded.length}</div>
                  <div className="text-gray-400">Recently Added</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-netflix-red">{watchAgain.length}</div>
                  <div className="text-gray-400">To Watch Again</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-netflix-red">0</div>
                  <div className="text-gray-400">Downloaded</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <NetflixFooter />
    </div>
  );
};

export default MyListPage;
