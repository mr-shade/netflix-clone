import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown, Menu, Gift, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface NetflixHeaderProps {
  onSearch: (query: string) => void;
}

const NetflixHeader: React.FC<NetflixHeaderProps> = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (searchQuery.trim()) {
      setShowSearch(false);
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      onSearch('');
    }
  };

  const navItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Languages'];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="netflix-red text-2xl md:text-3xl font-bold tracking-wide hover:scale-105 transition-transform duration-300">
            NETFLIX
          </Link>
          
          {/* Enhanced Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item) => {
              const path = item === 'Home' ? '/' : 
                         item === 'TV Shows' ? '/tv-shows' :
                         item === 'Movies' ? '/movies' :
                         item === 'New & Popular' ? '/new-popular' :
                         item === 'My List' ? '/my-list' :
                         item === 'Browse by Languages' ? '/browse-languages' : '/';
              const isActive = location.pathname === path;
              
              return (
                <Link
                  key={item}
                  to={path}
                  className={`relative text-sm font-medium transition-colors duration-300 group ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-netflix-red transform scale-x-100 transition-transform duration-300" />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-netflix-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Enhanced Search */}
          <div className="relative">
            <div className={`flex items-center transition-all duration-300 ${
              showSearch ? 'bg-black/90 border border-white/20 rounded px-3 py-2' : ''
            }`}>
              {showSearch && (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Titles, people, genres"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 md:w-64 bg-transparent border-none text-white text-sm placeholder:text-gray-400 focus:outline-none p-0"
                  />
                </form>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearchToggle}
                className="text-white hover:text-gray-300 p-2 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                {showSearch ? (
                  <span className="text-lg">×</span>
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Kids Profile Button - Hidden on mobile */}
          <div className="hidden md:block">
            <Button variant="ghost" size="sm" className="text-white hover:text-gray-300 text-sm font-medium">
              Kids
            </Button>
          </div>

          {/* Gift Button - Hidden on mobile */}
          <Button variant="ghost" size="sm" className="hidden md:flex text-white hover:text-gray-300 p-2 hover:bg-white/10 rounded-full transition-all duration-300">
            <Gift className="w-5 h-5" />
          </Button>

          {/* Enhanced Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="text-white hover:text-gray-300 p-2 hover:bg-white/10 rounded-full transition-all duration-300 relative">
              <Bell className="w-5 h-5" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-netflix-red rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </span>
            </Button>
          </div>

          {/* Enhanced Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 text-white hover:text-gray-300 p-1 hover:bg-white/10 rounded transition-all duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-netflix-red to-red-600 rounded overflow-hidden flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                showProfileMenu ? 'rotate-180' : ''
              }`} />
            </Button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-black/95 border border-gray-700 rounded-lg shadow-2xl backdrop-blur-sm animate-fadeIn">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-netflix-red to-red-600 rounded overflow-hidden flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">User</p>
                      <p className="text-gray-400 text-sm">Premium Plan</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  {['Manage Profiles', 'Account', 'Help Center', 'Sign out of Netflix'].map((item) => (
                    <button
                      key={item}
                      className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200 text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <Button variant="ghost" size="sm" className="lg:hidden text-white hover:text-gray-300 p-2">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NetflixHeader;
