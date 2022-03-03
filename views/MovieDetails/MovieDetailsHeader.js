import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Typography from '../../components/Typography';
import BackButton from '../../components/BackButton';
import { theme } from '../../themes';

export default function MovieDetailsHeader({ navigation }) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.row, { paddingTop: top }]}>
      <View style={styles.flex}>
        <BackButton onPressBack={() => navigation.goBack()} />
      </View>
      <Typography variant="h2" text="Details" style={styles.text} />
      <View style={styles.flex} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacings.s,
    elevation: 10,
    zIndex: 10,
  },
  flex: {
    flex: 1,
  },
  text: {
    flex: 2,
    alignItems: 'center',
  },
});

MovieDetailsHeader.propTypes = {
  navigation: PropTypes.object,
};
