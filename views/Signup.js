import React from 'react';
import {
  TextInput,
  SafeAreaView,
  View,
  StyleSheet,
  Button,
  Text,
  Alert,
} from 'react-native';
import Typography from '../components/Typography';
import { theme } from '../themes';
import { Formik } from 'formik';
import { useUser } from '../hooks/ApiHooks';
import * as yup from 'yup';
import PropTypes from 'prop-types';

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
  full_name: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
});

const Signup = ({ navigation }) => {
  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;
      const userData = await postUser(data);
      console.log('register onSubmit', userData);
      if (userData) {
        Alert.alert('Success', 'User created successfully.');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupContainer}>
        <Typography variant="h2" text="Sign up" color={theme.colors.primary} />
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
                placeholder="Email"
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
                disabled={!isValid}
                onPress={handleSubmit}
                title="Submit"
              />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

Signup.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.appBackground,
  },
  signupContainer: {
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    height: 40,
    width: 200,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
  },
});

export default Signup;
