import { doFetch } from '../utils/apiDoFetch';
import { baseUrl } from '../utils/variables';
import { auth } from '../utils/auth';
import { useState } from 'react';

export const useRating = () => {
  const [ratingsList, setRatingsList] = useState([]);
  const [ratingAverage, setRatingAverage] = useState(0);

  const getRatingsByFileId = async (fileId) => {
    const token = await auth.getUserTokenFromStorage();
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };

    const json = await doFetch(baseUrl + 'ratings/file/' + fileId, options);
    setRatingsList(json);
    return getAverageRating();
  };

  const postRating = async (fileId, rating) => {
    try {
      const token = await auth.getUserTokenFromStorage();
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_id: fileId, rating: rating }),
      };
      return await doFetch(baseUrl + 'ratings', options);
    } catch (error) {
      console.error('post rating error', error);
    }
  };

  const deleteRating = async (fileId) => {
    try {
      const token = await auth.getUserTokenFromStorage();
      const options = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
        body: JSON.stringify({ id: fileId }),
      };
      await doFetch(baseUrl + 'ratings/file/' + fileId, options);
    } catch (error) {
      console.error('deleta rating error', error);
    }
  };

  const getAverageRating = () => {
    const sum = ratingsList.reduce((a, b) => (a || 0) + (b.rating || 0), 0);
    const average = +(sum / ratingsList.length).toFixed(1);
    setRatingAverage(average);
    return average;
  };

  return {
    ratingsList,
    getRatingsByFileId,
    postRating,
    deleteRating,
    getAverageRating,
    ratingAverage,
  };
};
