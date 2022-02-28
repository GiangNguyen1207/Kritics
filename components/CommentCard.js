import { View, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import { theme } from '../themes';
import Typography from './Typography';
import PropTypes from 'prop-types';
import { auth } from '../utils/auth';
import { useUser } from '../services/AuthService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';

const CommentCard = ({ route, item, handleDeleteComment }) => {
  const { file } = route.params;
  const { getUserById, getUserByToken } = useUser();
  const [user, setUser] = useState();
  const [isOwner, setIsOwner] = useState(false);

  const getUser = async () => {
    try {
      if (item) {
        const token = await auth.getUserTokenFromStorage();
        const logginUser = await getUserByToken(token);
        const user = await getUserById(item.user_id, token);
        if (logginUser.user_id === item.user_id) setIsOwner(true);
        setUser(user);
      }
    } catch (error) {
      console.log('get user error', error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <View style={styles.secondContainer}>
          <Avatar.Image size={40} source={require('../assets/icon.png')} />
          <View style={styles.name}>
            <Typography
              variant="h3"
              fontWeight="500"
              text={user?.username}
              color={theme.colors.white}
            />
          </View>
        </View>
        {isOwner && (
          <Pressable onPress={() => handleDeleteComment(item.comment_id)}>
            <Icon
              style={styles.rating}
              name={'trash'}
              size={18}
              color={theme.colors.white}
            />
          </Pressable>
        )}
      </View>
      <View>
        <Typography
          style={styles.comment}
          variant="h4"
          fontWeight="500"
          text={item?.comment}
          color={theme.colors.white}
        />
      </View>

      <View>
        <Typography
          style={styles.date}
          variant="h6"
          fontWeight="400"
          text={format(new Date(file.time_added), 'dd-MM-yyyy')}
          color={theme.colors.white}
        />
      </View>
    </View>
  );
};

CommentCard.propTypes = {
  route: PropTypes.object,
  item: PropTypes.object,
  handleDeleteComment: PropTypes.func,
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
  comment: { marginBottom: 20 },
  date: { marginTop: 30 },
});
export default CommentCard;
