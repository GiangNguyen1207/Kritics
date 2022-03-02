import React from 'react';
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
import { useToastHandler } from '../context/ToastContext';

const { putUser } = useUser();

const EditSchema = yup.object({
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(5, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const ChangePasswordModal = ({ modalVisible, setModalVisible }) => {
  const { show } = useToastHandler();

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;
      if (data.password === '') {
        delete data.password;
      }
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await putUser(data, userToken);
      if (userData) {
        setModalVisible(false);
      }
    } catch (error) {
      show(error.message, 'error');
    }
  };

  return (
    <Modal visible={modalVisible} style={{}}>
      <ScreenLayout>
        <ContentLayout
          hasHeader
          headerTitle="Change password"
          onPressBack={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContent}>
            <Formik
              validationSchema={EditSchema}
              initialValues={{
                password: '',
                confirmPassword: '',
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
                    type="password"
                    name="password"
                    placeholder="New password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    style={styles.textInput}
                  />
                  {errors.password && touched.password && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.password}
                    </Text>
                  )}
                  <TextInput
                    type="confirmPassword"
                    name="confirmPassword"
                    secureTextEntry
                    placeholder="Confirm new password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    style={styles.textInput}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.confirmPassword}
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

ChangePasswordModal.propTypes = {
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

export default ChangePasswordModal;
