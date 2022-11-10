import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useQuery} from 'react-query';

import {
  ProfileStackNavigationProps,
  ProfileStackRouteProps,
  galleryTypes,
} from '../../constants/types';
import {AuthContext} from '../../store/auth-context';
import {
  getUserWalletAddressAndCoin,
  getUserProfile,
  getTotalBalanceFromWeb3,
} from '../../api/profile';
import ProfileBody from '../../components/Profile/MyPage/ProfileBody';
import WalletBody from '../../components/Profile/MyPage/WalletBody';
import GalleryButtons from '../../components/Profile/MyPage/GalleryButtons';
import GradientLine from '../../components/Utils/GradientLine';
import LoadingSpinner from '../../components/Utils/LoadingSpinner';
import Colors from '../../constants/Colors';

const MainProfileScreen = () => {
  const route = useRoute<ProfileStackRouteProps>();
  const {
    setWalletId,
    setWalletAddress,
    userId: MyUserId,
    walletAddress,
  } = useContext(AuthContext);
  const navigation = useNavigation<ProfileStackNavigationProps>();
  const [galleryCategory, setGalleryCategory] =
    useState<galleryTypes>('myBusking');

  const profileUserId = route.params?.param;
  const userId = profileUserId || MyUserId;

  const {
    data: profileData,
    isLoading: profileIsLoading,
    // isError,
  } = useQuery(
    ['userProfile', userId],
    () => getUserProfile(userId as number),
    {
      onSuccess: () => {
        if (userId) {
          balanceRefetch();
        }
      },
    },
  );

  const nickname = profileData?.nickname;

  useEffect(() => {
    navigation.setOptions({
      title: nickname || '',
    });
  }, [navigation, nickname]);

  const {
    data: balanceData, // string coin
    isLoading: balanceIsLoading,
    refetch: balanceRefetch,
  } = useQuery('walletBalance', () => getTotalBalanceFromWeb3(walletAddress!), {
    enabled: false,
  });

  const {
    // data: walletData,
    isLoading: walletIsLoading,
    // isError,
  } = useQuery(
    'walletInfo',
    () => getUserWalletAddressAndCoin(userId as number),
    {
      onSuccess: data => {
        setWalletId(data.walletId);
        setWalletAddress(data.address);
        balanceRefetch();
      },
    },
  );

  let isMyProfile = true;
  if (profileUserId && profileUserId !== MyUserId) {
    isMyProfile = false;
  }

  const isLoading = walletIsLoading || profileIsLoading || balanceIsLoading;

  const header = (
    <>
      <ProfileBody profileData={profileData} isMyProfile={isMyProfile} />
      {isMyProfile ? <WalletBody coin={Number(balanceData) || 0} /> : null}
      <GradientLine />
      <GalleryButtons
        galleryCategory={galleryCategory}
        setGalleryCategory={setGalleryCategory}
      />
    </>
  );

  const loadingComponent = (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator color={Colors.purple300} size="large" />
    </View>
  );

  const dummyColor = [
    '#91a3dd',
    '#0f0e2b',
    '#2a1e47',
    '#3ba0e88a',
    '#2c1b5bff',
  ];

  const renderItem = () => {
    const dummyImageStyles = {
      backgroundColor: dummyColor[Math.floor(Math.random() * 5)],
    };
    return <View style={[styles.image, dummyImageStyles]} />;
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner
          size="large"
          color={Colors.purple300}
          animating={isLoading}
        />
      ) : null}
      <View style={styles.wrapper}>
        <FlatList
          key={'#'}
          data={new Array(50).fill(1)}
          renderItem={renderItem}
          keyExtractor={(_item, index) => '#' + index.toString()}
          ListHeaderComponent={() => header}
          numColumns={3}
          ListFooterComponent={loadingComponent}
          style={styles.container}
        />
      </View>
    </>
  );
};

const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
    marginBottom: '15%',
  },
  image: {
    width: deviceWidth / 3,
    height: deviceWidth / 3,
  },
  spinnerContainer: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainProfileScreen;
