import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import * as Progress from 'react-native-progress';

import ScreenLayout from '../../components/ScreenLayout';
import ContentLayout from '../../components/ContentLayout';
import { theme } from '../../themes';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import MovieDetailsCard from '../../components/MovieDetailsCard';
import { PostReviewScreen } from '../../router/Maintab';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { useMedia } from '../../hooks/useMedia';

export default function StepOne({ navigation }) {
  const { top, bottom } = useSafeAreaInsets();
  const { suggestedMovies, searchMovies } = useMovieDetails();
  const { mediaArray } = useMedia();
  const [movieName, setMovieName] = useState('');
  const [isMovieNameSelected, setIsMovieNameSelected] = useState(false);
  const [renderedMovies, setRenderedMovies] = useState([]);

  const handleSearchMovieName = async (searhedName) => {
    setMovieName(searhedName);
    searchMovies(searhedName);
    setRenderedMovies(suggestedMovies);
    setIsMovieNameSelected(false);
  };

  const handleChooseMovieName = (selectedMovieName) => {
    setMovieName(selectedMovieName);
    setRenderedMovies([]);
    setIsMovieNameSelected(true);
  };

  const handleButtonSubmit = () => {
    const existingMovie = mediaArray.find((movie) => movie.title === movieName);
    if (!movieName) {
      Alert.alert('Please choose a movie');
      return;
    }

    if (existingMovie) {
      Alert.alert(
        'This movie exists in the database. Please choose another one'
      );
      return;
    }

    navigation.navigate(PostReviewScreen.stepTwo, {
      movieName,
    });
  };

  return (
    <ScreenLayout
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <ContentLayout
        hasHeader
        headerTitle={'Write a review'}
        style={{ paddingHorizontal: theme.spacings.s, flex: 1 }}
      >
        <Typography variant="h4" text="Step 1" />
        <Progress.Bar
          progress={0.5}
          width={null}
          height={10}
          color={theme.colors.primary}
          borderColor={theme.colors.primary}
          style={styles.progressBar}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Movie name"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={(movieName) => handleSearchMovieName(movieName)}
          value={movieName.includes('-') ? movieName.split('-')[0] : movieName}
          style={styles.input}
        />
        <FlatList
          data={renderedMovies}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleChooseMovieName(item.title + '-' + item.id)}
            >
              <MovieDetailsCard movieDetails={item} hasBottomLine />
            </Pressable>
          )}
        />
        <Button
          title="Go to Step 2"
          variant={isMovieNameSelected ? 'primary' : 'disabled'}
          onPress={handleButtonSubmit}
          isDisabled={!isMovieNameSelected}
        />
      </ContentLayout>
    </ScreenLayout>
  );
}

StepOne.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  progressBar: {
    marginTop: theme.spacings.Xs,
    marginBottom: theme.spacings.l,
  },
  input: {
    height: theme.spacings.xxl,
    marginVertical: theme.spacings.xs,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.spacings.Xs,
    padding: theme.spacings.xxs,
    color: theme.colors.white,
  },
});
