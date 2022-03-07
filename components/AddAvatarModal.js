import React, { useContext, useState } from 'react';
import { StyleSheet, Modal, Pressable, Image, View } from 'react-native';
import { theme } from '../themes';
import ScreenLayout from '../components/ScreenLayout';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import { useMedia } from '../hooks/useMedia';
import Button from './Button';
import { MainContext } from '../context/MainContext';
import { useToastHandler } from '../context/ToastContext';
import Typography from './Typography';
import { PacmanIndicator } from 'react-native-indicators';

const AddAvatarModal = ({ modalVisible, setModalVisible }) => {
  const { user, setUpdate, update } = useContext(MainContext);
  const { postAvatar, loading } = useMedia();
  const { show } = useToastHandler();
  const [imageSelected, setImageSelected] = useState(false);
  const [type, setType] = useState('image');
  const [image, setImage] = useState(
    `https://dummyimage.com/600x400/4f4f4f/ffffff.png&text=Choose+file`
  );

  const pickImage = async () => {
    const { cancelled, uri, type } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      setImage(uri);
      setImageSelected(true);
      setType(type);
    }
  };

  const onSubmit = async () => {
    if (!imageSelected) {
      show('Upload failed. Please select an image', 'error');
      return;
    }

    const response = await postAvatar(image, type, user.user_id);
    if (response) {
      show('Avatar uploaded successfully', 'success');
      setUpdate(update + 1);
      setModalVisible(false);
    }
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade" co>
      <ScreenLayout
        style={{
          alignSelf: 'center',
          width: '95%',
          marginTop: 120,
          marginBottom: 30,
          elevation: 4,
          borderColor: theme.colors.darkGrey,
          borderWidth: 2,
          borderStyle: 'solid',
          backgroundColor: theme.colors.appBackground,
          borderRadius: 4,
        }}
      >
        <View style={styles.modalContent}>
          <Typography
            variant="h2"
            color={theme.colors.white}
            text="Add an avatar"
          />
          <Pressable onPress={pickImage}>
            <Image
              source={{ uri: image }}
              style={{
                alignSelf: 'center',
                width: '90%',
                height: undefined,
                aspectRatio: 1,
                borderRadius: 10,
              }}
              resizeMode="contain"
            />
          </Pressable>
          <Button
            title="Submit"
            variant={imageSelected ? 'primary' : 'disabled'}
            buttonStyle={{ marginTop: 20, width: 300, alignSelf: 'center' }}
            onPress={onSubmit}
            isDisabled={!imageSelected}
            rightIcon={
              loading && (
                <PacmanIndicator
                  color={theme.colors.white}
                  size={25}
                  style={{ flex: 0.2 }}
                />
              )
            }
          />
          <Button
            buttonStyle={{ margin: 20, width: 300, alignSelf: 'center' }}
            title={'Close'}
            onPress={() => {
              setModalVisible(false);
            }}
            variant={'secondary'}
          />
        </View>
      </ScreenLayout>
    </Modal>
  );
};

AddAvatarModal.propTypes = {
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  image: {
    width: '100%',
    height: 150,
  },
});

export default AddAvatarModal;
