import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mainTab } from '../router/Maintab';
import { theme } from '../themes';
import Typography from './Typography';

const BottomNavBar = ({ state, navigation }) => {
  const mainTabNames = Object.values(mainTab);
  const { bottom } = useSafeAreaInsets();

  const setIcons = (route) => {
    let iconName;
    switch (route) {
      case mainTab.home:
        iconName = 'home';
        break;
      case mainTab.post:
        iconName = 'pencil-alt';
        break;
      case mainTab.favourite:
        iconName = 'tag';
        break;
      case mainTab.profile:
        iconName = 'user-alt';
        break;
      default:
        return;
    }
    return iconName;
  };

  return (
    <View style={[styles.navBar, { paddingBottom: bottom }]}>
      {mainTabNames.map((mainTabName, index) => {
        const isFocused = state.index === index;
        return (
          <Pressable
            key={mainTabName}
            style={styles.button}
            onPress={() => navigation.navigate(mainTabName)}
          >
            <Icon
              name={setIcons(mainTabName)}
              color={
                isFocused ? theme.colors.secondary : theme.colors.lightGrey
              }
              size={15}
              style={{ marginBottom: theme.spacings.Xs }}
            />
            <Typography
              variant="h6"
              text={mainTabName}
              color={
                isFocused ? theme.colors.secondary : theme.colors.lightGrey
              }
              fontWeight="400"
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.darkGrey,
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

BottomNavBar.propTypes = {
  state: PropTypes.object,
  navigation: PropTypes.object,
};

export default BottomNavBar;
