import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenLayout from '../components/ScreenLayout';
import ContentLayout from '../components/ContentLayout';
import { mainTab } from '../router/Maintab';

const Favourtie = () => {
  const { top } = useSafeAreaInsets();

  return (
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout
        hasHeader
        headerTitle={mainTab.favourite}
        onPressBack={() => {}}
      ></ContentLayout>
    </ScreenLayout>
  );
};

export default Favourtie;
