import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import {useQuery, useMutation, useQueryClient} from 'react-query';

import {checkIsFollowing, followAndUnfollow} from '../../../api/profile';
import {UserProfileType} from '../../../constants/types';
import ProfileItem from './ProfileItem';
import ProfilePhoto from '../../Utils/ProfilePhoto';
import Button from '../../Utils/Button';
import MoreInfo from '../../Utils/MoreInfo';
import {AuthContext} from '../../../store/auth-context';

const ProfileBody = ({
  profileData,
  isMyProfile,
}: {
  profileData: UserProfileType;
  isMyProfile: boolean;
}) => {
  const queryClient = useQueryClient();
  const {userId} = useContext(AuthContext);
  const buttonCustomStyle = {width: 236};

  const {data: followState} = useQuery(
    'followState',
    () => checkIsFollowing(profileData?.id, userId!),
    {
      enabled: !isMyProfile && !!profileData?.id && !!userId,
    },
  );

  const {
    mutate: followerMutate,
    // isError,
    // isLoading,
  } = useMutation(followAndUnfollow);

  const followerhandler = () => {
    if (isMyProfile) {
      return;
    }
    followerMutate(
      {
        followerId: profileData?.id,
        followingId: userId!,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('userProfile');
          queryClient.invalidateQueries('followState');
        },
      },
    );
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileTop}>
        <ProfilePhoto
          size="extraLarge"
          isGradient={false}
          imageURI={profileData?.image_url}
          profileUserId={profileData?.id}
        />
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileInfo}>
            <ProfileItem
              count={profileData?.end_busk_count || 0}
              description="내 버스킹"
            />
            <ProfileItem
              count={profileData?.follower_count || 0}
              description="팔로워"
              userProfileId={profileData?.id}
              profileUserNickname={profileData?.nickname || ''}
            />
            <ProfileItem
              count={profileData?.following_count || 0}
              description="팔로우"
              userProfileId={profileData?.id}
              profileUserNickname={profileData?.nickname || ''}
            />
          </View>
          {!isMyProfile ? (
            <Button
              title={followState ? '팔로우 끊기' : '팔로우 하기'}
              btnSize="small"
              textSize="small"
              customStyle={buttonCustomStyle}
              isGradient={followState ? true : false}
              isOutlined={true}
              onPress={followerhandler}
            />
          ) : null}
        </View>
      </View>
      <MoreInfo content={profileData?.introduction || ''} />
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
