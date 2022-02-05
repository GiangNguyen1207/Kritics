import React, { useContext } from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from '../context/MainContext';

const Profile = () => {
  const { setIsLoggedIn, user } = useContext(MainContext);

  return (
    <SafeAreaView>
      <Text>Profile page</Text>
      <Button
        title={'Logout'}
        onPress={async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
