import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenLayout from '../components/ScreenLayout';
import ContentLayout from '../components/ContentLayout';
import { mainTab } from '../router/Maintab';
import { useMedia } from '../hooks/useMedia';
import MovieCard from '../components/MovieCard';
import { theme } from '../themes';
import { useFavourite } from '../hooks/useFavourite';
import PropTypes from 'prop-types';

const Home = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const mediaArray = useMedia();
  const [renderedMediaArray, setRenderedMediaArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { addToFavourite, favouriteList, deleteFavourite } = useFavourite();

  const handleFavourite = (fileId, isFavourite) => {
    if (isFavourite) deleteFavourite(fileId);
    else addToFavourite(fileId);
  };

  useEffect(() => {
    if (mediaArray && favouriteList) {
      const favouriteFileIdList = favouriteList.map(
        (favourite) => favourite.file_id
      );
      for (const media of mediaArray) {
        if (favouriteFileIdList.includes(media.file_id)) {
          Object.assign(media, { isFavourite: true });
        } else {
          delete media.isFavourite;
        }
      }
      setRenderedMediaArray(mediaArray);
      setRefresh(!refresh);
    }
  }, [mediaArray, favouriteList]);

  return (
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout hasHeader headerTitle={mainTab.home} />
      <View style={styles.list}>
        <FlatList
          numColumns={3}
          data={renderedMediaArray}
          keyExtractor={(item) => item.file_id.toString()}
          extraData={refresh}
          renderItem={({ item }) => (
            <MovieCard
              showTagIcon
              rating={4}
              item={item}
              handleFavouritePress={handleFavourite}
              cardStyle={{ marginVertical: theme.spacings.xxs }}
              navigation={navigation}
            />
          )}
        />
      </View>
    </ScreenLayout>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  list: {
    marginBottom: theme.spacings.l,
    marginTop: theme.spacings.xs,
    alignItems: 'center',
  },
});
export default Home;
