import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import { theme } from '../themes';
import StarRating from 'react-native-star-rating';
import Typography from './Typography';

const CommentCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <View style={styles.secondContainer}>
          <Avatar.Image size={40} source={require('../assets/icon.png')} />
          <View style={styles.name}>
            <Typography
              variant="h3"
              fontWeight="500"
              text="Abc"
              color={theme.colors.white}
            />
          </View>
        </View>
        <View>
          <StarRating
            style={styles.rating}
            disabled
            maxStars={5}
            starSize={14}
            containerStyle={{ width: '17%' }}
            rating={4}
            emptyStarColor={theme.colors.white}
            fullStarColor={theme.colors.white}
          />
        </View>
      </View>

      <Typography
        variant="h4"
        fontWeight="500"
        text=" Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five."
        color={theme.colors.white}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  secondContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: { marginLeft: 15 },
  rating: { flexDirection: 'row' },
});
export default CommentCard;
