import React, {Dispatch, SetStateAction} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../../../constants/Colors';

import {walletTabType} from '../../../constants/types';
import Button from '../../Utils/Button';

const WalletCategory = ({
  walletTabMode,
  setWalletTabMode,
}: {
  walletTabMode: walletTabType;
  setWalletTabMode: Dispatch<SetStateAction<walletTabType>>;
}) => {
  return (
    <View>
      <Text style={styles.text}>내역</Text>
      <View style={styles.buttonContainer}>
        <View>
          <Button
            title="후원한 내역"
            btnSize="medium"
            textSize="medium"
            onPress={() => setWalletTabMode('give')}
            isGradient={true}
            isOutlined={walletTabMode !== 'give'}
          />
        </View>
        <View style={styles.buttonMargin}>
          <Button
            title="후원받은 내역"
            btnSize="medium"
            textSize="medium"
            onPress={() => setWalletTabMode('receive')}
            isGradient={true}
            isOutlined={walletTabMode !== 'receive'}
          />
        </View>
        <View style={styles.buttonMargin}>
          <Button
            title="충전 내역"
            btnSize="medium"
            textSize="medium"
            onPress={() => setWalletTabMode('charge')}
            isGradient={true}
            isOutlined={walletTabMode !== 'charge'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopColor: Colors.pink500,
    borderTopWidth: 1,
  },
  buttonMargin: {
    marginLeft: 8,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: Colors.pink500,
    marginLeft: 20,
    marginVertical: 20,
  },
});

export default WalletCategory;
