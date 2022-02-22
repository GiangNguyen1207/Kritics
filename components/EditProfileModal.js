import React from 'react';
import { StyleSheet, View, Modal, TextInput, Text } from 'react-native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import Button from './Button';

const EditProfileModal = ({ modalVisible, setModalVisible }) => {
  const onSubmit = () => {
    try {
      console.log('edit profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal visible={modalVisible}>
      <View style={styles.modalContent}>
        <Formik
          initialValues={{ newUsername: '', newEmail: '' }}
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
          }) => (
            <View>
              <TextInput
                name="newUsername"
                placeholder="New username"
                autoCapitalize="none"
                onChangeText={handleChange('newUsername')}
                onBlur={handleBlur('newUsername')}
                value={values.newUsername}
                style={styles.textInput}
              />
              {errors.newUsername && touched.newUsername && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.newUsername}
                </Text>
              )}
              <TextInput
                name="newEmail"
                placeholder="New email"
                onChangeText={handleChange('newEmail')}
                onBlur={handleBlur('newEmail')}
                value={values.newEmail}
                style={styles.textInput}
              />
              {errors.newEmail && touched.newEmail && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.newEmail}
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

EditProfileModal.propTypes = {
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

export default EditProfileModal;
