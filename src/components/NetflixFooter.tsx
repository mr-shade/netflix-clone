import React from 'react';
import { Github, Globe, Instagram, Facebook, Twitter } from 'lucide-react';

const NetflixFooter: React.FC = () => {
  const footerLinks = [
    {
      title: 'Audio Description',
      href: '#'
    },
    {
      title: 'Help Center',
      href: '#'
    },
    {
      title: 'Gift Cards',
      href: '#'
    },
    {
      title: 'Media Center',
      href: '#'
    },
    {
      title: 'Investor Relations',
      href: '#'
    },
    {
      title: 'Jobs',
      href: '#'
    },
    {
      title: 'Terms of Use',
      href: '#'
    },
    {
      title: 'Privacy',
      href: '#'
    },
    {
      title: 'Legal Notices',
      href: '#'
    },
    {
      title: 'Cookie Preferences',
      href: '#'
    },
    {
      title: 'Corporate Information',
      href: '#'
    },
    {
      title: 'Contact Us',
      href: '#'
    }
  ];

  return (
    <footer className="bg-black text-gray-400 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Social Links */}
        <div className="flex space-x-6 mb-8">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            <Github className="w-6 h-6" />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 underline hover:no-underline"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Service Code Button */}
        <button className="border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 px-4 py-2 text-sm mb-6 transition-all duration-300">
          Service Code
        </button>

        {/* Copyright */}
        <div className="text-sm text-gray-500 space-y-2">
          <p>© 2024 Netflix Clone. This is a demonstration project showcasing modern web development techniques.</p>
          <p className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Built with React, TypeScript, and TailwindCSS</span>
          </p>
          <p className="text-xs">
            This project is for educational and portfolio purposes. Netflix is a trademark of Netflix, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default NetflixFooter;
