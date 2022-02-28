import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { theme } from '../themes';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ search, onSearchChange, onSearchSubmit }) => {
  return (
    <View style={styles.backgroundStyle}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search movie name"
        value={search}
        onChangeText={onSearchChange}
      />
      <Pressable
        style={styles.pressStyle}
        onPress={() => {
          onSearchSubmit();
        }}
      >
        <Icon
          name="search"
          color={theme.colors.white}
          size={24}
          style={styles.iconStyle}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: theme.colors.lightGrey,
    height: 40,
    borderRadius: 7,
    marginHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  pressStyle: {
    height: 40,
    width: 50,
    backgroundColor: theme.colors.primary,
    borderTopEndRadius: 7,
    borderBottomEndRadius: 7,
  },
  iconStyle: {
    alignSelf: 'center',
    margin: 5,
    borderRadius: 5,
  },
});

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
};

export default SearchBar;
