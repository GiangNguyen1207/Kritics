import {
  StyleSheet,
  Image,
  Pressable,
  ViewPropTypes,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';

import Typography from './Typography';
import { theme } from '../themes';
import { uploadsUrl } from '../utils/variables';

const MovieCard = ({
  item,
  showTagIcon,
  rating,
  handleFavouritePress,
  cardStyle,
}) => {
  return (
    <Pressable style={[styles.card, cardStyle]}>
      <Image
        source={{ uri: uploadsUrl + item.thumbnails.w160 }}
        style={styles.image}
      />
      {showTagIcon && (
        <Pressable
          style={styles.box}
          onPress={() => handleFavouritePress(item.file_id, item.isFavourite)}
        >
          <Icon
            name={'bookmark'}
            size={16}
            color={item.isFavourite ? theme.colors.primary : theme.colors.white}
          />
        </Pressable>
      )}
      <Typography
        variant="h5"
        text={item.title}
        color={theme.colors.primary}
        textStyle={styles.text}
      />
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
    width: Dimensions.get('window').width / 3 - theme.spacings.xs,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: theme.spacings.xxxs,
  },
  box: {
    backgroundColor: 'black',
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  image: {
    width: '100%',
    flex: 1,
  },
  text: {
    marginVertical: theme.spacings.Xs,
  },
  rating: {
    bottom: 10,
    left: 10,
  },
});

MovieCard.propTypes = {
  item: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
  showTagIcon: PropTypes.bool.isRequired,
  handleFavouritePress: PropTypes.func,
  cardStyle: ViewPropTypes.style,
};
export default MovieCard;
