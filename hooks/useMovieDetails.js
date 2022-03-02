import { useEffect, useState } from 'react';
import axios from 'axios';

import { useToastHandler } from '../components/Toast';

export const useMovieDetails = (movieId) => {
  const [movieDetails, setMovieDetails] = useState({});
  const { show } = useToastHandler();
  const apiKey = process.env.apiKey;

  const searchMovies = async (searchedName) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchedName}&page=1`
      );
      return response.data.results.slice(0, 10);
    } catch (error) {
      show('Could not find a movie. Please try again later', 'error');
    }
  };

  const getMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      );
      setMovieDetails(response.data);
    } catch (error) {
      show('Can not get movie details. Please try again later', 'error');
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return { movieDetails, searchMovies };
};
