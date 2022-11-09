import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Image,
} from 'react-native';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';

import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import EncryptedStorage from 'react-native-encrypted-storage';

import {
  ProfileStackNavigationProps,
  ProfileStackScreens,
  BottomTabNavigationProps,
  BottomTabScreens,
  PheedStackScreens,
} from '../../constants/types';
import {AuthContext} from '../../store/auth-context';
import {logoutFromServer} from '../../api/auth';
import {signOutWithKakao} from '../../api/auth';
import CircleProfile from '../../components/Utils/CircleProfile';
import ProfileInfoItem from '../../components/Profile/EditProfile/ProfileInfoItem';
import Colors from '../../constants/Colors';

type NavigationProps = CompositeNavigationProp<
  ProfileStackNavigationProps,
  BottomTabNavigationProps
>;

const ProfileDetailScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const {
    setImageURL,
    setIsLoggedIn,
    setLatitude,
    setLongitude,
    setNickname,
    setUserId,
  } = useContext(AuthContext);
  const [ImageUri, setImageUri] = useState<string>();

  const nicknamePressHandler = () => {
    navigation.navigate(ProfileStackScreens.EditProfile, {
      param: 'nickname',
    });
  };

  const introductionPressHandler = () => {
    navigation.navigate(ProfileStackScreens.EditProfile, {
      param: 'introduction',
    });
  };

  const bankPressHandler = () => {
    navigation.navigate(ProfileStackScreens.EditProfile, {
      param: 'bank',
    });
  };

  const accountPressHandler = () => {
    navigation.navigate(ProfileStackScreens.EditProfile, {
      param: 'account',
    });
  };

  const holderPressHandler = () => {
    navigation.navigate(ProfileStackScreens.EditProfile, {
      param: 'holder',
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

  const logoutHandler = async () => {
    try {
      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      await logoutFromServer(refreshToken);
      await signOutWithKakao();
      await EncryptedStorage.removeItem('refreshToken');
      await EncryptedStorage.removeItem('accessToken');
      setUserId(null);
      setNickname(null);
      setImageURL(null);
      setIsLoggedIn(false);
      setLatitude(null);
      setLongitude(null);
      navigation.navigate(BottomTabScreens.Home, {
        screen: PheedStackScreens.Login,
      });
    } catch (err) {
      if (__DEV__) {
        console.error('Logout Error!', err);
      }
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
        <Pressable onPress={logoutHandler}>
          <Text style={styles.text}>로그아웃</Text>
        </Pressable>
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
