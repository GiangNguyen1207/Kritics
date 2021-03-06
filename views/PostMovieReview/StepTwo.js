import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import StarRating from 'react-native-star-rating';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import { PacmanIndicator } from 'react-native-indicators';
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';

import ScreenLayout from '../../components/ScreenLayout';
import ContentLayout from '../../components/ContentLayout';
import { theme } from '../../themes';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import { useMedia } from '../../hooks/useMedia';
import { mainTab } from '../../router/Maintab';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { useToastHandler } from '../../context/ToastContext';

export default function StepTwo({ navigation, route }) {
  const isFocused = useIsFocused();
  const { movieName } = route.params;
  const { top, bottom } = useSafeAreaInsets();
  const { postMedia, loading, mediaArray } = useMedia(isFocused);
  const { show } = useToastHandler();
  const { movieDetails } = useMovieDetails(movieName.split('_id:')[1]);

  const [rating, setRating] = useState(0);
  const [imageSelected, setImageSelected] = useState(false);
  const [type, setType] = useState('image');
  const [image, setImage] = useState(
    `https://dummyimage.com/${
      Dimensions.get('window').width
    }x400/4f4f4f/ffffff.png&text=Choose+file`
  );

  const pickImage = async () => {
    const { cancelled, uri, type } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      setImage(uri);
      setImageSelected(true);
      setType(type);
    }
  };

  const handleSubmit = async () => {
    const existingMovie = mediaArray.find((movie) => movie.title === movieName);
    if (!imageSelected) {
      show('Please select a file', 'warning');
      return;
    }

    if (rating === 0) {
      show('Please rate the movie', 'warning');
      return;
    }

    if (_.isEmpty(movieDetails)) {
      show(
        'Error loading movie from database. Please try again later',
        'error'
      );
      return;
    }

    if (existingMovie) {
      show(
        'This movie exists in the database. Please choose another one',
        'warning'
      );
      return;
    }

    const description = JSON.stringify(movieDetails);
    const isSuccessful = await postMedia(
      movieName,
      description,
      image,
      type,
      rating
    );

    if (isSuccessful) {
      show('Successfully uploading movie', 'success');
      navigation.reset({
        index: 0,
        routes: [{ name: mainTab.home }],
      });
    }
  };

  return (
    <ScreenLayout
      style={[{ paddingTop: top, paddingBottom: bottom, flex: 1 }]}
      type="scroll"
    >
      <ContentLayout
        hasHeader
        headerTitle={'Write a review'}
        style={{
          paddingHorizontal: theme.spacings.s,
          justifyContent: 'space-between',
        }}
        onPressBack={() => navigation.goBack()}
      >
        <View>
          <Typography variant="h4" text="Step 2" />
          <Progress.Bar
            progress={1}
            width={null}
            height={10}
            color={theme.colors.primary}
            borderColor={theme.colors.primary}
            style={styles.progressBar}
          />
        </View>
        <Typography
          variant="h3"
          text={`Chosen movie: ${movieName.split('_id:')[0]}`}
        />
        <Typography
          variant="h2"
          fontWeight="500"
          text={`Choose a poster image for your chosen movie below`}
        />
        <Pressable onPress={pickImage}>
          <Image source={{ uri: image }} style={styles.image} />
        </Pressable>
        <View style={styles.row}>
          <Typography text="Your rating" variant="h4" />
          <StarRating
            maxStars={5}
            starSize={35}
            rating={rating}
            selectedStar={(rating) => setRating(rating)}
            emptyStarColor={theme.colors.white}
            fullStarColor={theme.colors.white}
          />
        </View>

        <View style={styles.row}>
          <Button
            title="Back"
            variant="secondary"
            buttonStyle={{
              flex: 1,
              marginRight: theme.spacings.xs,
              marginBottom: theme.spacings.xs,
            }}
            onPress={() => navigation.goBack()}
          />
          <Button
            title="Submit"
            variant={imageSelected && rating > 0 ? 'primary' : 'disabled'}
            buttonStyle={{ flex: 1, marginBottom: theme.spacings.xs }}
            onPress={handleSubmit}
            isDisabled={!imageSelected || rating === 0}
            rightIcon={
              loading && (
                <PacmanIndicator
                  color={theme.colors.white}
                  size={25}
                  style={styles.icon}
                />
              )
            }
          />
        </View>
      </ContentLayout>
    </ScreenLayout>
  );
}

StepTwo.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
  },
  input: {
    marginVertical: theme.spacings.xs,
    height: theme.spacings.xxl,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.spacings.Xs,
    padding: theme.spacings.xxs,
    color: theme.colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    flex: 0.5,
  },
});
