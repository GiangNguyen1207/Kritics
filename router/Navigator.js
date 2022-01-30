import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { mainTab } from './Maintab';
import Home from '../views/Home';
import PostMovieReview from '../views/PostMovieReview';
import Favourite from '../views/Favourite';
import Profile from '../views/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={mainTab.home} component={Home} />
      <Tab.Screen name={mainTab.post} component={PostMovieReview} />
      <Tab.Screen name={mainTab.favourite} component={Favourite} />
      <Tab.Screen name={mainTab.profile} component={Profile} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
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
