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
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EditProfileModal from '../components/EditProfileModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import DividerLine from '../components/DividerLine';
import AddAvatarModal from '../components/AddAvatarModal';
import { tagService } from '../services/TagService';
import { uploadsUrl } from '../utils/variables';
import { useToastHandler } from '../context/ToastContext';

const Profile = () => {
  const { setIsLoggedIn, user, update } = useContext(MainContext);
  const { top } = useSafeAreaInsets();
  const avatarUri = user.full_name ? user.full_name : user.username;
  const [avatar, setAvatar] = useState(
    'http://placehold.jp/ff6600/ffffff/150x150.png?text=' +
      avatarUri
        .match(/(\b\S)?/g)
        .join('')
        .toUpperCase()
  );

  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [addAvatarVisible, setAddAvatarVisible] = useState(false);
  const { show } = useToastHandler();

  const fetchAvatar = async () => {
    try {
      const avatarArray = await tagService.getMediaByTag(
        'avatar_' + user.user_id
      );
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.log(error.message, 'error');
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [update]);

  return (
    <ScreenLayout
      style={{
        paddingTop: top,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ContentLayout hasHeader headerTitle={mainTab.profile} />

      <View style={styles.profileContainer}>
        <View style={styles.profileTop}>
          <View style={styles.profileAvatar}>
            <ImageBackground
              source={{ uri: avatar }}
              resizeMode="cover"
              style={{ height: 150, width: 150 }}
              imageStyle={{ borderRadius: 75 }}
            >
              <TouchableOpacity
                onPress={() => {
                  setAddAvatarVisible();
                }}
                style={{ flex: 1 }}
              >
                <Icon
                  name="camera"
                  color={theme.colors.secondary}
                  size={30}
                  style={{
                    borderRadius: 50,
                    padding: 10,
                    position: 'absolute',
                    right: 0,
                    top: 100,
                    backgroundColor: '#474747',
                  }}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <Typography
            variant="h2"
            text={user.username}
            color={theme.colors.white}
            textStyle={styles.header}
          />
          <Typography
            variant="h4"
            text={user.full_name}
            color={theme.colors.lightGrey}
            textStyle={styles.header}
          />
        </View>
        <View style={styles.profileBottom}>
          {Dimensions.get('window').height > 550 && <DividerLine />}
          <Typography
            textStyle={{ margin: 10 }}
            variant="h3"
            text="Profile information"
          />
          <Button
            buttonStyle={styles.button}
            title={'Edit profile'}
            onPress={() => {
              setEditProfileVisible(true);
            }}
            variant={'secondary'}
          />
          {Dimensions.get('window').height > 550 && <DividerLine />}
          <Typography textStyle={{ margin: 10 }} variant="h3" text="Password" />
          <Button
            buttonStyle={styles.button}
            title={'Change password'}
            onPress={async () => {
              setChangePasswordVisible(true);
            }}
            variant={'secondary'}
          />

          {Dimensions.get('window').height > 550 && <DividerLine />}
          <Button
            buttonStyle={styles.button}
            title={'Logout'}
            onPress={async () => {
              await AsyncStorage.clear();
              setIsLoggedIn(false);
            }}
            variant={'primary'}
          />
        </View>
      </View>
      <EditProfileModal
        modalVisible={editProfileVisible}
        setModalVisible={setEditProfileVisible}
      />
      <ChangePasswordModal
        modalVisible={changePasswordVisible}
        setModalVisible={setChangePasswordVisible}
      />
      <AddAvatarModal
        modalVisible={addAvatarVisible}
        setModalVisible={setAddAvatarVisible}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  profileTop: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatar: {},
  profileBottom: {
    flex: 1,
    width: Dimensions.get('window').width,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  button: {
    alignSelf: 'center',
    width: '75%',
    margin: 5,
  },
});

export default Profile;
