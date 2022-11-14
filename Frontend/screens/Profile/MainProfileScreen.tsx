import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Image,
  Pressable,
  // ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useQuery, useInfiniteQuery} from 'react-query';

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
  getMyBuskingList,
  getFavoritePheedList,
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

  const {
    fetchNextPage: myBuskingListFetchNextPage,
    hasNextPage: myBuskingListHasNextPage,
    // isFetchingNextPage: myBuskingListIsFetchingNextPage,
    data: myBuskingListData,
    isLoading: myBuskingListIsLoading,
  } = useInfiniteQuery(
    'myBusking',
    ({pageParam = 0}) => getMyBuskingList(pageParam, {user_id: MyUserId!}),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      enabled: galleryCategory === 'myBusking',
    },
  );

  const {
    fetchNextPage: favoritePheedFetchNextPage,
    hasNextPage: favoritePheedHasNextPage,
    // isFetchingNextPage: favoritePheedIsFetchingNextPage,
    data: favoritePheedData,
    isLoading: favoritePheedIsLoading,
  } = useInfiniteQuery(
    'favoriteBusking',
    ({pageParam = 0}) => getFavoritePheedList(pageParam, {userId: MyUserId!}),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      enabled: galleryCategory === 'favoriteBusking',
    },
  );

  const requestMyBuskingNextPage = () => {
    if (myBuskingListHasNextPage) {
      myBuskingListFetchNextPage();
    }
  };

  const requestFavoritePheedNextPage = () => {
    if (favoritePheedHasNextPage) {
      favoritePheedFetchNextPage();
    }
  };

  let isMyProfile = true;
  if (profileUserId && profileUserId !== MyUserId) {
    isMyProfile = false;
  }

  let renderData = myBuskingListData;
  let requestNextPage = requestMyBuskingNextPage;

  if (galleryCategory === 'favoriteBusking') {
    renderData = favoritePheedData;
    requestNextPage = requestFavoritePheedNextPage;
  }

  const isLoading =
    walletIsLoading ||
    profileIsLoading ||
    balanceIsLoading ||
    myBuskingListIsLoading ||
    favoritePheedIsLoading;

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

  // const loadingComponent = (
  //   <View style={styles.spinnerContainer}>
  //     <ActivityIndicator color={Colors.purple300} size="large" />
  //   </View>
  // );

  const dummyColor = [
    '#91a3dd',
    '#0f0e2b',
    '#2a1e47',
    '#3ba0e88a',
    '#2c1b5bff',
  ];

  const renderItem = ({item}: {item: any}) => {
    if (item.pheedImg.length > 0) {
      return (
        <Pressable>
          <Image source={{uri: item.pheedImg[0].path}} style={styles.image} />
        </Pressable>
      );
    } else {
      const dummyImageStyles = {
        backgroundColor: dummyColor[Math.floor(Math.random() * 5)],
      };
      return (
        <Pressable>
          <View style={[styles.image, dummyImageStyles]} />
        </Pressable>
      );
    }
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
          data={renderData?.pages.flat()}
          renderItem={renderItem}
          keyExtractor={(_item, index) => index.toString()}
          ListHeaderComponent={() => header}
          numColumns={3}
          onEndReached={requestNextPage}
          // ListFooterComponent={loadingComponent}
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
