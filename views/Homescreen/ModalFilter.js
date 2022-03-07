import React, { useState } from 'react';
import { StyleSheet, Pressable, FlatList, Modal } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { genres } from '../../data/genres';
import { theme } from '../../themes';
import GenreCard from '../../components/GenreCard';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import ScreenLayout from '../../components/ScreenLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ModalFilter = ({ navigation, modalVisible, setModalVisible }) => {
  const { top, bottom } = useSafeAreaInsets();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleSubmit = async () => {
    navigation.navigate('Filter', {
      selectedGenres,
    });
    setSelectedGenres([]);
    setModalVisible(false);
  };

  const onSelectGenreCard = (newGenre) => {
    setSelectedGenres(newGenre);
    if (selectedGenres.includes(newGenre)) {
      const newGenres = [...selectedGenres];
      const index = newGenres.indexOf(newGenre);
      newGenres.splice(index, 1);
      setSelectedGenres(newGenres);
    } else setSelectedGenres([...selectedGenres, newGenre]);
  };

  const onCloseModal = () => {
    setSelectedGenres([]);
    setModalVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <ScreenLayout
        style={[{ paddingTop: top, paddingBottom: bottom }, styles.container]}
      >
        <Typography
          variant="h3"
          text="Filter by genres"
          color={theme.colors.white}
          fontWeight="bold"
        />
        <FlatList
          numColumns={3}
          data={genres}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.cardContainer}
              onPress={() => onSelectGenreCard(item.name)}
            >
              <GenreCard
                genre={item.name}
                selected={selectedGenres.includes(item.name)}
              />
            </Pressable>
          )}
          contentContainerStyle={{
            alignItems: 'center',
            marginVertical: theme.spacings.xs,
          }}
        />
        <Button
          title="Close"
          variant="secondary"
          onPress={onCloseModal}
          buttonStyle={{ marginBottom: theme.spacings.xs }}
        />
        <Button
          title="Apply"
          variant={_.isEmpty(selectedGenres) ? 'disabled' : 'primary'}
          onPress={handleSubmit}
          isDisabled={_.isEmpty(selectedGenres)}
        />
      </ScreenLayout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacings.s,
  },
  cardContainer: {
    marginRight: theme.spacings.s,
    marginVertical: theme.spacings.Xs,
  },
});

ModalFilter.propTypes = {
  navigation: PropTypes.object,
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
};

export default ModalFilter;
