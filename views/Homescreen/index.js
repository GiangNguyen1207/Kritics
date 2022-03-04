import React, { useCallback, useState } from 'react';
import { StyleSheet, Animated, Image, Pressable } from 'react-native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import ScreenLayout from '../../components/ScreenLayout';
import MovieCard from '../../components/MovieCard';
import { useMedia } from '../../hooks/useMedia';
import { theme } from '../../themes';
import { useFavourite } from '../../hooks/useFavourite';
import { useCommentRating } from '../../hooks/useCommentRating';
import ModalFilter from './ModalFilter';

const Home = ({ navigation }) => {
  const { sortedMediaByDate } = useMedia();
  const { getRating, getAverageRating } = useCommentRating();
  const isFocused = useIsFocused();
  const [renderedMediaArray, setRenderedMediaArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { addToFavourite, favouriteList, deleteFavourite } =
    useFavourite(isFocused);

  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop } =
    useCollapsibleHeader({
      navigationOptions: {
        headerStyle: {
          height: 250,
        },
        headerShown: true,
        headerBackground: (
          <Image
            source={require('../../assets/ironman.jpeg')}
            style={styles.overlay}
          />
        ),
        headerTitle: '',
        headerLeft: () => (
          <Pressable
            style={styles.search}
            navigation={navigation}
            onPress={() => {
              navigation.navigate('Search');
            }}
          >
            <Icon name="search" color={theme.colors.white} size={20} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.filter}
          >
            <Icon name="filter" color={theme.colors.white} size={20} />
          </Pressable>
        ),
      },
      config: { collapsedColor: theme.colors.appBackground },
    });

  const handleFavourite = (fileId, isFavourite) => {
    if (isFavourite) deleteFavourite(fileId);
    else addToFavourite(fileId);
  };

  useFocusEffect(
    useCallback(() => {
      const getFavouriteAndRating = async () => {
        if (sortedMediaByDate && favouriteList) {
          const favouriteFileIdList = favouriteList.map(
            (favourite) => favourite.file_id
          );
          for (const media of sortedMediaByDate) {
            const ratings = await getRating(media.file_id);
            const averageRating = getAverageRating(ratings);
            Object.assign(media, { averageRating });
            if (favouriteFileIdList.includes(media.file_id)) {
              Object.assign(media, { isFavourite: true });
            } else {
              delete media.isFavourite;
            }
          }
          setRenderedMediaArray(sortedMediaByDate);
          setRefresh(!refresh);
        }
      };

      getFavouriteAndRating();
    }, [sortedMediaByDate, favouriteList])
  );

  return (
    <ScreenLayout>
      <Animated.View style={styles.list}>
        <Animated.FlatList
          numColumns={3}
          data={renderedMediaArray}
          onScroll={onScroll}
          contentContainerStyle={{
            paddingTop: renderedMediaArray.length > 3 ? containerPaddingTop : 0,
          }}
          scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
          keyExtractor={(item) => item.file_id.toString()}
          extraData={refresh}
          renderItem={({ item }) => (
            <MovieCard
              showTagIcon
              item={item}
              handleFavouritePress={handleFavourite}
              cardStyle={{ marginVertical: theme.spacings.xxs }}
              navigation={navigation}
            />
          )}
        />
      </Animated.View>
      <ModalFilter
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ScreenLayout>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  list: {
    marginBottom: theme.spacings.l,
  },
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
