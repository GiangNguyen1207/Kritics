import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import MovieCard from '../../components/MovieCard';
import PropTypes from 'prop-types';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import ScreenLayout from '../../components/ScreenLayout';
import ContentLayout from '../../components/ContentLayout';
import { mainTab } from '../../router/Maintab';
import { useFavourite } from '../../hooks/useFavourite';
import { theme } from '../../themes';
import { useMedia } from '../../hooks/useMedia';

const Favourite = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const { mediaArray } = useMedia();
  const { favouriteList } = useFavourite();
  const [refresh, setRefresh] = useState(false);
  const [renderedFavouriteList, setRenderedFavouriteList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      const favouriteFileIdList = favouriteList.map(
        (favourite) => favourite.file_id
      );
      const a = [];
      for (const media of mediaArray) {
        if (favouriteFileIdList.includes(media.file_id)) {
          console.log('here');
          a.push(media);
          setRenderedFavouriteList(a);
          setRefresh(!refresh);
        }
      }
    }
  }, [mediaArray, favouriteList, isFocused]);

  console.log('exxhere', renderedFavouriteList);

  return (
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout hasHeader headerTitle={mainTab.favourite}>
        <FlatList
          numColumns={3}
          extraData={refresh}
          data={renderedFavouriteList}
          keyExtractor={(item) => item.file_id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              rating={4}
              item={item}
              cardStyle={{ marginVertical: theme.spacings.xxs }}
              navigation={navigation}
              showTagIcon={false}
            />
          )}
        />
      </ContentLayout>
    </ScreenLayout>
  );
};

export default Favourite;
