import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'hero' | 'row';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'card', count = 1 }) => {
  if (type === 'hero') {
    return (
      <div className="relative h-screen bg-black flex items-center">
        <div className="px-4 md:px-8 lg:px-16 max-w-2xl">
          {/* Hero skeleton */}
          <div className="space-y-6">
            <div className="h-20 bg-gray-800 rounded animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="flex space-x-4">
              <div className="h-12 w-32 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'row') {
    return (
      <div className="mb-12">
        {/* Row title skeleton */}
        <div className="h-8 w-48 bg-gray-800 rounded mb-4 px-4 md:px-8 lg:px-16 animate-pulse"></div>
        
        {/* Cards skeleton */}
        <div className="flex space-x-2 md:space-x-4 px-4 md:px-8 lg:px-16">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex-none w-48 md:w-56 lg:w-64 xl:w-72">
              <div className="aspect-[16/9] bg-gray-800 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default card skeleton
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full aspect-[16/9] bg-gray-800 rounded animate-pulse"></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
