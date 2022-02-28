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

  return { postTag };
};

export const tagService = service();
