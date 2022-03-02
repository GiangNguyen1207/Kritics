import React, { useContext, useState, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import Typography from '../components/Typography';
import { theme } from '../themes';

const ToastContext = React.createContext(undefined);

export function useToastHandler() {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error('Toast Provider is not in the render tree');
  }
  return value;
}

const Toast = ({ visible, message, type }) => {
  const { top } = useSafeAreaInsets();

  const getBackgroundColor = () => {
    let color = theme.colors.black;
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
        color = theme.colors.black;
    }
    return color;
  };

  return (
    <View
      pointerEvents="none"
      style={[styles.container, { top: top + theme.spacings.xxxl }]}
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

export default function ToastProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    let timeout;
    if (visible) {
      timeout = setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [visible]);

  const contextValue = useMemo(() => {
    return {
      show: (newMessage, type) => {
        setVisible(true);
        setMessage(newMessage);
        setType(type);
      },
    };
  }, []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast visible={visible} message={message} type={type} />
    </ToastContext.Provider>
  );
}

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
    elevation: 5,
  },
});

Toast.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
};

ToastProvider.propTypes = {
  children: PropTypes.node,
};
