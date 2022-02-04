import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import Typography from './Typography';
import { theme } from '../themes';
import StarRating from 'react-native-star-rating';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const MovieCard = ({ title, imageUri, rating, isLoggedIn }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.image}
      />

      {isLoggedIn && (
        <View style={styles.box}>
          <Icon
            name={'bookmark'}
            size={16}
            style={styles.icon}
            color={theme.colors.white}
          />
        </View>
      )}

      <Typography variant="h5" text={title} style={styles.title} />
      <StarRating
        disabled
        maxStars={5}
        starSize={12}
        containerStyle={{ width: '50%' }}
        rating={rating}
        emptyStarColor={theme.colors.white}
        fullStarColor={theme.colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 110,
  },
  icon: {
    color: 'white',
  },
  box: {
    backgroundColor: 'black',
    width: 20,
    height: 25,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  image: {
    width: '100%',
    flex: 1,
  },

  rating: {
    bottom: 10,
    left: 10,
  },
});

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUri: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
export default MovieCard;
