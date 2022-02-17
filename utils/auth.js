import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_TOKEN = 'userToken';

const authCredentials = () => {
  const getUserTokenFromStorage = () => {
    return AsyncStorage.getItem(USER_TOKEN);
  };

  const setUserTokenToStorage = (userToken) => {
    return AsyncStorage.setItem(USER_TOKEN, userToken);
  };

  return { getUserTokenFromStorage, setUserTokenToStorage };
};

export const auth = authCredentials();
