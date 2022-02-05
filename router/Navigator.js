import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { mainTab } from './Maintab';
import Home from '../views/Home';
import PostMovieReview from '../views/PostMovieReview';
import Favourite from '../views/Favourite';
import Profile from '../views/Profile';
import BottomNavBar from '../components/BottomNavBar';
import Login from '../views/Login';
import { MainContext } from '../context/MainContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomNavBar {...props} />}
    >
      <Tab.Screen name={mainTab.home} component={Home} />
      <Tab.Screen name={mainTab.post} component={PostMovieReview} />
      <Tab.Screen name={mainTab.favourite} component={Favourite} />
      <Tab.Screen name={mainTab.profile} component={Profile} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const { isLoggedIn } = useContext(MainContext);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={TabScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
