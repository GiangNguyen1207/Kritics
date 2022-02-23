import React, { useState } from 'react';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput, View, StyleSheet, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import StarRating from 'react-native-star-rating';

import ScreenLayout from '../components/ScreenLayout';
import ContentLayout from '../components/ContentLayout';
import { theme } from '../themes';
import { FlatList } from 'react-native-gesture-handler';
import Typography from '../components/Typography';

const PostMovieReview = () => {
  const { top } = useSafeAreaInsets();
  const [movieName, onChangeMovieName] = useState('');
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(
    'https://place-hold.it/150x150&text=Choose'
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSearchMovieName = async (movieName) => {
    onChangeMovieName(movieName);
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.apiKey}&query=${movieName}&page=1`
    );
    console.log(response.data);
    setSuggestedMovies(response.data.results.slice(0, 10));
  };

  return (
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout
        hasHeader
        headerTitle={'Write a review'}
        style={{ paddingHorizontal: theme.spacings.s }}
      >
        <View style={styles.container}>
          <Pressable onPress={() => pickImage()}>
            <Image source={{ uri: image }} style={styles.image} />
          </Pressable>
          <TextInput
            autoCapitalize="none"
            placeholder="Movie name"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(movieName) => handleSearchMovieName(movieName)}
            value={movieName}
            style={styles.input}
          />
          <FlatList
            data={suggestedMovies}
            renderItem={({ item }) => (
              <Typography
                style={styles.item}
                text={item.original_title}
                variant="h3"
              >
                {item.key}
              </Typography>
            )}
            style={{
              height: suggestedMovies.length > 0 ? 100 : 0,
              flexGrow: 0,
            }}
          />
          <View style={styles.ratingContainer}>
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
          <Typography text="Your review" variant="h4" />
          <TextInput multiline style={[styles.input, { height: 100 }]} />
          {/* <Button onPress={handleSubmit} title="Submit" /> */}
        </View>
      </ContentLayout>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacings.xs,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  input: {
    height: theme.spacings.xxl,
    marginVertical: theme.spacings.xs,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.spacings.Xs,
    padding: theme.spacings.xxs,
    color: theme.colors.white,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: theme.spacings.s,
  },
});

export default PostMovieReview;
