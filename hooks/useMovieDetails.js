import { useEffect, useState } from 'react';
import axios from 'axios';

export const useMovieDetails = (movieId) => {
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  const searchMovies = async (searchedName) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.apiKey}&query=${searchedName}&page=1`
      );
      setSuggestedMovies(response.data.results.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.apiKey}`
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return { suggestedMovies, movieDetails, searchMovies };
};
