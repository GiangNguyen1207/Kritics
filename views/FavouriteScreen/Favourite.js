import React, { useEffect, useState } from 'react';
import { FlatList, View, Animated, Image, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import MovieCard from '../../components/MovieCard';
import { theme } from '../../themes';
import { useCommentRating } from '../../hooks/useCommentRating';
import { useMedia } from '../../hooks/useMedia';
import { useFavourite } from '../../hooks/useFavourite';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import ScreenLayout from '../../components/ScreenLayout';

const Favourite = ({ navigation }) => {
  const { getRating, getAverageRating } = useCommentRating();
  const isFocused = useIsFocused();
  const { favouriteList } = useFavourite(isFocused);
  const { mediaArray } = useMedia(isFocused);
  const [refresh, setRefresh] = useState(false);
  const [renderedFavouriteList, setRenderedFavouriteList] = useState([]);
  const [screenLoading, setScreenLoading] = useState(false);
  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop } =
    useCollapsibleHeader({
      navigationOptions: {
        headerStyle: {
          height: 250,
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerShown: true,
        headerBackground: (
          <Image
            source={require('../../assets/batman.jpeg')}
            style={styles.overlay}
          />
        ),
        headerTitle: 'Favourites',
      },
      config: { collapsedColor: theme.colors.appBackground },
    });

  useEffect(() => {
    async function getFavouriteAndRating() {
      setScreenLoading(true);
      if (mediaArray && favouriteList) {
        const favouriteFileIdList = favouriteList.map(
          (favourite) => favourite.file_id
        );
        for (const media of mediaArray) {
          const ratings = await getRating(media.file_id);
          const averageRating = getAverageRating(ratings);
          Object.assign(media, { averageRating });
          if (favouriteFileIdList.includes(media.file_id)) {
            Object.assign(media, { isFavourite: true });
          } else {
            delete media.isFavourite;
          }
        }
        const filteredFavouriteMovies = mediaArray.filter(
          (movie) => movie.isFavourite
        );
        console.log(filteredFavouriteMovies);
        setRenderedFavouriteList(filteredFavouriteMovies);
        setRefresh(!refresh);
        setScreenLoading(false);
      }
    }

    getFavouriteAndRating();
  }, [mediaArray, favouriteList]);

  console.log();
  return (
    <ScreenLayout>
      {screenLoading ? (
        <LottieView
          source={require('../../assets/lottie/loading.json')}
          autoPlay
          loop
        />
      ) : (
        <View>
          <Animated.FlatList
            numColumns={3}
            onScroll={onScroll}
            extraData={refresh}
            data={renderedFavouriteList}
            contentContainerStyle={{
              paddingTop: favouriteList.length > 3 ? containerPaddingTop : 0,
            }}
            scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
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
        </View>
      )}
    </ScreenLayout>
  );
};

Favourite.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    opacity: 0.7,
    backgroundColor: theme.colors.black,
    height: 250,
  },
});

export default Favourite;
