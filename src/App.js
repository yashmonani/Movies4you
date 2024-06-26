import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';
import Login from './Login';
import Signup from './Signup'; // Ensure this component is correctly imported

const API_URL = 'http://www.omdbapi.com?apikey=464b87ac';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const LocationBasedNav = () => {
    const location = useLocation();
    const showNav = location.pathname !== '/login' && location.pathname !== '/signup';

    return (
      <>
        {showNav && (
          <nav>
            <div className="nav-right">
              <Link to="/login">
                <button className="btn btn-primary signin-btn">Sign In</button>
              </Link>
            </div>
          </nav>
        )}
      </>
    );
  };

  return (
    <Router>
      <div className="app">
        <LocationBasedNav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <>
              <h1>Movies4you</h1>
              <div className="search">
                <input
                  placeholder="Search for movies"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                  src={SearchIcon}
                  alt="search"
                  onClick={() => searchMovies(searchTerm)}
                />
              </div>
              {movies.length > 0 ? (
                <div className="container">
                  {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.imdbID} />
                  ))}
                </div>
              ) : (
                <div className="empty">
                  <h2>No movie found</h2>
                </div>
              )}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
