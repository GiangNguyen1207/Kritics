import React from 'react';
import { apiUrl } from '../utils/Variables';

const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userCredentials),
    };
    return await doFetch(apiUrl + 'login', options);
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: { 'x-access-token': token },
    };
    return await doFetch(apiUrl + 'users/user', options);
  };

  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return await doFetch(apiUrl + 'users', options);
  };

  const checkUsername = async (username) => {
    const result = await doFetch(apiUrl + 'users/username/' + username);
    return result.available;
  };

  return { checkUsername, getUserByToken, postUser };
};

export { useLogin, useUser };
