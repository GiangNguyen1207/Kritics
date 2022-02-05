import React, { useContext, useEffect } from 'react';
import {
  TextInput,
  SafeAreaView,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import Typography from '../components/Typography';
import { theme } from '../themes';
import { Formik } from 'formik';
import { useUser, useLogin } from '../hooks/ApiHooks';
import { MainContext } from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const { getUserByToken } = useUser();
  const { setIsLoggedIn, setUser } = useContext(MainContext);
  const { postLogin } = useLogin();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      console.log(userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = async (data) => {
    try {
      const userData = await postLogin(data);
      await AsyncStorage.setItem('userToken', userData.token);
      setUser(userData.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Typography variant="h2" text="Login" color={theme.colors.primary} />
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                name="username"
                placeholder="Username"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                style={styles.textInput}
              />
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
  loginContainer: {
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

export default Login;
