import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import IIcons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../../Utils/Button';
import Colors from '../../../constants/Colors';

const Wallet = () => {
  const dummyHashCode = '0x44783342dee123aidfiouekajdkfddkfljalfjakldjf';
  const dummyCoin = 2000000;

  const gradientColors = [Colors.pink300, Colors.purple300];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[...gradientColors]}
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        style={styles.gradientContainer}>
        <View style={styles.walletContainer}>
          <Text style={[styles.text, styles.colorPink, styles.title]}>
            지갑 주소
          </Text>
          <View style={styles.addressContainer}>
            <Text
              style={[
                styles.text,
                styles.textMargin,
              ]}>{`${dummyHashCode.substring(0, 20)}...`}</Text>
            <IIcons name="ios-copy-outline" size={25} color={Colors.pink300} />
          </View>
          <View style={styles.walletBottom}>
            <View style={styles.coinContainer}>
              <Text style={[styles.text, styles.colorPink, styles.textMargin]}>
                COIN
              </Text>
              <Text style={styles.text}>{dummyCoin}</Text>
            </View>
            <Button
              title="충전"
              btnSize="medium"
              textSize="medium"
              onPress={() => {}}
              isGradient={true}
              isOutlined={false}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '3%',
    paddingVertical: 20,
  },
  gradientContainer: {
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  walletContainer: {
    width: deviceWidth - 26,
    padding: 16,
    backgroundColor: Colors.black500,
    borderRadius: 4,
  },
  title: {
    marginBottom: 8,
    fontSize: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    marginLeft: 8,
    marginBottom: 8,
  },
  textMargin: {
    marginRight: 8,
  },
  coinContainer: {
    flexDirection: 'row',
  },
  walletBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: Colors.gray300,
  },
  colorPink: {
    color: Colors.pink300,
  },
});

export default Wallet;
