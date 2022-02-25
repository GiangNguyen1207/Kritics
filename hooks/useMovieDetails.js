import { useEffect, useState } from 'react';
import axios from 'axios';

export const useMovieDetails = () => {
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.apiKey}&query=${searhedName}&page=1`
      );
      setSuggestedMovies(response.data.results.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return { suggestedMovies, movieDetails, searchMovies };
};
