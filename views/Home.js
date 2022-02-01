import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Typography from '../components/Typography';
import Button from '../components/Button';
import { theme } from '../themes';

const Home = () => {
  return (
    <SafeAreaView>
      {/* this is just for testing  */}
      <Typography variant="h2" text="Home" color={theme.colors.primary} />
      <Button title="Primary Button" variant="primary" onPress={() => {}} />
      <Button title="Secondary Button" variant="secondary" onPress={() => {}} />
      <Button title="Normal Button" onPress={() => {}} />
    </SafeAreaView>
  );
};

export default Home;
