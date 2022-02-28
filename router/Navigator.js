import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { mainTab, PostReviewScreen } from './Maintab';
import Home from '../views/Home';
import Favourite from '../views/Favourite';
import Profile from '../views/Profile';
import BottomNavBar from '../components/BottomNavBar';
import Login from '../views/Login';
import Signup from '../views/Signup';
import MovieDetails from '../views/MovieDetails';
import { MainContext } from '../context/MainContext';
import StepOne from '../views/PostMovieReview/StepOne';
import StepTwo from '../views/PostMovieReview/StepTwo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PostScreenStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={PostReviewScreen.stepOne} component={StepOne} />
    <Stack.Screen name={PostReviewScreen.stepTwo} component={StepTwo} />
  </Stack.Navigator>
);

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomNavBar {...props} />}
    >
      <Tab.Screen name={mainTab.home} component={Home} />
      <Tab.Screen name={mainTab.post} component={PostScreenStack} />
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
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetails}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
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
