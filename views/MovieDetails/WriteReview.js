import React, {
  useMemo,
  forwardRef,
  useState,
  useContext,
  useEffect,
} from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import {
  BottomSheetTextInput,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import { PacmanIndicator } from 'react-native-indicators';

import { theme } from '../../themes';
import Typography from '../../components/Typography';
import StarRating from 'react-native-star-rating';
import Button from '../../components/Button';
import { useCommentRating } from '../../hooks/useCommentRating';
import { MainContext } from '../../context/MainContext';

const WriteReview = forwardRef(({ file, refresh, setRefresh }, ref) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isRated, setIsRated] = useState(false);
  const { postRating, postComment, getRating } = useCommentRating();
  const [postLoading, setPostLoading] = useState(false);
  const { user } = useContext(MainContext);
  const { dismiss } = useBottomSheetModal();
  const snapPoints = useMemo(() => [350, '90%'], []);

  const backdrop = () => {
    return <Pressable style={styles.backdrop} onPress={() => dismiss()} />;
  };

  const handleSubmit = async () => {
    setPostLoading(true);
    if (!isRated) {
      await postRating(file.file_id, rating);
    }
    await postComment(file.file_id, review);
    setRefresh(!refresh);
    dismiss();
    setRating(0);
    setReview('');
    setPostLoading(false);
  };

  useEffect(() => {
    const getAllRatings = async () => {
      const ratings = await getRating(file.file_id);
      const userIdList = ratings.map((rate) => rate.user_id);
      if (userIdList.includes(user.user_id)) setIsRated(true);
    };

    getAllRatings();
  }, [refresh]);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      keyboardBehavior="extend"
      android_keyboardInputMode="adjustResize"
      handleIndicatorStyle={styles.indicator}
      backdropComponent={backdrop}
    >
      <View style={styles.container}>
        <Typography
          text="Write a quick review"
          variant="h3"
          color={theme.colors.primary}
          fontWeight="bold"
        />
        {!isRated && (
          <View style={styles.row}>
            <Typography
              text="Rating for movie"
              variant="h4"
              color={theme.colors.black}
              textStyle={{ flex: 1 }}
            />
            <StarRating
              rating={rating}
              selectedStar={setRating}
              maxStars={5}
              starSize={35}
              emptyStarColor={theme.colors.black}
              fullStarColor={theme.colors.black}
            />
          </View>
        )}
        <BottomSheetTextInput
          placeholder="Review this movie"
          multiline
          value={review}
          onChangeText={setReview}
          autoCapitalize="none"
          style={styles.input}
        />
        <View style={styles.row}>
          <Button
            variant="secondary"
            title="Cancel"
            onPress={() => dismiss()}
            buttonStyle={[styles.button, { marginRight: theme.spacings.xxxs }]}
          />
          <Button
            variant="primary"
            title="Submit"
            onPress={() => handleSubmit()}
            buttonStyle={styles.button}
            rightIcon={
              postLoading && (
                <PacmanIndicator
                  color={theme.colors.white}
                  size={25}
                  style={{ flex: 0.5 }}
                />
              )
            }
          />
        </View>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacings.s,
    paddingVertical: theme.spacings.xxs,
  },
  row: {
    marginTop: theme.spacings.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: theme.spacings.xxxs,
    backgroundColor: 'transparent',
    paddingHorizontal: theme.spacings.xs,
    paddingTop: theme.spacings.xs,
    marginTop: theme.spacings.xs,
  },
  button: {
    marginTop: theme.spacings.xs,
    flex: 1,
  },
  indicator: {
    width: theme.spacings.xxxl * 2,
    backgroundColor: theme.colors.lightGrey,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.black,
    opacity: 0.6,
  },
});

WriteReview.propTypes = {
  file: PropTypes.object,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
};

WriteReview.displayName = 'Write Review';
export default WriteReview;
