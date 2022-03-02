import { useEffect, useState } from 'react';

import { doFetch } from '../utils/apiDoFetch';
import { baseUrl } from '../utils/variables';
import { auth } from '../utils/auth';
import { useToastHandler } from '../context/ToastContext';

export const useFavourite = (isFocused) => {
  const [favouriteList, setFavouriteList] = useState([]);
  const { show } = useToastHandler();

  const getFavouriteList = async () => {
    try {
      const token = await auth.getUserTokenFromStorage();
      const options = {
        method: 'GET',
        headers: { 'x-access-token': token },
      };
      const json = await doFetch(baseUrl + 'favourites', options);
      setFavouriteList(json);
      return json;
    } catch (error) {
      show(error.message, 'error');
    }
  };

  const addToFavourite = async (fileId) => {
    try {
      const token = await auth.getUserTokenFromStorage();
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({ file_id: fileId }),
      };
      await doFetch(baseUrl + 'favourites', options);
      await updateFavouriteList();
    } catch (error) {
      show(error.message, 'error');
    }
  };

  const deleteFavourite = async (fileId) => {
    try {
      const token = await auth.getUserTokenFromStorage();
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({ id: fileId }),
      };
      await doFetch(baseUrl + `favourites/file/${fileId}`, options);
      await updateFavouriteList();
    } catch (error) {
      show(error.message, 'error');
    }
  };

  const updateFavouriteList = async () => {
    try {
      const favouriteList = await getFavouriteList();
      setFavouriteList(favouriteList);
    } catch (error) {
      show(error.message, 'error');
    }
  };

  useEffect(() => {
    getFavouriteList();
  }, [isFocused]);

  return { favouriteList, addToFavourite, deleteFavourite };
};
