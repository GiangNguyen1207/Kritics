import React from 'react';
import { StyleSheet, View, Modal, TextInput, Text } from 'react-native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import Button from './Button';

const ChangePasswordModal = ({ modalVisible, setModalVisible }) => {
  const onSubmit = () => {
    try {
      console.log('change-password');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal visible={modalVisible}>
      <View style={styles.modalContent}>
        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          onSubmit={(values) => {
            onSubmit(values, 'change-password');
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                type="password"
                secureTextEntry
                name="newPassword"
                placeholder="New password"
                autoCapitalize="none"
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                style={styles.textInput}
              />
              {errors.newPassword && touched.newPassword && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.newPassword}
                </Text>
              )}
              <TextInput
                type="password"
                secureTextEntry
                name="confirmPassword"
                placeholder="Confirm password"
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
                buttonStyle={{ marginTop: 20 }}
                title="Apply"
                onPress={handleSubmit}
                variant="primary"
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
