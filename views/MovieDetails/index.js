import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import ScreenLayout from '../../components/ScreenLayout';
import { theme } from '../../themes';
import { useCommentRating } from '../../hooks/useCommentRating';
import ContentLayout from '../../components/ContentLayout';
import NavBar from './NavBar';
import MovieDetailsCard from '../../components/MovieDetailsCard';
import { MovieDetailsNavBar } from './NavBar';
import Synopsis from './Synopsis';
import CommentCard from '../../components/CommentCard';
import { useFavourite } from '../../hooks/useFavourite';

const MovieDetails = ({ navigation, route }) => {
  const { top, bottom } = useSafeAreaInsets();
  const { file } = route.params;
  const fileDetails = JSON.parse(file.description);
  const { getComments, deleteComment, loading, comments, ratingAverage } =
    useCommentRating();
  const { addToFavourite, deleteFavourite, favouriteList } = useFavourite();
  const [selected, setSelected] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isFavourite, setIsFavourte] = useState(false);

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    setRefresh(!refresh);
  };

  useEffect(() => {
    getComments(file.file_id);
  }, []);

  useEffect(() => {
    const favouriteIdList = favouriteList.map((favourite) => favourite.file_id);
    if (favouriteIdList.includes(file.file_id)) setIsFavourte(true);
    else setIsFavourte(false);
  }, [favouriteList]);

  return (
    <ScreenLayout style={{ paddingTop: top, paddingBottom: bottom }}>
      <ContentLayout
        hasHeader
        headerTitle="Details"
        onPressBack={() => navigation.goBack()}
        headerStyle={styles.headerStyle}
      >
        {loading ? (
          <LottieView
            source={require('../../assets/lottie/loading.json')}
            autoPlay
            loop
          />
        ) : (
          <>
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
              />
            ) : (
              <Synopsis movieDetails={fileDetails} />
            )}
          </>
        )}
      </ContentLayout>
    </ScreenLayout>
  );
};
MovieDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: theme.spacings.s,
  },
  container: {
    marginHorizontal: theme.spacings.s,
    marginTop: theme.spacings.m,
  },
});

export default MovieDetails;