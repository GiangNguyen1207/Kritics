import React from 'react';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { theme } from '../themes';
import List from '../components/List';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* this is just for testing  */}
      <Typography variant="h2" text="Home" color={theme.colors.primary} />
      <Button title="Primary Button" variant="primary" onPress={() => {}} />
      <Button title="Secondary Button" variant="secondary" onPress={() => {}} />
      {/* <Button title="Normal Button" onPress={() => {}} />
      {/* <MovieCard
        isLoggedIn
        imageUri="https://static.wikia.nocookie.net/ironman/images/d/da/P170620_v_v8_ba.jpg/revision/latest/scale-to-width-down/333?cb=20191202183622"
        rating={3}
      /> */}
      <List />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.darkGrey,
    paddingStart: 10,
    paddingEnd: 10,
  },
});
export default Home;
