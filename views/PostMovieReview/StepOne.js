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

import ScreenLayout from '../../components/ScreenLayout';
import ContentLayout from '../../components/ContentLayout';
import { theme } from '../../themes';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import { PostReviewScreen } from '../../router/Maintab';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { useMedia } from '../../hooks/useMedia';

export default function StepOne({ navigation }) {
  const { top } = useSafeAreaInsets();
  const { suggestedMovies } = useMovieDetails();
  const { mediaArray } = useMedia();
  const [movieName, setMovieName] = useState('');
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSearchMovieName = async (searhedName) => {
    setMovieName(searhedName);
    setRenderedMovies(suggestedMovies);
  };

  const handleChooseMovieName = (selectedMovieName) => {
    setMovieName(selectedMovieName);
    setRenderedMovies([]);
    setIsFinished(true);
  };

  const handleButtonSubmit = () => {
    const existingMovie = mediaArray.find((movie) => movie.title === movieName);
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
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout
        hasHeader
        headerTitle={'Write a review'}
        style={{ paddingHorizontal: theme.spacings.s }}
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
          {renderedMovies.length > 0 ? (
            <FlatList
              data={renderedMovies}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    handleChooseMovieName(item.original_title + '-' + item.id)
                  }
                >
                  <Typography
                    style={styles.item}
                    text={item.original_title}
                    variant="h3"
                  />
                </Pressable>
              )}
            />
          ) : (
            <Typography
              style={styles.item}
              text={'No results found'}
              variant="h3"
            />
          )}
          <Button
            title="Go to Step 2"
            variant={isFinished ? 'primary' : 'disabled'}
            onPress={handleButtonSubmit}
            isDisable={!isFinished}
          />
        </View>
      </ContentLayout>
    </ScreenLayout>
  );
}

StepOne.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
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
