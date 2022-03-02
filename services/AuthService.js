import { baseUrl } from '../utils/variables';
import { doFetch } from '../utils/apiDoFetch';

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userCredentials),
    };
    return await doFetch(baseUrl + 'login', options);
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: { 'x-access-token': token },
    };
    return await doFetch(baseUrl + 'users/user', options);
  };

  const getUserById = async (userId, token) => {
    const options = {
      method: 'GET',
      headers: { 'x-access-token': token },
    };
    return await doFetch(baseUrl + 'users/' + userId, options);
  };

  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  const checkUsername = async (username) => {
    const result = await doFetch(baseUrl + 'users/username/' + username);
    return result.available;
  };

  const putUser = async (data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  return { checkUsername, getUserByToken, postUser, getUserById, putUser };
};

export { useLogin, useUser };
