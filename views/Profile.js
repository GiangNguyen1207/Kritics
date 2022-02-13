import React, { useContext } from 'react';
import { Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from '../context/MainContext';

import ScreenLayout from '../components/ScreenLayout';
import ContentLayout from '../components/ContentLayout';
import { mainTab } from '../router/Maintab';

const Profile = () => {
  const { top } = useSafeAreaInsets();
  const { setIsLoggedIn } = useContext(MainContext);
  return (
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout
        hasHeader
        headerTitle={mainTab.profile}
        onPressBack={() => {}}
      >
        <Button
          title={'Logout'}
          onPress={async () => {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
          }}
        />
      </ContentLayout>
    </ScreenLayout>
  );
};

export default Profile;
