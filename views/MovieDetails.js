import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import CommentCard from '../components/CommentCard';
import ReviewCard from '../components/ReviewCard';
import { uploadsUrl } from '../utils/variables';
import { theme } from '../themes';
import { useComment } from '../hooks/useComment';

const MovieDetails = ({ navigation, route }) => {
  const { file } = route.params;
  const { getComments, deleteComment } = useComment();
  const [renderedCommentList, setRenderedCommentList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    setRefresh(!refresh);
  };

  const fetchComments = async () => {
    try {
      const commentsData = await getComments(file.file_id);
      setRenderedCommentList(commentsData);
    } catch (error) {
      console.error('fetchComments() error', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: uploadsUrl + file.thumbnails.w160 }}
        style={{ width: 100, height: '30%' }}
        resizeMode="contain"
      />
      <ReviewCard route={route} />

      <View>
        <FlatList
          data={renderedCommentList}
          keyExtractor={(item) => item.comment_id}
          extraData={refresh}
          renderItem={({ item }) => (
            <CommentCard
              item={item}
              route={route}
              handleDeleteComment={handleDeleteComment}
            />
          )}
        />
      </View>
    </View>
  );
};
MovieDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBackground,
    marginTop: 20,
  },
});

export default MovieDetails;
