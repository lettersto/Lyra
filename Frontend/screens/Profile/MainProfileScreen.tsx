import React, {useContext, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useQuery} from 'react-query';

import {ProfileStackNavigationProps} from '../../constants/types';
import {AuthContext} from '../../store/auth-context';
import {
  getUserWalletAddressAndCoin,
  getUserProfile,
  getTotalBalanceFromWeb3,
} from '../../api/profile';
import ProfileBody from '../../components/Profile/MyPage/ProfileBody';
import WalletBody from '../../components/Profile/MyPage/WalletBody';
import Gallery from '../../components/Profile/MyPage/Gallery';
import GradientLine from '../../components/Utils/GradientLine';
import LoadingSpinner from '../../components/Utils/LoadingSpinner';

import Colors from '../../constants/Colors';

const MainProfileScreen = () => {
  const {setWalletId, setWalletAddress, userId, walletAddress} =
    useContext(AuthContext);
  const navigation = useNavigation<ProfileStackNavigationProps>();

  const {
    data: profileData,
    isLoading: profileIsLoading,
    // isError,
  } = useQuery('userProfile', () => getUserProfile(userId!));

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
  } = useQuery('walletInfo', () => getUserWalletAddressAndCoin(userId!), {
    onSuccess: data => {
      setWalletId(data.walletId);
      setWalletAddress(data.address);
      balanceRefetch();
    },
  });

  const isLoading = walletIsLoading || profileIsLoading || balanceIsLoading;

  return (
    <>
      {isLoading ? (
        <LoadingSpinner
          size="large"
          color={Colors.purple300}
          animating={isLoading}
        />
      ) : null}
      <ScrollView style={styles.container}>
        <ProfileBody profileData={profileData} />
        <GradientLine />
        <WalletBody coin={Number(balanceData) || 0} />
        <GradientLine />
        <Gallery />
        <GradientLine />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
    marginBottom: '15%',
  },
});

export default MainProfileScreen;
