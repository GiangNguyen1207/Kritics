import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { theme } from '../themes';

const BackButton = ({ onPressBack }) => {
  return (
    <Pressable onPress={onPressBack}>
      <Icon name="arrow-back-ios" color={theme.colors.white} size={18} />
    </Pressable>
  );
};

BackButton.propTypes = {
  onPressBack: PropTypes.func,
};

export default BackButton;
