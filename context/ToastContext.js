import React, { useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import Toast from '../components/Toast';

const ToastContext = React.createContext(undefined);

export function useToastHandler() {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error('Toast Provider is not in the render tree');
  }
  return value;
}

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

ToastProvider.propTypes = {
  children: PropTypes.node,
};
