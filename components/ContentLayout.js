import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, View, StyleSheet } from 'react-native';

import Typography from './Typography';
import BackButton from './BackButton';

const ContentLayout = ({
  children,
  hasHeader,
  headerTitle,
  onPressBack,
  style,
}) => {
  return (
    <View style={[styles.contentLayout, style]}>
      <View>
        {hasHeader && (
          <View style={styles.row}>
            <View style={styles.flex}>
              {onPressBack && <BackButton onPressBack={onPressBack} />}
            </View>
            <Typography variant="h2" text={headerTitle} style={styles.text} />
            <View style={styles.flex} />
          </View>
        )}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  contentLayout: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  text: {
    flex: 2,
    alignItems: 'center',
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
