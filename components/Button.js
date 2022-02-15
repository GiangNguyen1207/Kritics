import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native';
import Typography from './Typography';
import { theme } from '../themes';

const Button = ({ title, variant, onPress, buttonStyle, isDisable }) => {
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
      disabled={isDisable}
    >
      <Typography
        variant="h3"
        text={title}
        fontWeight="600"
        color={
          variant === 'secondary' ? theme.colors.primary : theme.colors.white
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    padding: theme.spacings.xxs,
    borderRadius: theme.spacings.xxxl,
    alignItems: 'center',
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  buttonStyle: ViewPropTypes.style,
  isDisable: PropTypes.bool,
};

export default Button;
