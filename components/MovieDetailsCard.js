import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Typography from './Typography';
import { theme } from '../themes';
import HorizontalLine from './HorizontalLine';

const MovieDetailsCard = ({
  movieDetails,
  hasDetails,
  hasBottomLine,
  bottomLineColor,
}) => {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <View style={styles.row}>
        <Image source={{ uri: movieDetails.image }} style={styles.image} />
        <View>
          <Typography text={movieDetails.name} variant="h2" />
          {hasDetails && (
            <>
              <Typography
                text={`${movieDetails.release_date} | ${movieDetails.runtime} mins`}
                variant="h5"
              />
              <Typography
                text="Average rating"
                variant="h4"
                textStyle={{
                  marginTop: theme.spacings.s,
                }}
              />
              <Pressable
                style={[styles.button, selected ? styles.selected : null]}
                onPress={() => setSelected(!selected)}
              >
                <Icon
                  name="bookmark"
                  color={theme.colors.white}
                  size={15}
                  style={{ marginRight: theme.spacings.Xs }}
                />
                <Typography
                  text={selected ? 'Added to Favourtie' : 'Add to Favourite'}
                  variant="h4"
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
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '45%',
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
});

MovieDetailsCard.propTypes = {
  movieDetails: PropTypes.object,
  hasDetails: PropTypes.bool,
  hasBottomLine: PropTypes.bool,
  bottomLineColor: PropTypes.string,
};

export default MovieDetailsCard;
