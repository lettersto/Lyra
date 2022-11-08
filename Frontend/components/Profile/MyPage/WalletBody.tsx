import React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import IIcon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/Colors';

const WalletBody = () => {
  const gradientColors = [Colors.pink300, Colors.purple300];
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate('Wallet');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[...gradientColors]}
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.gradientContainer}>
        <View style={styles.walletContainer}>
          <Pressable style={styles.flex} onPress={pressHandler}>
            <View style={styles.walletContent}>
              <View style={styles.headerContainer}>
                <Text style={[styles.text, styles.walletHeader]}>지갑</Text>
                <IIcon
                  name="ios-wallet-outline"
                  size={20}
                  color={Colors.pink500}
                />
              </View>
              <View style={styles.money}>
                <Text style={styles.text}>잔액</Text>
                <Text style={styles.text}>{`${20000} 코인`}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  gradientContainer: {
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  walletContainer: {
    width: deviceWidth - 24,
    backgroundColor: Colors.black500,
    height: 88,
    borderRadius: 4,
  },
  flex: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  walletContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  walletHeader: {
    fontSize: 18,
    color: Colors.pink500,
    marginRight: 4,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 16,
    color: Colors.gray300,
  },
  money: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
  },
});

export default WalletBody;
