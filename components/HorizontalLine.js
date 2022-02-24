import React from 'react';
import { View } from 'react-native';

import { theme } from '../themes';

const HorizontalLine = () => {
  return (
    <View
      style={{
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 1,
        marginTop: theme.spacings.s,
      }}
    />
  );
};

export default HorizontalLine;
