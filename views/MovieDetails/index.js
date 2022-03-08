import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, FlatList, Pressable, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import ScreenLayout from '../../components/ScreenLayout';
import { theme } from '../../themes';
import { useCommentRating } from '../../hooks/useCommentRating';
import NavBar from './NavBar';
import MovieDetailsCard from '../../components/MovieDetailsCard';
import { MovieDetailsNavBar } from './NavBar';
import Synopsis from './Synopsis';
import CommentCard from '../../components/CommentCard';
import { useFavourite } from '../../hooks/useFavourite';
import Typography from '../../components/Typography';
import WriteReview from './WriteReview';
import MovieDetailsHeader from './MovieDetailsHeader';
import { View } from 'react-native-animatable';

const MovieDetails = ({ navigation, route }) => {
  const { file } = route.params;
  const fileDetails = JSON.parse(file.description);
  const { getComments, deleteComment, comments, ratingAverage } =
    useCommentRating();
  const { addToFavourite, deleteFavourite, favouriteList } = useFavourite();
  const bottomSheetModalRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isFavourite, setIsFavourte] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(true);

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    setRefresh(!refresh);
  };

  useEffect(() => {
    async function getAllComments() {
      await getComments(file.file_id);
      setDetailsLoading(false);
    }
    getAllComments();
  }, [refresh]);

  useEffect(() => {
    const favouriteIdList = favouriteList.map((favourite) => favourite.file_id);
    if (favouriteIdList.includes(file.file_id)) setIsFavourte(true);
    else setIsFavourte(false);
  }, [favouriteList]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      {detailsLoading ? (
        <View style={{ flex: 1, backgroundColor: theme.colors.appBackground }}>
          <LottieView
            source={require('../../assets/lottie/loading.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <>
          <ImageBackground
            source={{
              uri:
                'https://image.tmdb.org/t/p/w500' + fileDetails.backdrop_path,
            }}
            resizeMode="cover"
            style={{ flex: 0.5 }}
          >
            <MovieDetailsHeader navigation={navigation} />
            <View style={styles.overlay} />
            <MovieDetailsCard
              movieDetails={fileDetails}
              hasDetails
              averageRating={ratingAverage}
              style={styles.container}
              uploadImageUrl={file.thumbnails.w160}
              addToFavourite={() => addToFavourite(file.file_id)}
              deleteFavourite={() => deleteFavourite(file.file_id)}
              isFavourite={isFavourite}
            />
          </ImageBackground>
          <ScreenLayout style={{ flex: 1 }}>
            <NavBar selected={selected} setSelected={setSelected} />
            {selected === MovieDetailsNavBar.Reviews ? (
              <FlatList
                data={comments}
                keyExtractor={(item) => item.comment_id}
                extraData={refresh}
                renderItem={({ item, index }) => (
                  <CommentCard
                    item={item}
                    route={route}
                    handleDeleteComment={handleDeleteComment}
                    hasBottomLine={index !== comments.length - 1}
                  />
                )}
                contentContainerStyle={styles.list}
              />
            ) : (
              <Synopsis movieDetails={fileDetails} />
            )}
            <Pressable style={styles.box} onPress={handlePresentModalPress}>
              <Typography
                text="Write a quick review"
                variant="h3"
                color={theme.colors.primary}
                fontWeight="500"
              />
            </Pressable>
          </ScreenLayout>
        </>
      )}
      <WriteReview
        ref={bottomSheetModalRef}
        file={file}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
};

MovieDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacings.s,
    marginTop: theme.spacings.xs,
    elevation: 5,
  },
  list: {
    paddingVertical: theme.spacings.xs,
  },
  box: {
    height: 60,
    backgroundColor: theme.colors.darkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: theme.colors.black,
    opacity: 0.8,
    elevation: 1,
  },
});

export default MovieDetails;
