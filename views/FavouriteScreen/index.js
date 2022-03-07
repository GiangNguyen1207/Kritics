import React from 'react';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mainTab } from '../../router/Maintab';
import ScreenLayout from '../../components/ScreenLayout';
import ContentLayout from '../../components/ContentLayout';
import { useFavourite } from '../../hooks/useFavourite';
import NoFavourite from './NoFavourite';
import Favourite from './Favourite';

export default function FavouriteScreen({ navigation }) {
  const { top } = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const { favouriteList } = useFavourite(isFocused);

  return (
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout hasHeader headerTitle={mainTab.favourite}>
        {favouriteList.length > 0 ? (
          <Favourite navigation={navigation} />
        ) : (
          <NoFavourite />
        )}
      </ContentLayout>
    </ScreenLayout>
  );
}

FavouriteScreen.propTypes = {
  navigation: PropTypes.object,
};
