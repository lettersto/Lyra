import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';

import {useMutation, useQuery, useQueryClient} from 'react-query';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import EncryptedStorage from 'react-native-encrypted-storage';
import IIcon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  ProfileStackNavigationProps,
  ProfileStackScreens,
  BottomTabNavigationProps,
  BottomTabScreens,
  PheedStackScreens,
} from '../../constants/types';
import {AuthContext} from '../../store/auth-context';
import {logoutFromServer, signOutWithKakao} from '../../api/auth';
import {getUserProfile, deleteWallet, createWallet} from '../../api/profile';
import CircleProfile from '../../components/Utils/CircleProfile';
import ProfileInfoItem from '../../components/Profile/EditProfile/ProfileInfoItem';
import ModalWithButton from '../../components/Utils/ModalWithButton';
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
    userId,
  } = useContext(AuthContext);
  const [ImageUri, setImageUri] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isWalletCreatedAgain, setIsWalletCreatedAgain] =
    useState<boolean>(false);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    // isError,
  } = useQuery('userProfile', () => getUserProfile(userId!));

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

  const queryClient = useQueryClient();

  const {
    // data: deleteWalletData,
    mutate: deleteWalletMutate,
    isLoading: deleteWalletIsLoading,
    // isError: deleteWalletIsError,
  } = useMutation(deleteWallet);

  const {
    data: createWalletData,
    mutate: createWalletMutate,
    isLoading: createWalletIsLoading,
    // isError: createWalletIsError,
  } = useMutation(createWallet, {
    onSuccess: () => {
      queryClient.invalidateQueries('walletInfo');
      setIsWalletCreatedAgain(true);
    },
  });

  const walletCreationAgainHandler = () => {
    deleteWalletMutate(userId!);
    createWalletMutate(userId!);
  };

  const closeWalletCreationAgainModal = () => {
    setIsWalletCreatedAgain(false);
    setIsModalVisible(false);
  };

  const walletCreationAgainWarning = isWalletCreatedAgain
    ? '새 개인 키가 발급되었습니다. 반드시 안전한 곳에 개인 키를 보관해 주세요.'
    : '지갑을 재발급하면 기존의 후원 내역과 충전 내역이 날아가고, 충전한 돈이 모두 사라집니다. Lyra는 개인 부주의로 인한 손실에 대해서는 어떠한 책임도 지지 않습니다. 개인 키를 잃어버린 경우에만 신중하게 지갑을 재발급해 주세요.';

  const copyToClipboard = () => {
    Clipboard.setString('hello world');
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

  const isLoading =
    createWalletIsLoading || deleteWalletIsLoading || profileIsLoading;

  return (
    <>
      <ModalWithButton
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        leftText={isWalletCreatedAgain ? '닫기' : '취소하기'}
        onLeftPress={
          isWalletCreatedAgain
            ? closeWalletCreationAgainModal
            : () => setIsModalVisible(false)
        }
        rightText={isWalletCreatedAgain ? '복사하기' : '발급하기'}
        onRightPress={
          isWalletCreatedAgain ? copyToClipboard : walletCreationAgainHandler
        }>
        {isLoading ? (
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            animating={isLoading}
            color={Colors.purple300}
          />
        ) : null}
        {!isWalletCreatedAgain ? (
          <IIcon name="ios-warning-outline" size={25} color={Colors.pink500} />
        ) : (
          <Text style={styles.newPrivateKey}>
            {createWalletData?.privateKey || ''}
          </Text>
        )}
        <Text
          style={[
            styles.text,
            styles.modalText,
            isWalletCreatedAgain && styles.newPrivateKeyText,
          ]}>
          {walletCreationAgainWarning}
        </Text>
      </ModalWithButton>
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
        <View style={styles.seperator} />
        <View style={styles.itemContainer}>
          <ProfileInfoItem
            title="닉네임"
            content={profileData?.nickname || ''}
            onLongPress={nicknamePressHandler}
          />
          <ProfileInfoItem
            title="소개"
            content={profileData?.introduction || ''}
            placeHolder="소개를 작성해주세요."
            onLongPress={introductionPressHandler}
          />
          <ProfileInfoItem
            title="계좌"
            content={profileData?.bank || ''}
            placeHolder="은행을 선택하세요."
            onLongPress={bankPressHandler}
          />
          <ProfileInfoItem
            title=""
            content={profileData?.account || ''}
            placeHolder="계좌 번호를 입력하세요."
            onLongPress={accountPressHandler}
          />
          <ProfileInfoItem
            title=""
            content=""
            placeHolder="예금주를 입력하세요."
            onLongPress={holderPressHandler}
          />
          <View style={styles.buttomSeperator} />
          <Pressable
            onPress={() => setIsModalVisible(true)}
            style={styles.button}>
            <Text style={[styles.text, styles.buttonText]}>
              지갑 재발급 받기
            </Text>
          </Pressable>
          <Pressable
            onPress={logoutHandler}
            style={[styles.button, styles.lastButton]}>
            <Text style={[styles.text, styles.buttonText]}>로그아웃</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.black500,
    marginBottom: '15%',
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
    color: 'white',
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
  modalText: {
    padding: 8,
    lineHeight: 20,
    textAlign: 'justify',
  },
  newPrivateKey: {
    paddingTop: 8,
    paddingHorizontal: 14,
    textAlign: 'center',
    color: Colors.pink500,
    fontFamily: 'NanumSquareRoundR',
  },
  newPrivateKeyText: {
    textAlign: 'center',
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: '#bb92e273',
  },
  buttomSeperator: {
    width: '100%',
    height: 1,
    backgroundColor: '#bb92e273',
    marginTop: 50,
  },
  button: {
    paddingTop: 8,
    marginLeft: 16,
  },
  buttonText: {
    color: Colors.pink300,
  },
  lastButton: {
    paddingBottom: 16,
  },
  spinner: {
    position: 'absolute',
    left: '50%',
    top: '60%',
  },
});

export default ProfileDetailScreen;
