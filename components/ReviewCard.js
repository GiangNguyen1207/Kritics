import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import { theme } from '../themes';
import StarRating from 'react-native-star-rating';
import Typography from './Typography';
import PropTypes from 'prop-types';
import { useUser } from '../services/AuthService';
import { auth } from '../utils/auth';
import { format } from 'date-fns';

const ReviewCard = ({ route }) => {
  const { file } = route.params;
  const fileDetails = JSON.parse(file.description);
  const { getUserById } = useUser();
  const [reviewOwner, setReviewOwner] = useState({ username: 'fetching...' });

  const fetchReviewOwner = async () => {
    try {
      const token = await auth.getUserTokenFromStorage();
      const userData = await getUserById(file.user_id, token);
      setReviewOwner(userData);
    } catch (error) {
      console.error('fetch review owner', error);
      setReviewOwner({ username: '[not available]' });
    }
  };

  console.log(fileDetails);

  useEffect(() => {
    fetchReviewOwner();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <View style={styles.secondContainer}>
          <Avatar.Image size={60} source={require('../assets/icon.png')} />
          <View style={styles.name}>
            <Typography
              variant="h2"
              fontWeight="500"
              text={reviewOwner.username}
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
      <View>
        <Typography
          style={styles.review}
          variant="h4"
          fontWeight="500"
          text={fileDetails.comment}
          color={theme.colors.white}
        />
      </View>
      <View>
        <Typography
          style={styles.date}
          variant="h6"
          fontWeight="400"
          text={format(new Date(file.time_added), 'dd-MM-yyyy')}
          color={theme.colors.lightGrey}
        />
      </View>
    </View>
  );
};

ReviewCard.propTypes = {
  route: PropTypes.object,
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
  review: { marginBottom: 20 },
  date: { marginTop: 30 },
});
export default ReviewCard;
