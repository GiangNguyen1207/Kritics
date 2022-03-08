import { View, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Typography from '../../components/Typography';

const NoFavourite = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lottie/noFavourite.json')}
        style={styles.animation}
        autoPlay
        loop
      />
      <Typography
        text="Oops, no favourite movies found...!"
        variant="h3"
      ></Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    alignItems: 'center',
  },
  animation: {
    height: 500,
    width: 200,
    marginTop: 50,
  },
});

export default NoFavourite;
