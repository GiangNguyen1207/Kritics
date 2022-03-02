import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MainProvider } from './context/MainContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigator from './router/Navigator';
import ToastProvider from './components/Toast';

export default function App() {
  return (
    <MainProvider>
      <SafeAreaProvider>
        <ToastProvider>
          <Navigator />
          <StatusBar style="light" />
        </ToastProvider>
      </SafeAreaProvider>
    </MainProvider>
  );
}
