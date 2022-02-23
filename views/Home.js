import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, Image } from 'react-native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';

import ScreenLayout from '../components/ScreenLayout';
import { useMedia } from '../hooks/useMedia';
import MovieCard from '../components/MovieCard';
import { theme } from '../themes';
import { useFavourite } from '../hooks/useFavourite';

const Home = () => {
  const { mediaArray } = useMedia();
  const [renderedMediaArray, setRenderedMediaArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { addToFavourite, favouriteList, deleteFavourite } = useFavourite();

  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop } =
    useCollapsibleHeader({
      navigationOptions: {
        headerStyle: {
          height: 250,
        },
        headerShown: true,
        headerBackground: (
          <Image
            source={require('../assets/ironman.jpeg')}
            style={styles.overlay}
          />
        ),
        headerTitle: '',
        headerLeft: () => (
          <Icon
            name="search"
            color={theme.colors.white}
            size={20}
            style={styles.search}
          />
        ),
        headerRight: () => (
          <Icon
            name="filter"
            color={theme.colors.white}
            size={20}
            style={styles.filter}
          />
        ),
      },
      config: { collapsedColor: theme.colors.appBackground },
    });

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
    <ScreenLayout>
      <Animated.View style={styles.list}>
        <Animated.FlatList
          numColumns={3}
          data={renderedMediaArray}
          onScroll={onScroll}
          contentContainerStyle={{ paddingTop: containerPaddingTop }}
          scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
          keyExtractor={(item) => item.file_id.toString()}
          extraData={refresh}
          renderItem={({ item }) => (
            <MovieCard
              showTagIcon
              rating={4}
              item={item}
              handleFavouritePress={handleFavourite}
              cardStyle={{ marginVertical: theme.spacings.xxs }}
            />
          )}
        />
      </Animated.View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: theme.spacings.l,
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    opacity: 0.7,
    backgroundColor: 'black',
    height: 250,
  },
  search: {
    position: 'absolute',
    top: theme.spacings.xxs,
    left: theme.spacings.l,
  },
  filter: {
    position: 'absolute',
    top: theme.spacings.xxs,
    right: theme.spacings.l,
  },
});
export default Home;
