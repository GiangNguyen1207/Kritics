import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenLayout from '../components/ScreenLayout';
import ContentLayout from '../components/ContentLayout';
import { mainTab } from '../router/Maintab';
import MovieDetailsCard from '../components/MovieDetailsCard';

const Favourtie = () => {
  const { top } = useSafeAreaInsets();

  const movie = {
    name: 'Iron man',
    image: 'https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
    release_date: '2008-04-30',
    runtime: 126,
  };

  return (
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout
        hasHeader
        headerTitle={mainTab.favourite}
        onPressBack={() => {}}
      >
        <MovieDetailsCard movieDetails={movie} hasDetails hasBottomLine />
      </ContentLayout>
    </ScreenLayout>
  );
};

export default Favourtie;
