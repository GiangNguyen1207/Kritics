import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import MovieCard from '../../components/MovieCard';
import { theme } from '../../themes';
import { useCommentRating } from '../../hooks/useCommentRating';
import { useMedia } from '../../hooks/useMedia';
import { useFavourite } from '../../hooks/useFavourite';

const Favourite = ({ navigation }) => {
  const { getRating, getAverageRating } = useCommentRating();
  const isFocused = useIsFocused();
  const { favouriteList } = useFavourite(isFocused);
  const { mediaArray } = useMedia(isFocused);
  const [refresh, setRefresh] = useState(false);
  const [renderedFavouriteList, setRenderedFavouriteList] = useState([]);
  const [screenLoading, setScreenLoading] = useState(false);

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

  return (
    <View style={{ flex: 1 }}>
      {screenLoading ? (
        <LottieView
          source={require('../../assets/lottie/loading.json')}
          autoPlay
          loop
        />
      ) : (
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
      )}
    </View>
  );
};

Favourite.propTypes = {
  navigation: PropTypes.object,
};

export default Favourite;
