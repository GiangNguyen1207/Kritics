import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Pressable, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native';

import ScreenLayout from '../../components/ScreenLayout';
import ContentLayout from '../../components/ContentLayout';
import { theme } from '../../themes';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import MovieDetailsCard from '../../components/MovieDetailsCard';
import { PostReviewScreen } from '../../router/Maintab';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { useMedia } from '../../hooks/useMedia';
import SearchBar from '../../components/SearchBar';
import { useToastHandler } from '../../context/ToastContext';

export default function StepOne({ navigation }) {
  const isFocused = useIsFocused();
  const { top, bottom } = useSafeAreaInsets();
  const { searchMovies } = useMovieDetails();
  const { mediaArray } = useMedia(isFocused);
  const { show } = useToastHandler();
  const [movieName, setMovieName] = useState('');
  const [isMovieNameSelected, setIsMovieNameSelected] = useState(false);
  const [renderedMovies, setRenderedMovies] = useState([]);

  const handleSearchMovieName = async () => {
    const suggestedMovies = await searchMovies(movieName);
    setRenderedMovies(suggestedMovies);
  };

  const handleChooseMovieName = (selectedMovieName) => {
    setMovieName(selectedMovieName);
    setRenderedMovies([]);
    setIsMovieNameSelected(true);
  };

  const handleSearchInputChange = (searchedName) => {
    setIsMovieNameSelected(false);
    setMovieName(searchedName);
  };

  const handleButtonSubmit = () => {
    const existingMovie = mediaArray.find((movie) => movie.title === movieName);
    if (!movieName) {
      show('Please choose a movie', 'warning');
      return;
    }

    if (existingMovie) {
      show(
        'This movie exists in the database. Please choose another one',
        'warning'
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
        <SearchBar
          searchTerm={
            movieName.includes('_id:') ? movieName.split('_id:')[0] : movieName
          }
          onSearchTermChange={(searchedName) =>
            handleSearchInputChange(searchedName)
          }
          onSearchSubmit={handleSearchMovieName}
        />
        <FlatList
          data={renderedMovies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                handleChooseMovieName(item.title + '_id:' + item.id)
              }
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
          buttonStyle={{ marginBottom: theme.spacings.xs }}
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
});
