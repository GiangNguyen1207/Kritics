import { View, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Typography from './Typography';
import PropTypes from 'prop-types';
import { theme } from '../themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

const MovieCard = ({ title, imageUri, isLoggedIn, rating }) => {
  return (
    <Pressable style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} />
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
      <Typography variant="h5" text={title} color={theme.colors.primary} />
      <StarRating
        disabled
        maxStars={5}
        starSize={12}
        containerStyle={{ width: '50%' }}
        rating={rating}
        emptyStarColor={theme.colors.white}
        fullStarColor={theme.colors.white}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    margin: 5,
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
