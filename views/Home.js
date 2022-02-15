import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Typography from '../components/Typography';
import Button from '../components/Button';
import { theme } from '../themes';
import ScreenLayout from '../components/ScreenLayout';
import ContentLayout from '../components/ContentLayout';
import { mainTab } from '../router/Maintab';
import CommentCard from '../components/CommentCard';

const Home = () => {
  const { top } = useSafeAreaInsets();

  return (
    <ScreenLayout style={{ paddingTop: top }}>
      <ContentLayout hasHeader headerTitle={mainTab.home}>
        {/* this is just for testing  */}
        <Typography variant="h2" text="Home" color={theme.colors.primary} />
        <Button title="Primary Button" variant="primary" onPress={() => {}} />
        <Button
          title="Secondary Button"
          variant="secondary"
          onPress={() => {}}
        />
        <Button title="Normal Button" onPress={() => {}} />
        <CommentCard />
      </ContentLayout>
    </ScreenLayout>
  );
};

export default Home;
