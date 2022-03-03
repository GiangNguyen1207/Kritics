import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MainProvider } from './context/MainContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import Navigator from './router/Navigator';
import ToastProvider from './context/ToastContext';

export default function App() {
  return (
    <MainProvider>
      <SafeAreaProvider>
        <ToastProvider>
          <BottomSheetModalProvider>
            <Navigator />
            <StatusBar style="light" />
          </BottomSheetModalProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </MainProvider>
  );
}
