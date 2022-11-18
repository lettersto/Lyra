import React, {Dispatch, SetStateAction} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import IIcons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../../Utils/Button';
import Colors from '../../../constants/Colors';

const Wallet = ({
  coin,
  address,
  setIsModalVisible,
}: {
  coin: number;
  address: string;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const gradientColors = [Colors.pink700, Colors.purple700];

  const copyToClipboard = async () => {
    await Clipboard.setString(address);
  };

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
            <Text style={[styles.text, styles.textMargin]}>{address}</Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <IIcons
                name="ios-copy-outline"
                size={25}
                color={Colors.pink300}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.walletBottom}>
            <View style={styles.coinContainer}>
              <Text style={[styles.text, styles.colorPink, styles.textMargin]}>
                LYRA
              </Text>
              <Text style={styles.text}>{coin}</Text>
            </View>
            <Button
              title="충전"
              btnSize="medium"
              textSize="medium"
              onPress={() => setIsModalVisible(true)}
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    paddingLeft: 8,
    marginBottom: 8,
  },
  textMargin: {
    marginRight: 8,
    fontSize: 16,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: 'white',
  },
  colorPink: {
    color: Colors.pink300,
  },
});

export default Wallet;
