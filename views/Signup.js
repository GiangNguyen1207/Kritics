import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { theme } from '../themes';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useUser } from '../services/AuthService';
import ScreenLayout from '../components/ScreenLayout';
import { useToastHandler } from '../context/ToastContext';
import DividerLine from '../components/DividerLine';

const { postUser, checkUsername } = useUser();

const SignupSchema = yup.object({
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
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(5, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  /*
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character'
    )
    */
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  full_name: yup.string().matches(/(\w.+\s).+/, 'Enter at least 2 names'),
});

const Signup = ({ navigation }) => {
  const { show } = useToastHandler();
  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;
      const userData = await postUser(data);
      if (userData) {
        show('User created successfully', 'success');
        navigation.navigate('Login');
      }
    } catch (error) {
      show(error.message, 'error');
    }
  };

  return (
    <ScreenLayout style={styles.container} type="scroll">
      <Formik
        validationSchema={SignupSchema}
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          full_name: '',
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
              placeholder="Username"
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
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.textInput}
            />
            {errors.email && touched.email && (
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            )}
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
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
              placeholder="Confirm password"
              secureTextEntry
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
            <TextInput
              type="full_name"
              name="full_name"
              placeholder="Full name"
              autoCapitalize="words"
              onChangeText={handleChange('full_name')}
              onBlur={handleBlur('full_name')}
              value={values.full_name}
              style={styles.textInput}
            />
            {errors.full_name && touched.full_name && (
              <Text style={{ fontSize: 10, color: 'red' }}>
                {errors.full_name}
              </Text>
            )}
            <Button
              title="Signup"
              onPress={handleSubmit}
              variant={isValid ? 'primary' : 'disabled'}
              isDisabled={!isValid}
              buttonStyle={{ marginTop: 20 }}
            />
            <Button
              buttonStyle={{ marginTop: 15 }}
              title="Back to login"
              onPress={() => navigation.navigate('Login')}
              variant={'secondary'}
            />
          </View>
        )}
      </Formik>
    </ScreenLayout>
  );
};

Signup.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: 220,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
  },
});

export default Signup;
