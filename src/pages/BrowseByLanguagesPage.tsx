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
  language: string;
  country: string;
}

interface LanguageSection {
  language: string;
  country: string;
  flag: string;
  movies: Movie[];
}

const BrowseByLanguagesPage: React.FC = () => {
  const [languageSections, setLanguageSections] = useState<LanguageSection[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handlePlayMovie = (movie: Movie) => {
    console.log('Playing movie:', movie.title);
  };

  const handleMovieInfo = (movie: Movie) => {
    console.log('Movie info:', movie.title);
  };

  useEffect(() => {
    const fetchLanguageData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Mock data with different languages
        const mockLanguageData: LanguageSection[] = [
          {
            language: 'English',
            country: 'United States',
            flag: '🇺🇸',
            movies: [
              {
                id: 'en-1',
                title: 'Stranger Things',
                thumbnail: '/images/originals/umbrella-academy.jpg',
                videoUrl: '/videos/stranger-things-trailer.mp4',
                year: '2016',
                genre: 'Sci-Fi Drama',
                rating: 'TV-14',
                language: 'English',
                country: 'United States'
              },
              {
                id: 'en-2',
                title: 'The Crown',
                thumbnail: '/images/trending/the-crown.jpg',
                videoUrl: '/videos/the-crown-trailer.mp4',
                year: '2016',
                genre: 'Historical Drama',
                rating: 'TV-MA',
                language: 'English',
                country: 'United Kingdom'
              },
              {
                id: 'en-3',
                title: 'Ozark',
                thumbnail: '/images/trending/ozark.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2017',
                genre: 'Crime Drama',
                rating: 'TV-MA',
                language: 'English',
                country: 'United States'
              }
            ]
          },
          {
            language: 'Korean',
            country: 'South Korea',
            flag: '🇰🇷',
            movies: [
              {
                id: 'ko-1',
                title: 'Squid Game',
                thumbnail: '/images/trending/squid-game.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2021',
                genre: 'Thriller',
                rating: 'TV-MA',
                language: 'Korean',
                country: 'South Korea'
              },
              {
                id: 'ko-2',
                title: 'Kingdom',
                thumbnail: '/images/popular/dark.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2019',
                genre: 'Horror Drama',
                rating: 'TV-MA',
                language: 'Korean',
                country: 'South Korea'
              },
              {
                id: 'ko-3',
                title: 'My Name',
                thumbnail: '/images/action/extraction.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2021',
                genre: 'Action Thriller',
                rating: 'TV-MA',
                language: 'Korean',
                country: 'South Korea'
              }
            ]
          },
          {
            language: 'Spanish',
            country: 'Spain',
            flag: '🇪🇸',
            movies: [
              {
                id: 'es-1',
                title: 'Money Heist',
                thumbnail: '/images/popular/money-heist.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2017',
                genre: 'Crime Drama',
                rating: 'TV-MA',
                language: 'Spanish',
                country: 'Spain'
              },
              {
                id: 'es-2',
                title: 'Elite',
                thumbnail: '/images/originals/house-of-cards.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2018',
                genre: 'Teen Drama',
                rating: 'TV-MA',
                language: 'Spanish',
                country: 'Spain'
              },
              {
                id: 'es-3',
                title: 'Narcos',
                thumbnail: '/images/popular/narcos.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2015',
                genre: 'Crime Biography',
                rating: 'TV-MA',
                language: 'Spanish',
                country: 'Colombia'
              }
            ]
          },
          {
            language: 'Japanese',
            country: 'Japan',
            flag: '🇯🇵',
            movies: [
              {
                id: 'ja-1',
                title: 'Alice in Borderland',
                thumbnail: '/images/action/the-gray-man.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2020',
                genre: 'Sci-Fi Thriller',
                rating: 'TV-MA',
                language: 'Japanese',
                country: 'Japan'
              },
              {
                id: 'ja-2',
                title: 'The Naked Director',
                thumbnail: '/images/originals/mindhunter.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2019',
                genre: 'Biography Drama',
                rating: 'TV-MA',
                language: 'Japanese',
                country: 'Japan'
              }
            ]
          },
          {
            language: 'French',
            country: 'France',
            flag: '🇫🇷',
            movies: [
              {
                id: 'fr-1',
                title: 'Lupin',
                thumbnail: '/images/action/6-underground.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2021',
                genre: 'Mystery Thriller',
                rating: 'TV-14',
                language: 'French',
                country: 'France'
              },
              {
                id: 'fr-2',
                title: 'Call My Agent!',
                thumbnail: '/images/popular/the-office.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2015',
                genre: 'Comedy Drama',
                rating: 'TV-MA',
                language: 'French',
                country: 'France'
              }
            ]
          },
          {
            language: 'German',
            country: 'Germany',
            flag: '🇩🇪',
            movies: [
              {
                id: 'de-1',
                title: 'Dark',
                thumbnail: '/images/popular/dark.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2017',
                genre: 'Sci-Fi Mystery',
                rating: 'TV-MA',
                language: 'German',
                country: 'Germany'
              },
              {
                id: 'de-2',
                title: 'Parfum',
                thumbnail: '/images/originals/mindhunter.jpg',
                videoUrl: '/videos/squid-game-trailer.mp4',
                year: '2018',
                genre: 'Crime Thriller',
                rating: 'TV-MA',
                language: 'German',
                country: 'Germany'
              }
            ]
          }
        ];

        setLanguageSections(mockLanguageData);
      } catch (error) {
        console.error('Error fetching language data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguageData();
  }, []);

  const availableLanguages = [
    { code: 'all', name: 'All Languages', flag: '🌍' },
    ...languageSections.map(section => ({
      code: section.language.toLowerCase(),
      name: section.language,
      flag: section.flag
    }))
  ];

  const filteredSections = selectedLanguage === 'all' 
    ? languageSections 
    : languageSections.filter(section => section.language.toLowerCase() === selectedLanguage);

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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Browse by Languages</h1>
            
            {/* Language Filter */}
            <div className="flex flex-wrap gap-3">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-netflix-red text-white shadow-lg transform scale-105'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Language Stats */}
          <div className="mb-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Global Content</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {languageSections.map((section) => (
                <div key={section.language} className="text-center">
                  <div className="text-3xl mb-2">{section.flag}</div>
                  <div className="font-semibold">{section.language}</div>
                  <div className="text-sm text-gray-400">{section.movies.length} titles</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content by Language */}
          {filteredSections.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-6">
                <svg className="w-20 h-20 mx-auto text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">No content found</h2>
              <p className="text-gray-400">Try selecting a different language or browse all content.</p>
            </div>
          ) : (
            filteredSections.map((section) => (
              <div key={section.language} className="mb-12">
                {/* Language Section Header */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-900 rounded-lg">
                  <span className="text-4xl">{section.flag}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{section.language} Content</h2>
                    <p className="text-gray-400">From {section.country} • {section.movies.length} titles</p>
                  </div>
                </div>

                {/* Movies Row */}
                <ContentRow
                  title={`Popular in ${section.language}`}
                  movies={section.movies}
                  onPlayMovie={handlePlayMovie}
                  onMovieInfo={handleMovieInfo}
                />
              </div>
            ))
          )}

          {/* Language Learning Tip */}
          <div className="mt-12 p-6 bg-gradient-to-r from-netflix-red to-red-700 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">💡 Pro Tip</h3>
            <p className="text-sm opacity-90">
              Watching content in different languages with subtitles is a great way to learn new languages while enjoying your favorite shows!
            </p>
          </div>
        </div>
      </main>

      <NetflixFooter />
    </div>
  );
};

export default BrowseByLanguagesPage;
