# Netflix Clone

A comprehensive Netflix clone built with React, TypeScript, and TailwindCSS featuring a professional streaming platform interface with working video playback functionality.

## 🚀 Live Demo

Experience the Netflix Clone in action!

## ✨ Features

### 🎬 Core Netflix Experience
- **Authentic Netflix UI Design**: Dark theme with signature red accent colors
- **Responsive Layout**: Adapts perfectly to desktop, tablet, and mobile devices
- **Netflix-Style Navigation**: Fixed header with search, notifications, and user profile

### 📺 Video & Content Features
- **Featured Hero Section**: Large video background with movie details and action buttons
- **Working Video Player**: Full-featured HTML5 video player with:
  - Play/pause controls
  - Volume control with mute toggle
  - Seek bar for timeline navigation
  - Fullscreen support
  - Skip forward/backward (10s)
- **Horizontal Content Rows**: Smooth scrolling movie collections by category
- **Interactive Movie Cards**: Hover effects revealing video previews and detailed information

### 🔍 Interactive Features
- **Smart Search**: Real-time search across all content with results display
- **Movie Information Modals**: Detailed popup with cast, genres, and recommendations
- **Content Categories**: 
  - Trending Now
  - Popular on Netflix
  - Netflix Originals
  - Action & Adventure
- **Smooth Animations**: Professional transitions and hover effects

### 🎨 Design Excellence
- **Netflix Brand Colors**: Authentic #E50914 red and dark theme palette
- **Modern Typography**: Clean, readable fonts matching Netflix's style
- **Professional Layout**: Pixel-perfect recreation of Netflix's interface
- **Visual Hierarchy**: Clear content organization and navigation flow

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 6.0 for fast development and optimized builds
- **Styling**: TailwindCSS with custom Netflix color scheme
- **UI Components**: Radix UI component library for accessible interactions
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks and context for client-side state

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with all interactive elements
- **Tablet**: Adapted layout maintaining functionality
- **Mobile**: Touch-optimized interface with mobile navigation

## 🎯 Key Components

### NetflixHeader
- Fixed navigation with scroll effects
- Search functionality with expandable input
- User profile and notification areas

### HeroSection
- Full-screen featured content display
- Video background with gradient overlays
- Call-to-action buttons (Play, More Info, My List)

### VideoPlayer
- Custom HTML5 video player
- Professional playback controls
- Fallback to working sample videos

### MovieCard
- Thumbnail display with hover expansion
- Interactive buttons and information overlay
- Smooth animations and transitions

### ContentRow
- Horizontal scrolling movie collections
- Navigation arrows for content browsing
- Category-based organization

### MovieModal
- Detailed content information popup
- Cast and crew details
- "More Like This" recommendations section

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm package manager

### Installation
```bash
# Navigate to the project directory
cd netflix-clone

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Development Server
```bash
pnpm dev
# Open http://localhost:5173
```

### Production Build
```bash
pnpm build
# Output in /dist directory
```

## 📁 Project Structure

```
netflix-clone/
├── public/
│   ├── data/
│   │   └── movies.json          # Sample movie/show data
│   └── images/                  # Movie thumbnails and assets
├── src/
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   ├── NetflixHeader.tsx    # Main navigation
│   │   ├── HeroSection.tsx      # Featured content section
│   │   ├── VideoPlayer.tsx      # Custom video player
│   │   ├── MovieCard.tsx        # Individual movie cards
│   │   ├── ContentRow.tsx       # Horizontal content rows
│   │   └── MovieModal.tsx       # Detailed content popup
│   ├── App.tsx                  # Main application component
│   ├── index.css               # Global styles and Netflix theme
│   └── main.tsx                # Application entry point
└── dist/                       # Production build output
```

## 🎨 Design System

### Colors
- **Netflix Red**: #E50914 (primary brand color)
- **Netflix Black**: #141414 (dark backgrounds)
- **Netflix Dark**: #000000 (deepest black)
- **Netflix Gray**: #333333 (secondary elements)
- **Netflix Light Gray**: #b3b3b3 (text and borders)

### Typography
- **Font Family**: Sans-serif system fonts
- **Sizes**: Responsive scaling from mobile to desktop
- **Weights**: Regular, medium, semibold, and bold variants

## 🔧 Features Implementation

### Video Playback
- Uses HTML5 video elements with custom controls
- Fallback to Google Cloud Storage sample videos
- Supports autoplay, muting, and loop functionality
- Error handling with graceful degradation

### Search Functionality
- Real-time filtering across all content
- Search by title and genre
- Results display with grid layout
- Clear search state management

### Responsive Design
- Mobile-first approach with progressive enhancement
- Breakpoint-based layout adjustments
- Touch-optimized interactions for mobile devices
- Fluid typography and spacing

## 🌟 Performance Features

- **Optimized Images**: Proper image loading and fallbacks
- **Code Splitting**: Efficient bundle management with Vite
- **Lazy Loading**: Content loaded as needed
- **Smooth Animations**: Hardware-accelerated transitions
- **SEO Ready**: Proper meta tags and structure

## 🔮 Future Enhancements

- User authentication and profiles
- Personal watchlists and favorites
- Recommendation algorithms
- Content rating and reviews
- Multi-language support
- Offline viewing capabilities
- Social sharing features

## 📄 License

This project is created for educational and demonstration purposes, showcasing modern web development techniques and Netflix-inspired design patterns.

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**
