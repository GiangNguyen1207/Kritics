import React, { useContext, useEffect } from 'react';
import {
  TextInput,
  SafeAreaView,
  View,
  StyleSheet,
  Button,
  Text,
} from 'react-native';
import Typography from '../components/Typography';
import { theme } from '../themes';
import { Formik } from 'formik';
import { useUser, useLogin } from '../hooks/ApiHooks';
import { MainContext } from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';

const SignupSchema = yup.object({
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required'),
  confirmPassword: yup.string().required('Password required'),
  email: yup.string().required('Email required'),
  full_name: yup.string().required('Full name required'),
});

const Signup = () => {
  const onSubmit = async (data) => {
    try {
      console.log(data);
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
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
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
