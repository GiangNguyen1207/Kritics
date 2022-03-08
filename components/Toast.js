import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import Typography from '../components/Typography';
import { theme } from '../themes';

const Toast = ({ visible, message, type }) => {
  const { top } = useSafeAreaInsets();

  const getBackgroundColor = () => {
    let color = theme.colors.appBackground;
    switch (type) {
      case 'error':
        color = theme.colors.error;
        break;
      case 'success':
        color = theme.colors.success;
        break;
      case 'warning':
        color = theme.colors.warning;
        break;
      default:
        color = theme.colors.appBackground;
    }
    return color;
  };

  return (
    <View
      pointerEvents="none"
      style={[styles.container, { top: top + theme.spacings.xs }]}
    >
      <Animatable.View
        useNativeDriver
        duration={500}
        animation={visible ? 'fadeIn' : 'fadeOut'}
        style={[styles.text, { backgroundColor: getBackgroundColor() }]}
      >
        <Typography text={message} variant="h5" fontWeight="500"></Typography>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    height: theme.spacings.xxxl,
    borderRadius: theme.spacings.s,
    paddingHorizontal: theme.spacings.s,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});

Toast.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Toast;
