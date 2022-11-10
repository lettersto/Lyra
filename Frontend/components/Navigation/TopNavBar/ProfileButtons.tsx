import React, {useContext} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import IIcons from 'react-native-vector-icons/Ionicons';

import {AuthContext} from '../../../store/auth-context';
import {
  ProfileStackRouteProps,
  ProfileStackNavigationProps,
  ProfileStackScreens,
} from '../../../constants/types';
import Colors from '../../../constants/Colors';

const ProfileButtons = () => {
  const navigation = useNavigation<ProfileStackNavigationProps>();
  const route = useRoute<ProfileStackRouteProps>();
  const {userId: myUserId} = useContext(AuthContext);
  const profileUserId = route.params?.param;

  const isMyProfile = myUserId === profileUserId;

  const detailPressHander = () => {
    navigation.navigate(ProfileStackScreens.ProfileDetail);
  };

  const myProfilePressHander = () => {
    navigation.navigate(ProfileStackScreens.MainProfile, {
      param: myUserId as number,
    });
  };

  if (isMyProfile) {
    return (
      <Pressable onPress={detailPressHander}>
        <IIcons
          name="ellipsis-vertical-sharp"
          size={25}
          color={Colors.gray300}
        />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={myProfilePressHander}>
      <Text style={styles.myProfileBtn}>내 프로필</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  myProfileBtn: {
    color: Colors.pink300,
    fontFamily: 'NanumSquareRoundR',
    fontSize: 16,
  },
});

export default ProfileButtons;
