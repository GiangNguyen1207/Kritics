import { baseUrl } from '../utils/variables';
import { doFetch } from '../utils/apiDoFetch';

const service = () => {
  const postTag = async (tagData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(tagData),
    };
    return await doFetch(baseUrl + 'tags/', options);
  };

  const getMediaByTag = async (tag) => {
    return await doFetch(baseUrl + 'tags/' + tag);
  };

  return { postTag, getMediaByTag };
};

export const tagService = service();
