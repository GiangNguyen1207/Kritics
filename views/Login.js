import React, { useContext, useEffect } from 'react';
import { TextInput, View, StyleSheet, Text, Image } from 'react-native';
import { theme } from '../themes';
import { Formik } from 'formik';
import { MainContext } from '../context/MainContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Link } from '@react-navigation/native';
import Button from '../components/Button';
import { useUser, useLogin } from '../services/AuthService';
import ScreenLayout from '../components/ScreenLayout';
import { auth } from '../utils/auth';
import { useToastHandler } from '../context/ToastContext';

const LoginSchema = yup.object({
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required'),
});

const Login = ({ navigation }) => {
  const { getUserByToken } = useUser();
  const { setIsLoggedIn, setUser } = useContext(MainContext);
  const { postLogin } = useLogin();
  const { show } = useToastHandler();

  const checkToken = async () => {
    const userToken = await auth.getUserTokenFromStorage();
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (e) {
      show(e.message, 'error');
    }
  };

  const onSubmit = async (data) => {
    try {
      const userData = await postLogin(data);

      await auth.setUserTokenToStorage(userData.token);
      setUser(userData.user);
      setIsLoggedIn(true);
    } catch (error) {
      show(error.message, 'error');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ScreenLayout style={styles.container} type="scroll">
      <Image
        source={require('../assets/adaptive-icon2.png')}
        style={{ width: 400, height: 300, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ username: '', password: '' }}
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
            <Button
              title="Login"
              onPress={handleSubmit}
              variant="primary"
              buttonStyle={{ marginTop: 10 }}
            />
          </View>
        )}
      </Formik>
      <Text style={{ color: '#ffffff', fontSize: 15, marginTop: 10 }}>
        Don&apos;t have an account yet?
        <Link
          to={{ screen: 'Signup', params: {} }}
          style={{ fontSize: 15, color: theme.colors.primary }}
        >
          {' '}
          Signup
        </Link>{' '}
        now
      </Text>
    </ScreenLayout>
  );
};

Login.propTypes = {
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

export default Login;
