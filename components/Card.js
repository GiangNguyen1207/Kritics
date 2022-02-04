import { View, StyleSheet, Image, Text } from 'react-native';
import React from 'react';
import Typography from './Typography';
import { theme } from '../themes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';

const Card = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.box}></View>
        <View style={styles.card}>
          <FontAwesomeIcon icon={faBookmark} size={16} style={styles.icon} />
        </View>

        <Image
          source={{
            uri: 'https://static.wikia.nocookie.net/ironman/images/d/da/P170620_v_v8_ba.jpg/revision/latest/scale-to-width-down/333?cb=20191202183622',
          }}
          style={styles.image}
        />

        <Typography
          variant="h5"
          text="Movie 1"
          color={theme.colors.primary}
          style={styles.title}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    height: 200,
    width: 110,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'white',
  },
  box: {
    backgroundColor: 'black',
    width: 20,
    height: 25,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  image: {
    height: 140,
    width: 100,
    position: 'absolute',
    marginTop: 27,
    marginHorizontal: 5,
  },
  title: {
    position: 'absolute',
    bottom: 0,
  },
});
export default Card;
