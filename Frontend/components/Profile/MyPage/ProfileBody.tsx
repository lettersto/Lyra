import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import {UserProfileType} from '../../../constants/types';
import ProfileItem from './ProfileItem';
import ProfilePhoto from '../../Utils/ProfilePhoto';
import Button from '../../Utils/Button';
import MoreInfo from '../../Utils/MoreInfo';

const ProfileBody = ({profileData}: {profileData: UserProfileType}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const buttonCustomStyle = {width: 236};

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileTop}>
        <ProfilePhoto
          size="extraLarge"
          isGradient={false}
          imageURI={profileData?.image_url}
        />
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileInfo}>
            <ProfileItem count={1} description="내 버스킹" />
            <ProfileItem count={256} description="팔로워" />
            <ProfileItem count={14} description="팔로우" />
          </View>
          <Button
            title={isFollowing ? '팔로우 끊기' : '팔로우 하기'}
            btnSize="small"
            textSize="small"
            customStyle={buttonCustomStyle}
            isGradient={true}
            isOutlined={true}
            onPress={() => setIsFollowing(preV => !preV)}
          />
        </View>
      </View>
      <View>
        <MoreInfo content={profileData?.introduction || ''} />
      </View>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  profileContainer: {
    width: '100%',
    paddingHorizontal: 8,
  },
  fullImage: {
    width: deviceWidth,
    height: deviceWidth,
  },
  profileTop: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  profileInfoContainer: {
    width: '75%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
});

export default ProfileBody;
