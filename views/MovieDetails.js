import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenLayout from '../components/ScreenLayout';
import CommentCard from '../components/CommentCard';
import ReviewCard from '../components/ReviewCard';
import { uploadsUrl } from '../utils/variables';
import { theme } from '../themes';
import { useComment } from '../hooks/useComment';
import ContentLayout from '../components/ContentLayout';

const MovieDetails = ({ navigation, route }) => {
  const { top } = useSafeAreaInsets();
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
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout
        hasHeader
        headerTitle="Movie Details"
        onPressBack={() => navigation.goBack()}
        style={styles.container}
      >
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
      </ContentLayout>
    </ScreenLayout>
  );
};
MovieDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacings.s,
  },
});

export default MovieDetails;
