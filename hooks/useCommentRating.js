import { useState } from 'react';

import { doFetch } from '../utils/apiDoFetch';
import { baseUrl } from '../utils/variables';
import { auth } from '../utils/auth';

export const useCommentRating = () => {
  const [comments, setComments] = useState([]);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [loading, setLoading] = useState(false);

  const getComments = async (fileId) => {
    setLoading(true);
    try {
      const token = await auth.getUserTokenFromStorage();
      const options = {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      };

      const comments = await doFetch(
        baseUrl + 'comments/file/' + fileId,
        options
      );
      const ratings = await doFetch(
        baseUrl + 'ratings/file/' + fileId,
        options
      );

      setComments(comments);
      getAverageRating(ratings);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async (fileId) => {
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
      await doFetch(baseUrl + 'comments', options);
    } catch (error) {
      console.error('post comment error', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const token = await auth.getUserTokenFromStorage();
      const options = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      };
      await doFetch(baseUrl + 'comments/' + commentId, options);
    } catch (error) {
      console.error('delete comment error', error);
    }
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

  const getAverageRating = (ratings) => {
    const sum = ratings.reduce((a, b) => (a || 0) + (b.rating || 0), 0);
    const average = +(sum / ratings.length).toFixed(1);
    setRatingAverage(average);
  };

  return {
    comments,
    ratingAverage,
    getComments,
    postComment,
    deleteComment,
    loading,
    postRating,
    deleteRating,
  };
};
