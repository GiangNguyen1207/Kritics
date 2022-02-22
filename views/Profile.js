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
  Modal,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTag } from '../hooks/useTag';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EditProfileModal from '../components/EditProfileModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import DividerLine from '../components/DividerLine';

const Profile = () => {
  const { setIsLoggedIn, user } = useContext(MainContext);
  const { top } = useSafeAreaInsets();
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const { getMediaByTag } = useTag();
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getMediaByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar('' + avatar.filename);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addAvatar = async () => {
    Alert.alert('Add avatar', 'Avatar');
  };

  const onSubmit = async (data, modal) => {
    try {
      if (modal === 'edit-profile') {
        console.log('edit profile');
      } else {
        console.log('change password');
      }
    } catch (error) {
      console.error(error);
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
        <View style={styles.avatarContainer}>
          <ImageBackground
            source={{ uri: avatar }}
            resizeMode="cover"
            style={{ height: 150, width: 150 }}
            imageStyle={{ borderRadius: 75 }}
          >
            <TouchableOpacity
              onPress={() => {
                addAvatar();
              }}
              style={{ flex: 1 }}
            >
              <Icon
                name="camera"
                color={theme.colors.secondary}
                size={30}
                style={{
                  borderRadius: 100,
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
      </View>
      <DividerLine />
      <View style={styles.editProfile}>
        <Typography
          textStyle={{ marginTop: 10 }}
          variant="h3"
          text="Profile information"
        />
        <Button
          buttonStyle={{ margin: 20, width: 300 }}
          title={'Edit profile'}
          onPress={() => {
            setModal1Visible(true);
          }}
          variant={'secondary'}
        />
      </View>
      <DividerLine />
      <View style={styles.changePassword}>
        <Typography
          textStyle={{ marginTop: 10 }}
          variant="h3"
          text="Password"
        />
        <Button
          buttonStyle={{ margin: 20, width: 300 }}
          title={'Change password'}
          onPress={async () => {
            setModal2Visible(true);
          }}
          variant={'secondary'}
        />
      </View>
      <DividerLine />
      <Button
        buttonStyle={{ margin: 20, width: 300 }}
        title={'Logout'}
        onPress={async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
        variant={'primary'}
      />
      <EditProfileModal
        modalVisible={modal1Visible}
        setModalVisible={setModal1Visible}
      />
      <ChangePasswordModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
      />
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
    margin: 15,
  },
  avatarContainer: {},
});

export default Profile;
