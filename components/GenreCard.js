import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '../themes';
import Typography from './Typography';

const GenreCard = ({ genre, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Typography text={genre} variant="h5" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: theme.spacings.xxs,
    borderRadius: 5,
  },
});

GenreCard.propTypes = {
  genre: PropTypes.string,
  style: ViewPropTypes.style,
};

export default GenreCard;
