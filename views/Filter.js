import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';

import { theme } from '../themes';
import ContentLayout from '../components/ContentLayout';
import ScreenLayout from '../components/ScreenLayout';
import MovieDetailsCard from '../components/MovieDetailsCard';
import { useMedia } from '../hooks/useMedia';
import Typography from '../components/Typography';

export default function Filter({ route, navigation }) {
  const isFocused = useIsFocused();
  const { top, bottom } = useSafeAreaInsets();
  const { selectedGenres } = route.params;
  const { sortedMediaByTitle } = useMedia(isFocused);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    const movies = [];
    for (const media of sortedMediaByTitle) {
      const description = JSON.parse(media.description);
      const genres = description.genres.map((genre) => genre.name);
      const intersection = genres.filter((genre) =>
        selectedGenres.includes(genre)
      );
      if (intersection.length > 0) {
        movies.push(media);
        setFilteredMovies(movies);
        setScreenLoading(false);
      }
    }
  }, [sortedMediaByTitle, selectedGenres]);

  return (
    <ScreenLayout style={{ paddingTop: top, paddingBottom: bottom }}>
      <ContentLayout
        hasHeader
        headerTitle={`Filter by ${selectedGenres.join(', ')}`}
        onPressBack={() => navigation.goBack()}
        style={{ paddingHorizontal: theme.spacings.s }}
      >
        <View style={{ flex: 1 }}>
          {filteredMovies.length > 0 && !screenLoading && (
            <FlatList
              data={filteredMovies}
              keyExtractor={(item) => item.file_id.toString()}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('MovieDetails', { file: item });
                  }}
                >
                  <MovieDetailsCard
                    movieDetails={JSON.parse(item.description)}
                    hasBottomLine={filteredMovies.length - 1 !== index}
                    bottomLineColor={theme.colors.lightGrey}
                    hasReleaseYear
                    uploadImageUrl={item.thumbnails.w160}
                  />
                </Pressable>
              )}
              contentContainerStyle={{ paddingVertical: theme.spacings.xs }}
            />
          )}
          {!screenLoading && filteredMovies.length === 0 && (
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                marginTop: theme.spacings.xxxl * 2,
              }}
            >
              <LottieView
                source={require('../assets/lottie/noFilter.json')}
                autoPlay
                loop
                style={{ height: 200, width: 100 }}
              />
              <Typography variant="h3" text="No movies found..." />
            </View>
          )}
          {screenLoading && (
            <LottieView
              source={require('../assets/lottie/homescreenLoading.json')}
              autoPlay
              loop
            />
          )}
        </View>
      </ContentLayout>
    </ScreenLayout>
  );
}

Filter.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
