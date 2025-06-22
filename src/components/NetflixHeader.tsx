import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface NetflixHeaderProps {
  onSearch: (query: string) => void;
}

const NetflixHeader: React.FC<NetflixHeaderProps> = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSearch(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <div className="netflix-red text-2xl md:text-3xl font-bold">
            NETFLIX
          </div>
          
          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">TV Shows</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Movies</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">New & Popular</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">My List</a>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search titles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-black/80 border-white/20 text-white placeholder:text-gray-400"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSearch(false)}
                  className="ml-2 text-white hover:text-gray-300"
                >
                  ✕
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(true)}
                className="text-white hover:text-gray-300"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
            <Bell className="w-5 h-5" />
          </Button>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-netflix-red rounded flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
            <ChevronDown className="w-4 h-4 text-white" />
          </div>

          {/* Mobile menu */}
          <Button variant="ghost" size="sm" className="md:hidden text-white hover:text-gray-300">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NetflixHeader;
