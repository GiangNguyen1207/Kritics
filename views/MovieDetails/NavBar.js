import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import Typography from '../../components/Typography';
import { theme } from '../../themes';

export const MovieDetailsNavBar = {
  Reviews: 0,
  Synopsis: 1,
};

const NavBar = ({ selected, setSelected }) => {
  return (
    <View style={styles.bar}>
      <Pressable
        onPress={() => setSelected(MovieDetailsNavBar.Reviews)}
        style={[
          styles.borderBottom,
          selected === MovieDetailsNavBar.Reviews ? styles.selected : null,
        ]}
      >
        <Typography
          text="Reviews"
          variant="h3"
          color={
            selected === MovieDetailsNavBar.Reviews
              ? theme.colors.primary
              : theme.colors.white
          }
          fontWeight="600"
        />
      </Pressable>
      <Pressable
        onPress={() => setSelected(MovieDetailsNavBar.Synopsis)}
        style={[
          styles.borderBottom,
          selected === MovieDetailsNavBar.Synopsis ? styles.selected : null,
        ]}
      >
        <Typography
          text="Synopsis"
          variant="h3"
          color={
            selected === MovieDetailsNavBar.Synopsis
              ? theme.colors.primary
              : null
          }
          fontWeight="600"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    marginVertical: theme.spacings.xs,
    backgroundColor: theme.colors.darkGrey,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  borderBottom: {
    paddingVertical: theme.spacings.xxs,
  },
  selected: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
});

NavBar.propTypes = {
  selected: PropTypes.number,
  setSelected: PropTypes.func,
};

export default NavBar;
