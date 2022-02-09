import { useEffect, useState } from 'react';
import { doFetch } from '../utils/apiDoFetch';
import { baseUrl } from '../utils/variables';

export const useFavourite = () => {
  const token = '';
  const [favouriteList, setFavouriteList] = useState([]);

  const getFavouriteList = async () => {
    const options = {
      method: 'GET',
      headers: { 'x-access-token': token },
    };
    const json = await doFetch(baseUrl + 'favourites', options);
    setFavouriteList(json);

    return json;
  };

  const addToFavourite = async (fileId) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ file_id: fileId }),
    };

    const response = await doFetch(baseUrl + 'favourites', options);
    if (response.message === 'Favourite added') {
      await updateFavouriteList();
    }
  };

  const deleteFavourite = async (fileId) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ id: fileId }),
    };

    const response = await doFetch(
      baseUrl + `favourites/file/${fileId}`,
      options
    );

    if (response.message === 'Favourite deleted') {
      await updateFavouriteList();
    }
  };

  const updateFavouriteList = async () => {
    const favouriteList = await getFavouriteList();
    setFavouriteList(favouriteList);
  };

  useEffect(() => {
    getFavouriteList();
  }, []);

  return { favouriteList, addToFavourite, deleteFavourite };
};
