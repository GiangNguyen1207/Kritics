import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MainProvider } from './context/MainContext';

import Navigator from './router/Navigator';

export default function App() {
  return (
    <MainProvider>
      <Navigator />
      <StatusBar style="light" />
    </MainProvider>
  );
}
