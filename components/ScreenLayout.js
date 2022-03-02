import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  ViewPropTypes,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';

import { theme } from '../themes';

const selectLayout = (type) =>
  ({
    view: View,
    keyboardAvoiding: KeyboardAvoidingView,
    scroll: KeyboardAwareScrollView,
    safeArea: SafeAreaView,
  }[type]);

const ScreenLayout = ({ type = 'view', children, style, ...rest }) => {
  const ViewLayout = selectLayout(type);

  if (type === 'scroll') {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          enableAutomaticScroll
          extraHeight={100}
          keyboardShouldPersistTaps="handled"
          resetScrollToCoords={{ x: 0, y: 0 }}
          enableResetScrollToCoords
          contentContainerStyle={[styles.scrolLayout, style]}
          {...rest}
        >
          {children}
        </KeyboardAwareScrollView>
      </View>
    );
  }

  return (
    <ViewLayout {...rest} style={[styles.viewLayout, style]}>
      {children}
    </ViewLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.appBackground,
  },
  viewLayout: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.appBackground,
  },
  scrolLayout: {
    justifyContent: 'center',
    backgroundColor: theme.colors.appBackground,
  },
});

ScreenLayout.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

export default ScreenLayout;
