import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import CircleProfile from '../../components/Utils/CircleProfile';
import ProfileInfoItem from '../../components/Profile/EditProfile/ProfileInfoItem';
import Colors from '../../constants/Colors';

const ProfileDetailScreen = () => {
  const navigation = useNavigation();
  const [ImageUri, setImageUri] = useState<string>();

  const nicknamePressHandler = () => {
    navigation.navigate('EditProfile', {
      editProfileMode: 'nickname',
    });
  };

  const introductionPressHandler = () => {
    navigation.navigate('EditProfile', {
      editProfileMode: 'introduction',
    });
  };

  const bankPressHandler = () => {
    navigation.navigate('EditProfile', {
      editProfileMode: 'bank',
    });
  };

  const accountPressHandler = () => {
    navigation.navigate('EditProfile', {
      editProfileMode: 'account',
    });
  };

  const holderPressHandler = () => {
    navigation.navigate('EditProfile', {
      editProfileMode: 'holder',
    });
  };

  const ChangeProfileImagePressHandler = async () => {
    let newProfileImage: ImageOrVideo;
    try {
      newProfileImage = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: 'photo',
      });
      setImageUri(newProfileImage.path);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.profileImageContainer}>
        {ImageUri && <Image style={styles.image} source={{uri: ImageUri}} />}
        {!ImageUri && (
          <CircleProfile size="extraLarge" grade="normal" isGradient={true} />
        )}
        <Pressable
          style={styles.changePhoto}
          onPress={ChangeProfileImagePressHandler}>
          <Text style={styles.text}>사진 바꾸기</Text>
        </Pressable>
      </View>
      {/* <GradientLine /> */}
      <View style={styles.itemContainer}>
        <ProfileInfoItem
          title="닉네임"
          content="주혜"
          onLongPress={nicknamePressHandler}
        />
        <ProfileInfoItem
          title="소개"
          content=""
          placeHolder="소개를 작성해주세요."
          onLongPress={introductionPressHandler}
        />
        <ProfileInfoItem
          title="계좌"
          content=""
          placeHolder="은행을 선택하세요."
          onLongPress={bankPressHandler}
        />
        <ProfileInfoItem
          title=""
          content=""
          placeHolder="계좌 번호를 입력하세요."
          onLongPress={accountPressHandler}
        />
        <ProfileInfoItem
          title=""
          content=""
          placeHolder="예금주를 입력하세요."
          onLongPress={holderPressHandler}
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
  changePhoto: {
    marginBottom: 8,
  },
  image: {
    width: 150,
    height: 150,
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

export default ProfileDetailScreen;
