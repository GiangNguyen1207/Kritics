import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '../themes';
import Typography from './Typography';

const GenreCard = ({ genre, selected, style }) => {
  return (
    <View style={[styles.container, style, selected ? styles.selected : null]}>
      <Typography
        text={genre}
        variant="h5"
        color={selected ? theme.colors.white : theme.colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacings.xxs,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  selected: {
    backgroundColor: theme.colors.primary,
  },
});

GenreCard.propTypes = {
  genre: PropTypes.string,
  selected: PropTypes.bool,
  style: ViewPropTypes.style,
};

export default GenreCard;
