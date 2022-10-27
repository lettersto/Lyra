import React from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';

import CircleProfile from '../../components/Utils/CircleProfile';
import ProfileInfoItem from '../../components/Profile/EditProfile/ProfileInfoItem';
import GradientLine from '../../components/Utils/GradientLine';
import Colors from '../../constants/Colors';

const EditProfileScreen = () => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.profileImageContainer}>
        <CircleProfile size="extraLarge" grade="normal" isGradient={true} />
        <Pressable>
          <Text style={styles.text}>사진 바꾸기</Text>
        </Pressable>
      </View>
      <GradientLine />
      <View style={styles.itemContainer}>
        <ProfileInfoItem title="닉네임" content="주혜" />
        <ProfileInfoItem
          title="소개"
          content=""
          placeHolder="소개를 작성해주세요."
        />
        <ProfileInfoItem
          title="계좌"
          content=""
          placeHolder="은행을 선택하세요."
        />
        <ProfileInfoItem
          title=""
          content=""
          placeHolder="계좌 번호를 입력하세요."
        />
        <ProfileInfoItem
          title=""
          content=""
          placeHolder="예금주를 선택하세요."
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  text: {
    marginTop: 8,
    fontFamily: 'NanumSquareRoundR',
    fontSize: 16,
    color: Colors.gray300,
  },
  profileImageContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    paddingVertical: 8,
  },
});

export default EditProfileScreen;
