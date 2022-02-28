import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TextInput,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';

import ContentLayout from '../../components/ContentLayout';
import { theme } from '../../themes';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import MovieDetailsCard from '../../components/MovieDetailsCard';
import { PostReviewScreen } from '../../router/Maintab';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { useMedia } from '../../hooks/useMedia';

export default function StepOne({ navigation }) {
  const { top } = useSafeAreaInsets();
  const { suggestedMovies, searchMovies } = useMovieDetails();
  const { mediaArray } = useMedia();
  const [movieName, setMovieName] = useState('');
  const [renderedMovies, setRenderedMovies] = useState([]);

  const handleSearchMovieName = async (searhedName) => {
    setMovieName(searhedName);
    searchMovies(searhedName);
    setRenderedMovies(suggestedMovies);
  };

  const handleChooseMovieName = (selectedMovieName) => {
    setMovieName(selectedMovieName);
    setRenderedMovies([]);
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
    <View style={[styles.layout, { paddingTop: top }]}>
      <KeyboardAwareView animated={true}>
        <ContentLayout
          hasHeader
          headerTitle={'Write a review'}
          style={{ paddingHorizontal: theme.spacings.s, flex: 1 }}
        >
          <View style={styles.container}>
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
              value={
                movieName.includes('-') ? movieName.split('-')[0] : movieName
              }
              style={styles.input}
            />
            <FlatList
              data={renderedMovies}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    handleChooseMovieName(item.original_title + '-' + item.id)
                  }
                >
                  <MovieDetailsCard movieDetails={item} hasBottomLine />
                </Pressable>
              )}
            />
            <Button
              title="Go to Step 2"
              variant={movieName ? 'primary' : 'disabled'}
              onPress={handleButtonSubmit}
              isDisabled={!movieName}
            />
          </View>
        </ContentLayout>
      </KeyboardAwareView>
    </View>
  );
}

StepOne.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: theme.colors.appBackground,
  },
  container: {
    marginVertical: theme.spacings.xs,
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
