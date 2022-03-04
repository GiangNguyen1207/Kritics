import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import { theme } from '../themes';
import ContentLayout from '../components/ContentLayout';
import ScreenLayout from '../components/ScreenLayout';
import MovieDetailsCard from '../components/MovieDetailsCard';
import { useMedia } from '../hooks/useMedia';
import Typography from '../components/Typography';

export default function Filter({ route, navigation }) {
  const { top, bottom } = useSafeAreaInsets();
  const { selectedGenres } = route.params;
  const { mediaArray } = useMedia();
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const movies = [];
    for (const media of mediaArray) {
      const description = JSON.parse(media.description);
      const genres = description.genres.map((genre) => genre.name);
      const intersection = genres.filter((genre) =>
        selectedGenres.includes(genre)
      );
      if (intersection.length > 0) {
        movies.push(media);
        setFilteredMovies(movies);
      }
    }
  }, [mediaArray, selectedGenres]);

  return (
    <ScreenLayout style={{ paddingTop: top, paddingBottom: bottom }}>
      <ContentLayout
        hasHeader
        headerTitle={`Filter by ${selectedGenres.join(', ')}`}
        onPressBack={() => navigation.goBack()}
        style={{ paddingHorizontal: theme.spacings.s }}
      >
        {filteredMovies.length > 0 ? (
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
                />
              </Pressable>
            )}
            contentContainerStyle={{ marginTop: theme.spacings.xs }}
          />
        ) : (
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
      </ContentLayout>
    </ScreenLayout>
  );
}

Filter.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
