import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import ProfileItem from './ProfileItem';
import CircleProfile from '../../Utils/CircleProfile';

import MoreInfo from '../../Utils/MoreInfo';

const ProfileBody = () => {
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
        <ProfileItem count={1} description="내 버스킹" />
        <ProfileItem count={256} description="팔로워" />
        <ProfileItem count={14} description="팔로우" />
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
});

export default ProfileBody;
