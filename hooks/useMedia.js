import { useEffect, useState } from 'react';

import { baseUrl, appID } from '../utils/variables';
import { auth } from '../utils/auth';
import { doFetch } from '../utils/apiDoFetch';
import { tagService } from '../services/TagService';
import { useCommentRating } from './useCommentRating';
import { useToastHandler } from '../components/Toast';

export const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { postRating } = useCommentRating();
  const [searchStatus, setSearchStatus] = useState(false);
  const { show } = useToastHandler();

  const loadMedia = async () => {
    try {
      const response = await fetch(`${baseUrl}tags/${appID}`);
      if (!response.ok) {
        show(response.statusText, 'error');
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
      show(error.message, 'error');
    }
  };

  const postMedia = async (title, description, image, type, rating) => {
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
        const ratingResponse = await postRating(response.file_id, rating);
        if (response && tagResponse && ratingResponse) {
          setLoading(false);
          return true;
        } else return false;
      } catch (error) {
        setLoading(false);
        show(error.message, 'error');
      }
    }
  };

  const searchMedia = (searchTerm) => {
    const searchResults = mediaArray.filter((media) =>
      media.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(searchResults);
    setSearchStatus(true);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return {
    mediaArray,
    postMedia,
    loading,
    searchResults,
    searchMedia,
    searchStatus,
  };
};
