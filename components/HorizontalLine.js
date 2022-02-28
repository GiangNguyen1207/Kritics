import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { theme } from '../themes';

const HorizontalLine = ({ color }) => {
  return (
    <View
      style={{
        borderBottomColor: color,
        borderBottomWidth: 1,
        marginVertical: theme.spacings.s,
      }}
    />
  );
};

HorizontalLine.propTypes = {
  color: PropTypes.string,
};

export default HorizontalLine;
