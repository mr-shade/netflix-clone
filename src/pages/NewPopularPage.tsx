import React, { useState, useEffect } from 'react';
import ContentRow from '../components/ContentRow';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Calendar, TrendingUp, Star, Clock } from 'lucide-react';

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
  type?: 'movie' | 'series';
  releaseDate?: string;
  isNew?: boolean;
}

interface NewPopularPageProps {
  onPlayMovie?: (movie: Movie) => void;
  onMovieInfo?: (movie: Movie) => void;
}

const NewPopularPage: React.FC<NewPopularPageProps> = ({ onPlayMovie, onMovieInfo }) => {
  const [content, setContent] = useState<{
    thisWeek: Movie[];
    lastWeek: Movie[];
    comingSoon: Movie[];
    top10: Movie[];
    newReleases: Movie[];
    everyoneWatching: Movie[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'new' | 'popular'>('new');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/data/movies.json');
        const data = await response.json();
        
        const allContent = [
          ...data.categories.trending,
          ...data.categories.popular,
          ...data.categories.originals,
          ...data.categories.action
        ];

        // Add mock dates and popularity data
        const enrichedContent = allContent.map((item: Movie, index: number) => ({
          ...item,
          releaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          isNew: Math.random() > 0.5,
          matchPercentage: Math.floor(Math.random() * 30) + 70
        }));

        const contentData = {
          thisWeek: enrichedContent.slice(0, 8),
          lastWeek: enrichedContent.slice(2, 10),
          comingSoon: enrichedContent.slice(4, 12),
          top10: enrichedContent.slice(0, 10).map((item, index) => ({
            ...item,
            rank: index + 1
          })),
          newReleases: enrichedContent.filter(item => item.isNew).slice(0, 8),
          everyoneWatching: enrichedContent.slice(1, 9)
        };

        setContent(contentData);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="px-4 md:px-8 lg:px-16 mb-8">
          <div className="h-12 w-64 bg-gray-800 rounded animate-pulse"></div>
        </div>
        <LoadingSkeleton type="row" />
        <LoadingSkeleton type="row" />
        <LoadingSkeleton type="row" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Failed to load content</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Page Header */}
      <div className="px-4 md:px-8 lg:px-16 mb-8">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">New & Popular</h1>
        <p className="text-gray-300 text-lg max-w-2xl mb-6">
          Discover the latest releases and what everyone's talking about on Netflix.
        </p>

        {/* Tab Navigation */}
        <div className="flex space-x-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('new')}
            className={`pb-4 text-lg font-medium transition-all duration-300 ${
              activeTab === 'new'
                ? 'text-white border-b-2 border-netflix-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calendar className="w-5 h-5 inline mr-2" />
            What's New
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`pb-4 text-lg font-medium transition-all duration-300 ${
              activeTab === 'popular'
                ? 'text-white border-b-2 border-netflix-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline mr-2" />
            Popular
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="space-y-8">
        {activeTab === 'new' ? (
          <>
            {/* New Releases Section */}
            <div className="px-4 md:px-8 lg:px-16">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-netflix-red mr-4"></div>
                <h2 className="text-white text-2xl font-bold">New This Week</h2>
                <div className="ml-4 px-3 py-1 bg-netflix-red text-white text-xs font-bold rounded-full">
                  {content.thisWeek.length} NEW
                </div>
              </div>
            </div>

            <ContentRow
              title="Released This Week"
              movies={content.thisWeek}
              onPlayMovie={onPlayMovie}
              onMovieInfo={onMovieInfo}
              priority={true}
            />

            <ContentRow
              title="New Releases"
              movies={content.newReleases}
              onPlayMovie={onPlayMovie}
              onMovieInfo={onMovieInfo}
            />

            <ContentRow
              title="Coming Soon"
              movies={content.comingSoon}
              onPlayMovie={onPlayMovie}
              onMovieInfo={onMovieInfo}
            />

            <ContentRow
              title="Last Week's Releases"
              movies={content.lastWeek}
              onPlayMovie={onPlayMovie}
              onMovieInfo={onMovieInfo}
            />
          </>
        ) : (
          <>
            {/* Popular Section */}
            <div className="px-4 md:px-8 lg:px-16">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-netflix-red mr-4"></div>
                <h2 className="text-white text-2xl font-bold">Top 10 on Netflix</h2>
                <Star className="w-5 h-5 text-yellow-500 ml-4" />
              </div>
            </div>

            {/* Top 10 Grid */}
            <div className="px-4 md:px-8 lg:px-16 mb-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {content.top10.map((item, index) => (
                  <div 
                    key={item.id}
                    className="relative group cursor-pointer"
                    onClick={() => onMovieInfo(item)}
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Rank Badge */}
                      <div className="absolute top-2 left-2 w-8 h-8 bg-netflix-red text-white text-lg font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-white text-sm font-medium mt-2 truncate">{item.title}</h3>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{item.duration || '120m'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ContentRow
              title="Everyone's Watching"
              movies={content.everyoneWatching}
              onPlayMovie={onPlayMovie}
              onMovieInfo={onMovieInfo}
              priority={true}
            />

            <ContentRow
              title="Trending Now"
              movies={content.thisWeek}
              onPlayMovie={onPlayMovie}
              onMovieInfo={onMovieInfo}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NewPopularPage;
