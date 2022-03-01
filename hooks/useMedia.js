import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { baseUrl, appID } from '../utils/variables';
import { auth } from '../utils/auth';
import { doFetch } from '../utils/apiDoFetch';
import { tagService } from '../services/TagService';

export const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMedia = async () => {
    try {
      const response = await fetch(`${baseUrl}tags/${appID}`);
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
      setLoading(true);
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
        const tagResponse = await tagService.postTag(
          {
            file_id: response.file_id,
            tag: appID,
          },
          token
        );
        if (response.message === 'File uploaded' && tagResponse) {
          setLoading(false);
          return true;
        } else return false;
      } catch (error) {
        setLoading(false);
        Alert.alert(error.message);
      }
    }
  };

  const postAvatar = async (image, type, userid) => {
    if (image) {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', '');
      formData.append('description', '');
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
        const tagResponse = await tagService.postTag(
          {
            file_id: response.file_id,
            tag: 'avatar_' + userid,
          },
          token
        );
        if (response.message === 'File uploaded' && tagResponse) {
          setLoading(false);
          return true;
        } else return false;
      } catch (error) {
        setLoading(false);
        Alert.alert(error.message);
      }
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return { mediaArray, postMedia, postAvatar, loading };
};
