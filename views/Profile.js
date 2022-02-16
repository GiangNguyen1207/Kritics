import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from '../context/MainContext';
import ContentLayout from '../components/ContentLayout';
import { mainTab } from '../router/Maintab';
import Button from '../components/Button';
import ScreenLayout from '../components/ScreenLayout';
import { theme } from '../themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from '../components/Typography';
import { StyleSheet, Image, View } from 'react-native';

const Profile = () => {
  const { setIsLoggedIn, user } = useContext(MainContext);
  const { top } = useSafeAreaInsets();

  return (
    <ScreenLayout
      style={{
        paddingTop: top,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ContentLayout hasHeader headerTitle={mainTab.profile} />
      <View style={styles.profileInfo}>
        <Image
          style={styles.avatar}
          source={require('../assets/favicon.png')}
        />
        <Typography
          variant="h2"
          text={user.username}
          color={theme.colors.white}
          textStyle={styles.header}
        />
        <Typography
          text={'Email: ' + (user.email ? user.email : '')}
          color={theme.colors.lightGrey}
          textStyle={styles.header}
          variant="h4"
        />
      </View>

      <Button
        buttonStyle={{ margin: 20, width: 300 }}
        title={'Logout'}
        onPress={async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
        variant={'primary'}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
  },
});

export default Profile;
