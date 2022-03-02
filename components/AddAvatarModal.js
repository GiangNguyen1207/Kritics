import React, { useContext, useState } from 'react';
import { StyleSheet, Modal, Pressable, Image, View, Alert } from 'react-native';
import { theme } from '../themes';
import ScreenLayout from '../components/ScreenLayout';
import ContentLayout from '../components/ContentLayout';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import { useMedia } from '../hooks/useMedia';
import Button from './Button';
import { MainContext } from '../context/MainContext';

const AddAvatarModal = ({ modalVisible, setModalVisible }) => {
  const { user, setUpdate, update } = useContext(MainContext);
  const { postAvatar } = useMedia();
  const [imageSelected, setImageSelected] = useState(false);
  const [type, setType] = useState('image');
  const [image, setImage] = useState(
    `https://place-hold.it/300x200&text=ChooseFile`
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
      Alert.alert('Upload failed', 'No image selected.');
      return;
    }

    try {
      const response = await postAvatar(image, type, user.user_id);
      console.log('upload response', response);
      response &&
        Alert.alert('Avatar', 'Avatar uploaded successfully', [
          {
            text: 'OK',
            onPress: () => {
              setUpdate(update + 1);
              setModalVisible(false);
            },
            style: 'default',
          },
        ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal visible={modalVisible}>
      <ScreenLayout style={{}}>
        <ContentLayout
          hasHeader
          headerTitle="Add avatar"
          onPressBack={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContent}>
            <Pressable onPress={pickImage}>
              <Image
                source={{ uri: image }}
                style={{
                  alignSelf: 'center',
                  width: '90%',
                  height: undefined,
                  aspectRatio: 1,
                }}
                resizeMode="contain"
              />
            </Pressable>
            <Button
              title="Submit"
              variant={imageSelected ? 'primary' : 'disabled'}
              buttonStyle={{ margin: 20, width: 300, alignSelf: 'center' }}
              onPress={onSubmit}
              isDisabled={!imageSelected}
            />
          </View>
        </ContentLayout>
      </ScreenLayout>
    </Modal>
  );
};

AddAvatarModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: theme.colors.appBackground,
  },
  image: {
    width: '100%',
    height: 150,
  },
});

export default AddAvatarModal;
