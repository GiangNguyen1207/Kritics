import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  ViewPropTypes,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import format from 'date-fns/format';
import StarRating from 'react-native-star-rating';

import Typography from './Typography';
import { theme } from '../themes';
import HorizontalLine from './HorizontalLine';
import { uploadsUrl } from '../utils/variables';

const MovieDetailsCard = ({
  movieDetails,
  hasDetails,
  averageRating,
  hasBottomLine,
  bottomLineColor,
  uploadImageUrl,
  addToFavourite,
  deleteFavourite,
  isFavourite,
  hasReleaseYear,
  style,
}) => {
  const date = movieDetails.release_date;
  const formattedReleaseDate =
    date && format(new Date(movieDetails.release_date), 'dd-MM-yyyy');
  const releaseYear = date && date.split('-')[0];

  const handleFavouritePress = () => {
    if (isFavourite) deleteFavourite();
    else addToFavourite();
  };

  return (
    <>
      <View style={[styles.row, style]}>
        <Image
          source={{
            uri: uploadImageUrl
              ? uploadsUrl + uploadImageUrl
              : `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`,
          }}
          style={[
            styles.image,
            uploadImageUrl ? { marginRight: theme.spacings.xs } : {},
          ]}
        />
        <View style={{ flex: 1, marginVertical: theme.spacings.xs }}>
          <Typography text={movieDetails.title} variant="h3" fontWeight="600" />
          {hasReleaseYear && <Typography text={releaseYear} variant="h3" />}
          {hasDetails && (
            <>
              <Typography
                text={`${formattedReleaseDate} | ${movieDetails.runtime} mins`}
                variant="h5"
              />
              <View style={styles.rating}>
                <Typography text="Average rating: " variant="h5" />
                <StarRating
                  maxStars={5}
                  starSize={15}
                  rating={averageRating}
                  emptyStarColor={theme.colors.white}
                  fullStarColor={theme.colors.white}
                />
              </View>
              <Pressable
                style={[styles.button, isFavourite ? styles.selected : null]}
                onPress={() => handleFavouritePress()}
              >
                <Icon
                  name="bookmark"
                  color={theme.colors.white}
                  size={15}
                  style={{ marginRight: theme.spacings.Xs }}
                />
                <Typography
                  text={isFavourite ? 'Added to Favourite' : 'Add to Favourite'}
                  variant="h5"
                  fontWeight="600"
                />
              </Pressable>
            </>
          )}
        </View>
      </View>
      {hasBottomLine && (
        <HorizontalLine color={bottomLineColor ?? theme.colors.lightGrey} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '40%',
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    marginTop: theme.spacings.xxs,
    padding: theme.spacings.xxxs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: theme.spacings.Xs,
  },
  selected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  rating: {
    marginTop: theme.spacings.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

MovieDetailsCard.propTypes = {
  movieDetails: PropTypes.object,
  hasDetails: PropTypes.bool,
  averageRating: PropTypes.number,
  hasBottomLine: PropTypes.bool,
  bottomLineColor: PropTypes.string,
  uploadImageUrl: PropTypes.string,
  hasReleaseYear: PropTypes.bool,
  addToFavourite: PropTypes.func,
  deleteFavourite: PropTypes.func,
  isFavourite: PropTypes.bool,
  style: ViewPropTypes.style,
};

export default MovieDetailsCard;
