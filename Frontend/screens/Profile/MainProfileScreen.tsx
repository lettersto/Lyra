import React, {useContext} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import {useQuery} from 'react-query';

import {AuthContext} from '../../store/auth-context';
import {getUserWalletAddressAndCoin} from '../../api/profile';
import ProfileBody from '../../components/Profile/MyPage/ProfileBody';
import WalletBody from '../../components/Profile/MyPage/WalletBody';
import Gallery from '../../components/Profile/MyPage/Gallery';
import GradientLine from '../../components/Utils/GradientLine';
import LoadingSpinner from '../../components/Utils/LoadingSpinner';

import Colors from '../../constants/Colors';

const MainProfileScreen = () => {
  const userId = 1;
  const {setWalletId, setWalletAddress} = useContext(AuthContext);
  const {
    data: walletData,
    isLoading,
    // isError,
  } = useQuery('walletInfo', () => getUserWalletAddressAndCoin(userId), {
    onSuccess: data => {
      setWalletId(data.walletId);
      setWalletAddress(data.address);
    },
  });

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
        <ProfileBody />
        <GradientLine />
        <WalletBody coin={walletData?.coin || 0} />
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
