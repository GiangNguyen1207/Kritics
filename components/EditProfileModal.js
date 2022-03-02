import React, { useContext } from 'react';
import { StyleSheet, View, Modal, TextInput, Text } from 'react-native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import Button from './Button';
import { theme } from '../themes';
import ScreenLayout from '../components/ScreenLayout';
import ContentLayout from '../components/ContentLayout';
import * as yup from 'yup';
import { useUser } from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from '../context/MainContext';

const { putUser, checkUsername } = useUser();

const EditSchema = yup.object({
  username: yup
    .string()
    .required('Username required')
    .min(3, ({ min }) => `Username must be at least ${min} characters`)
    .test('unique-username', 'Username is already in use.', async (value) => {
      try {
        const available = await checkUsername(value);
        return !!available;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

const EditProfileModal = ({ modalVisible, setModalVisible }) => {
  const { user, setUser } = useContext(MainContext);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await putUser(data, userToken);
      console.log('edit profile onSubmit', userData);
      if (userData) {
        setUser(data);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal visible={modalVisible}>
      <ScreenLayout style={{}}>
        <ContentLayout
          hasHeader
          headerTitle="Edit profile"
          onPressBack={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContent}>
            <Formik
              validationSchema={EditSchema}
              initialValues={{
                username: user.username,
                email: user.email,
              }}
              onSubmit={(values) => {
                onSubmit(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <View>
                  <TextInput
                    name="username"
                    placeholder="New username"
                    autoCapitalize="none"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    style={styles.textInput}
                  />
                  {errors.username && touched.username && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.username}
                    </Text>
                  )}
                  <TextInput
                    type="email"
                    name="email"
                    autoCapitalize="none"
                    placeholder="New email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    style={styles.textInput}
                  />
                  {errors.email && touched.email && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.email}
                    </Text>
                  )}
                  <Button
                    title="Submit"
                    onPress={handleSubmit}
                    variant={isValid ? 'primary' : 'disabled'}
                    isDisable={!isValid}
                    buttonStyle={{ marginTop: 20 }}
                  />
                </View>
              )}
            </Formik>
            <Button
              buttonStyle={{ margin: 20, width: 300 }}
              title={'Close'}
              onPress={() => {
                setModalVisible(false);
              }}
              variant={'secondary'}
            />
          </View>
        </ContentLayout>
      </ScreenLayout>
    </Modal>
  );
};

EditProfileModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.appBackground,
  },
  textInput: {
    height: 40,
    width: 300,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
  },
});

export default EditProfileModal;
