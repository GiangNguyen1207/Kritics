import React from 'react';
import { FlatList } from 'react-native';
import { useMedia } from '../hooks/ApiHooks';
import { uploadsUrl } from '../utils/variables';
import MovieCard from './MovieCard';

const List = () => {
  const { mediaArray } = useMedia();

  return (
    <FlatList
      numColumns={3}
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({ item }) => (
        <MovieCard
          isLoggedIn
          rating={4}
          imageUri={uploadsUrl + item.thumbnails.w160}
          title={item.title}
        />
      )}
    />
  );
};

export default List;
