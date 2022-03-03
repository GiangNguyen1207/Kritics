import { View, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Typography from '../../components/Typography';
import ScreenLayout from '../../components/ScreenLayout';
import ContentLayout from '../../components/ContentLayout';
import { mainTab } from '../../router/Maintab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NoFavourite = () => {
  const { top } = useSafeAreaInsets();

  return (
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout hasHeader headerTitle={mainTab.favourite}>
        <View style={styles.container}>
          <LottieView
            source={require('../../assets/lottie/noFavourite.json')}
            style={styles.animation}
            autoPlay
          />
          <Typography
            text="Oops, no favourite movies found...!"
            variant="h3"
          ></Typography>
        </View>
      </ContentLayout>
    </ScreenLayout>
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
  },
});

export default NoFavourite;
