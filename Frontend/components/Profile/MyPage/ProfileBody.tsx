import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import ProfileItem from './ProfileItem';
import CircleProfile from '../../Utils/CircleProfile';

import Button from '../../Utils/Button';
import MoreInfo from '../../Utils/MoreInfo';

const ProfileBody = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const buttonCustomStyle = {width: 236};

  const dummyIntroduction = `안녕하세요!
버스커 주혜입니다.\n
어릴 때 영화 <어거스트 러쉬>를 보고 기타에 깊은 감명을 받아 버스킹을 시작하게 되었습니다.\n
여러분에게도 따뜻한 감성을 전달하는 버스커가 되길 희망합니다.
\n
저는 주로 홍대 00로 00가게 앞 저녁 8시에 볼 수 있습니다.
\n  
많은 팔로우 부탁드려요!`;

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileTop}>
        <CircleProfile size="extraLarge" isGradient={false} />
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
        <MoreInfo content={dummyIntroduction} />
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
