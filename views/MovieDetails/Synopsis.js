import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import langs from 'langs';

import HorizontalLine from '../../components/HorizontalLine';
import Typography from '../../components/Typography';
import { theme } from '../../themes';
import GenreCard from '../../components/GenreCard';

export default function Synopsis({ movieDetails }) {
  const fullLanguage = langs.where('1', movieDetails.original_language);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Typography text="Plot" variant="h4" fontWeight="bold" />
        <Typography
          text={movieDetails.overview}
          variant="h5"
          textStyle={styles.text}
        />
        <Typography text="Original Language" variant="h4" fontWeight="bold" />
        <Typography
          text={fullLanguage ? fullLanguage.name : 'Not defined yet'}
          variant="h5"
          textStyle={styles.originLanguage}
        />
      </View>
      <HorizontalLine color={theme.colors.lightGrey} />
      <View style={{ paddingHorizontal: theme.spacings.s }}>
        <Typography text="Genres" variant="h4" fontWeight="bold" />
        <View style={styles.row}>
          {movieDetails.genres.map((genre) => (
            <GenreCard
              genre={genre.name}
              key={genre.id}
              style={styles.genreCard}
            />
          ))}
        </View>
      </View>
      <HorizontalLine color={theme.colors.lightGrey} />
    </ScrollView>
  );
}

Synopsis.propTypes = {
  movieDetails: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacings.xs,
    paddingHorizontal: theme.spacings.s,
  },
  text: {
    marginTop: theme.spacings.xxxs,
    marginBottom: theme.spacings.s,
  },
  originLanguage: {
    marginTop: theme.spacings.xxxs,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacings.xxxs,
  },
  genreCard: {
    marginTop: theme.spacings.xs,
    marginRight: theme.spacings.m,
  },
});
