import { doFetch } from '../utils/apiDoFetch';
import { baseUrl } from '../utils/variables';
import { auth } from '../utils/auth';
import { useState } from 'react';

export const useRating = () => {
  const [ratingsList, setRatingsList] = useState([]);
  const [ratingAverage, setRatingAverage] = useState([]);

  const getRatingsByFileId = async (fileId) => {
    console.log('fileId', fileId);
    const token = await auth.getUserTokenFromStorage();
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };

    const json = await doFetch(baseUrl + 'ratings/file/' + fileId, options);
    setRatingsList(json);
    return json;
  };

  const postRating = async (fileId) => {
    try {
      const token = await auth.getUserTokenFromStorage();
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_id: fileId }),
      };
      await doFetch(baseUrl + 'ratings', options);
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
    const ratingAverage = Math.round(
      (ratingsList) =>
        ratingsList.reduce((a, b) => a + b, 0) / ratingsList.length
    );
    setRatingAverage(ratingAverage);
    return ratingAverage;
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
