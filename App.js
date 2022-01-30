import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import Navigator from './router/Navigator';

export default function App() {
  return (
    <>
      <Navigator />
      <StatusBar style="auto" />
    </>
  );
}
