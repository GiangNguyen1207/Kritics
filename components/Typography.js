import React from 'react';
import PropTypes from 'prop-types';
import { Text, ViewPropTypes } from 'react-native';

import { theme } from '../themes';

const Typography = ({ variant, color, fontWeight, text, textStyle }) => {
  const getTextFontSize = (variant) => {
    let fontSize = 12;
    switch (variant) {
      case 'h1':
        fontSize = 48;
        break;
      case 'h2':
        fontSize = 24;
        break;
      case 'h3':
        fontSize = 18;
        break;
      case 'h4':
        fontSize = 16;
        break;
      case 'h5':
        fontSize = 14;
        break;
      default:
        return;
    }
    return fontSize;
  };

  return (
    <Text
      style={[
        {
          fontFamily: 'Avenir',
          fontSize: getTextFontSize(variant),
          color: color ?? theme.colors.white,
          fontWeight: fontWeight ?? '400',
        },
        textStyle,
      ]}
    >
      {text}
    </Text>
  );
};

Typography.propTypes = {
  variant: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  textStyle: ViewPropTypes.style,
};

export default Typography;
