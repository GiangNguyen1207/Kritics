import { StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import { useMedia } from '../hooks/useMedia';
import PropTypes from 'prop-types';
import MovieDetailsCard from '../components/MovieDetailsCard';
import ScreenLayout from '../components/ScreenLayout';
import ContentLayout from '../components/ContentLayout';
import { theme } from '../themes';

const Search = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { searchMedia, searchResults } = useMedia();

  // const searchApi = async (search) => {
  //   try {
  //     const results = await getMediaSearch(search);
  //     console.log('results', results);
  //     setResults(results);
  //     console.log('results', results);
  //   } catch (error) {
  //     setErrorMessage('Something went wrong!');
  //   }
  // };

  return (
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout
        hasHeader
        headerTitle="Search"
        onPressBack={() => navigation.goBack()}
        style={{ paddingHorizontal: theme.spacings.s }}
      >
        <SearchBar
          searchTerm={search}
          onSearchTermChange={setSearch}
          onSearchSubmit={() => searchMedia(search)}
        />

        {/* {errorMessage ? <Text>{errorMessage}</Text> : null} */}

        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.file_id.toString()}
          renderItem={({ item }) => {
            const details = JSON.parse(item.description);
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('MovieDetails', { file: item });
                }}
              >
                <MovieDetailsCard
                  movieDetails={details.movieDetails}
                  hasBottomLine
                  bottomLineColor={theme.colors.primary}
                  hasReleaseYear
                />
              </Pressable>
            );
          }}
        />
      </ContentLayout>
    </ScreenLayout>
  );
};

Search.propTypes = {
  navigation: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({});
export default Search;
