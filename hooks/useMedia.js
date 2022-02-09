import { useEffect, useState } from 'react';
import { baseUrl } from '../utils/variables';

export const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async (start = 0, limit = 15) => {
    try {
      const response = await fetch(
        `${baseUrl}media?start=${start}&limit=${limit}`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );

      setMediaArray(media);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadMedia(0, 10);
  }, []);

  return mediaArray;
};
