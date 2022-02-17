import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import CommentCard from '../components/CommentCard';

import { theme } from '../themes';

const MovieDetails = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CommentCard />
    </View>
  );
};
MovieDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBackground,
    marginTop: 20,
  },
});

export default MovieDetails;
