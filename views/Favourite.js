import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import MovieCard from '../components/MovieCard';
import PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';

import ScreenLayout from '../components/ScreenLayout';
import ContentLayout from '../components/ContentLayout';
import { mainTab } from '../router/Maintab';
import { useFavourite } from '../hooks/useFavourite';
import { theme } from '../themes';
import { useMedia } from '../hooks/useMedia';
import { useCommentRating } from '../hooks/useCommentRating';

const Favourite = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const { mediaArray } = useMedia();
  const { getRating, getAverageRating } = useCommentRating();
  const { favouriteList } = useFavourite(isFocused);
  const [refresh, setRefresh] = useState(false);
  const [renderedFavouriteList, setRenderedFavouriteList] = useState([]);

  useEffect(() => {
    async function getFavouriteAndRating() {
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
        setRenderedFavouriteList(filteredFavouriteMovies);
        setRefresh(!refresh);
      }
    }

    getFavouriteAndRating();
  }, [mediaArray, favouriteList, isFocused]);

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

Favourite.propTypes = {
  navigation: PropTypes.object,
};

export default Favourite;
