import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { theme } from '../themes';
import { auth } from '../utils/auth';

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <SearchBar
        searchTerm={search}
        onSearchTermChange={(newSearch) => setSearch(newSearch)}
        onSearchSubmit={() => console.log('search was submitted')}
      />
      <View>
        <Text>{search}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBackground,
    marginTop: 0,
  },
});
export default Search;
