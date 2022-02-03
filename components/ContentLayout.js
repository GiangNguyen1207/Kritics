import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ViewPropTypes, View, Pressable, StyleSheet } from 'react-native';

import { theme } from '../themes';
import Typography from './Typography';

const ContentLayout = ({ children, hasHeader, headerTitle, onPressBack }) => {
  return (
    <View style={styles.contentLayout}>
      {hasHeader && (
        <View style={styles.row}>
          <Pressable style={{ flex: 1 }} onPress={onPressBack}>
            <Icon name="arrow-back-ios" color={theme.colors.white} size={18} />
          </Pressable>
          <View style={{ flex: 2, alignItems: 'center' }}>
            <Typography variant="h2" text={headerTitle} />
          </View>
          <View style={{ flex: 1 }} />
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentLayout: {
    flexGrow: 1,
  },
});

ContentLayout.propTypes = {
  children: PropTypes.node,
  hasHeader: PropTypes.bool.isRequired,
  headerTitle: PropTypes.string,
  onPressBack: PropTypes.func,
  style: ViewPropTypes.style,
};

export default ContentLayout;
