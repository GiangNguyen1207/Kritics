import { doFetch } from '../utils/apiDoFetch';
import { baseUrl } from '../utils/variables';
import { auth } from '../utils/auth';

export const useComment = () => {
  const getComments = async (fileId) => {
    console.log('fileId', fileId);
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
    return comments;
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

  return { getComments, postComment, deleteComment };
};
