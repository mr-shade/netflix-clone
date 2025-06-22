import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import TVShowsPage from './pages/TVShowsPage';
import MoviesPage from './pages/MoviesPage';
import NewPopularPage from './pages/NewPopularPage';
import MyListPage from './pages/MyListPage';
import BrowseByLanguagesPage from './pages/BrowseByLanguagesPage';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tv-shows" element={<TVShowsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/new-popular" element={<NewPopularPage />} />
          <Route path="/my-list" element={<MyListPage />} />
          <Route path="/browse-languages" element={<BrowseByLanguagesPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/tv/:id" element={<MovieDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
