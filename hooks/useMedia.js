import { useEffect, useState } from 'react';

import { baseUrl } from '../utils/variables';
import { auth } from '../utils/auth';
import { doFetch } from '../utils/apiDoFetch';

export const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(`${baseUrl}media`);
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

  const postMedia = async (title, description, image, type) => {
    if (image) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      const filename = image.split('/').pop();
      let fileExtension = filename.split('.').pop();
      fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
      formData.append('file', {
        uri: image,
        name: filename,
        type: type + '/' + fileExtension,
      });

      try {
        const token = await auth.getUserTokenFromStorage();
        const options = {
          method: 'POST',
          headers: {
            'x-access-token': token,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        };

        const response = await doFetch(baseUrl + 'media', options);
        if (response.message === 'File uploaded') return true;
        else return false;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return { mediaArray, postMedia };
};
