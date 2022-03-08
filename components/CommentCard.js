import { View, StyleSheet, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { theme } from '../themes';
import Typography from './Typography';
import PropTypes from 'prop-types';
import { auth } from '../utils/auth';
import { useUser } from '../services/AuthService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import HorizontalLine from './HorizontalLine';
import { tagService } from '../services/TagService';
import { uploadsUrl } from '../utils/variables';

const CommentCard = ({ item, handleDeleteComment, hasBottomLine }) => {
  const { getUserById, getUserByToken } = useUser();
  const [user, setUser] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');

  const getUserAndAvatar = async () => {
    try {
      if (item) {
        const token = await auth.getUserTokenFromStorage();
        const logginUser = await getUserByToken(token);
        const user = await getUserById(item.user_id, token);
        const avatarArray = await tagService.getMediaByTag(
          'avatar_' + user.user_id
        );
        const avatar = avatarArray.pop();
        if (avatar) {
          setAvatar(uploadsUrl + avatar.filename);
        }
        if (logginUser.user_id === item.user_id) setIsOwner(true);
        setUser(user);
      }
    } catch (error) {
      console.log('get user error', error);
    }
  };

  useEffect(() => {
    getUserAndAvatar();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <View style={styles.secondContainer}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
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
          text={format(new Date(item.time_added), 'dd-MM-yyyy')}
          color={theme.colors.white}
        />
      </View>
      {hasBottomLine && <HorizontalLine color={theme.colors.lightGrey} />}
    </View>
  );
};

CommentCard.propTypes = {
  item: PropTypes.object,
  handleDeleteComment: PropTypes.func,
  hasBottomLine: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacings.xs,
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacings.xxs,
    justifyContent: 'space-between',
  },
  secondContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: { marginLeft: theme.spacings.xs },
  rating: { flexDirection: 'row' },
  comment: { marginBottom: theme.spacings.s },
  date: { marginTop: theme.spacings.l },
  avatar: {
    width: theme.spacings.xxxl,
    height: theme.spacings.xxxl,
    borderRadius: 50,
  },
});
export default CommentCard;
