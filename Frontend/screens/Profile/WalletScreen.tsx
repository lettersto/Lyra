import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';

import Wallet from '../../components/Profile/Wallet/Wallet';
import WalletCategory from '../../components/Profile/Wallet/WalletCategory';
import CircleProfile from '../../components/Utils/CircleProfile';
import {walletTabType} from '../../constants/types';
import Colors from '../../constants/Colors';

const dummyGiveList = [
  {giveId: 0, busker: {buskerId: 2, nickname: '영훈'}, coin: 300},
  {giveId: 1, busker: {buskerId: 2, nickname: '유주'}, coin: 300},
  {giveId: 2, busker: {buskerId: 2, nickname: '윤혁'}, coin: 300},
  {giveId: 3, busker: {buskerId: 2, nickname: '주현'}, coin: 300},
  {giveId: 4, busker: {buskerId: 2, nickname: '혜령'}, coin: 300},
  {giveId: 5, busker: {buskerId: 2, nickname: '헤르메스'}, coin: 300},
  {giveId: 6, busker: {buskerId: 2, nickname: '나폴레옹'}, coin: 300},
  {giveId: 7, busker: {buskerId: 2, nickname: '춘식이'}, coin: 300},
  {giveId: 8, busker: {buskerId: 2, nickname: '라이언'}, coin: 300},
  {giveId: 9, busker: {buskerId: 2, nickname: '00아너무너무사랑해'}, coin: 300},
  {giveId: 10, busker: {buskerId: 2, nickname: '슈퍼노바'}, coin: 300},
  {giveId: 11, busker: {buskerId: 2, nickname: '무명가수1'}, coin: 300},
  {giveId: 12, busker: {buskerId: 2, nickname: '무명가수2'}, coin: 300},
  {giveId: 13, busker: {buskerId: 2, nickname: '무명가수3'}, coin: 300},
  {giveId: 14, busker: {buskerId: 2, nickname: '무명가수4'}, coin: 300},
  {giveId: 15, busker: {buskerId: 2, nickname: '슈퍼노바'}, coin: 300},
];

const dummyReceiveList = [
  {receiveId: 0, receive: {receiveId: 2, nickname: 'ㅠㅠ'}, coin: 300},
  {receiveId: 1, receive: {receiveId: 2, nickname: '유주'}, coin: 300},
  {receiveId: 2, receive: {receiveId: 2, nickname: '윤혁'}, coin: 300},
  {receiveId: 3, receive: {receiveId: 2, nickname: '주현'}, coin: 300},
  {receiveId: 4, receive: {receiveId: 2, nickname: '혜령'}, coin: 300},
  {receiveId: 5, receive: {receiveId: 2, nickname: '헤르메스'}, coin: 300},
  {receiveId: 6, receive: {receiveId: 2, nickname: '나폴레옹'}, coin: 300},
  {receiveId: 7, receive: {receiveId: 2, nickname: '춘식이'}, coin: 300},
  {receiveId: 8, receive: {receiveId: 2, nickname: '라이언'}, coin: 300},
  {
    receiveId: 9,
    receive: {receiveId: 2, nickname: '00아너무너무사랑해'},
    coin: 300,
  },
  {receiveId: 10, receive: {receiveId: 2, nickname: '슈퍼노바'}, coin: 300},
  {receiveId: 11, receive: {receiveId: 2, nickname: '무명가수1'}, coin: 300},
  {receiveId: 12, receive: {receiveId: 2, nickname: '무명가수2'}, coin: 300},
  {receiveId: 13, receive: {receiveId: 2, nickname: '무명가수3'}, coin: 300},
  {receiveId: 14, receive: {receiveId: 2, nickname: '무명가수4'}, coin: 300},
  {receiveId: 15, receive: {receiveId: 2, nickname: '슈퍼노바'}, coin: 300},
];

const dummyChargeList = [
  {chargeId: 0, chargeDate: '2022-10-24', coin: 4000},
  {chargeId: 1, chargeDate: '2022-10-25', coin: 3000},
  {chargeId: 2, chargeDate: '2022-10-26', coin: 300},
  {chargeId: 3, chargeDate: '2022-10-27', coin: 100},
  {chargeId: 4, chargeDate: '2022-10-28', coin: 2000},
  {chargeId: 5, chargeDate: '2022-10-29', coin: 300},
];

// supporter, busker
const WalletScreen = () => {
  const [walletTabMode, setWalletTabMode] = useState<walletTabType>('give');

  // TODO change type for listData
  let listData: any = dummyGiveList;
  if (walletTabMode === 'receive') {
    listData = dummyReceiveList;
  }
  if (walletTabMode === 'charge') {
    listData = dummyChargeList;
  }

  const Header = () => (
    <View>
      <Wallet />
      <WalletCategory
        walletTabMode={walletTabMode}
        setWalletTabMode={setWalletTabMode}
      />
    </View>
  );

  const Item = ({
    content,
    coin,
    imageURI,
  }: {
    content: string;
    coin: number;
    // TODO change imageURI type from boolean to string
    imageURI?: boolean;
  }) => (
    <Pressable style={styles.itemContainer}>
      <View style={styles.leftItem}>
        {imageURI && (
          <CircleProfile size="extraSmall" grade="normal" isGradient={true} />
        )}
        <Text style={[styles.text, imageURI && styles.content]}>{content}</Text>
      </View>
      <Text style={styles.text}>{coin}</Text>
    </Pressable>
  );

  const renderItem = ({item}: {item: any}) => {
    // TODO profile image
    let content = '';
    if (walletTabMode === 'give') {
      content = item.busker.nickname;
    }
    if (walletTabMode === 'receive') {
      content = item.receive.nickname;
    }
    if (walletTabMode === 'charge') {
      content = item.chargeDate;
    }
    return (
      <Item
        content={content}
        coin={item.coin}
        imageURI={walletTabMode !== 'charge'}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={renderItem}
        ListHeaderComponent={Header}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
    marginBottom: '15%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: Colors.white300,
    borderBottomWidth: 1,
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 16,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: Colors.gray300,
  },
});

export default WalletScreen;
