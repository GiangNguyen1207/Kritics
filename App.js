import React from 'react';
import { StatusBar } from 'expo-status-bar';

import Navigator from './router/Navigator';

export default function App() {
  return (
    <>
      <Navigator />
      <StatusBar style="light" />
    </>
  );
}
