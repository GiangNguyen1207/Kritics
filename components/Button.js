import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native';

import Typography from './Typography';
import { theme } from '../themes';

const Button = ({
  title,
  variant,
  onPress,
  buttonStyle,
  isDisabled,
  rightIcon,
}) => {
  const getButtonStyle = (variant) => {
    let style = {
      backgroundColor: 'transparent',
      borderColor: theme.colors.white,
    };
    switch (variant) {
      case 'primary':
        style = {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        };
        break;
      case 'secondary':
        style = {
          borderColor: theme.colors.primary,
        };
        break;
      case 'disabled':
        style = {
          backgroundColor: theme.colors.lightGrey,
          borderColor: theme.colors.lightGrey,
        };
        break;
      default:
        return style;
    }
    return style;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(variant), buttonStyle]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Typography
        variant="h3"
        text={title}
        fontWeight="600"
        color={
          variant === 'secondary' ? theme.colors.primary : theme.colors.white
        }
      />
      {rightIcon && rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    padding: theme.spacings.xxs,
    borderRadius: theme.spacings.xxxl,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  buttonStyle: ViewPropTypes.style,
  isDisabled: PropTypes.bool,
  rightIcon: PropTypes.node,
};

export default Button;
