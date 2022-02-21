import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from '../context/MainContext';
import ContentLayout from '../components/ContentLayout';
import { mainTab } from '../router/Maintab';
import Button from '../components/Button';
import ScreenLayout from '../components/ScreenLayout';
import { theme } from '../themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from '../components/Typography';
import { StyleSheet, Image, View, Modal } from 'react-native';
import { useTag } from '../hooks/useTag';

const Profile = () => {
  const { setIsLoggedIn, user } = useContext(MainContext);
  const { top } = useSafeAreaInsets();
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const { getMediaByTag } = useTag();
  const [modalVisible, setModalVisible] = useState(false);

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getMediaByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar('' + avatar.filename);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

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
        <Image style={styles.avatar} source={{ uri: avatar }} />
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
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 0.5,
          alignSelf: 'stretch',
        }}
      />
      <Button
        buttonStyle={{ margin: 20, width: 300 }}
        title={'Edit profile'}
        onPress={() => {
          setModalVisible(true);
        }}
        variant={'secondary'}
      />
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 0.5,
          alignSelf: 'stretch',
        }}
      />
      <Button
        buttonStyle={{ margin: 20, width: 300 }}
        title={'Change password'}
        onPress={async () => {
          console.log('click');
        }}
        variant={'secondary'}
      />
      <View
        style={{
          borderBottomColor: '#fff',
          borderBottomWidth: 0.5,
          alignSelf: 'stretch',
          marginBottom: 40,
        }}
      />
      <Button
        buttonStyle={{ margin: 20, width: 300 }}
        title={'Logout'}
        onPress={async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
        variant={'primary'}
      />

      <Modal visible={modalVisible}>
        <View style={styles.modalContent}>
          <Typography
            text={'Modal'}
            color={theme.colors.primary}
            textStyle={styles.header}
            variant="h4"
          />
          <Button
            buttonStyle={{ margin: 20, width: 300 }}
            title={'Close'}
            onPress={() => {
              setModalVisible(false);
            }}
            variant={'secondary'}
          />
        </View>
      </Modal>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  profileInfo: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    margin: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
