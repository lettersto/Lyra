import {useNavigation} from '@react-navigation/native';
import React, {Dispatch, SetStateAction} from 'react';
import {Dimensions, Modal, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/Colors';
import Button from '../Utils/Button';
import {ChatStackNavigationProps} from '../../constants/types';

interface Props {
  totalCnt: number;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const EndModal = ({totalCnt, modalVisible, setModalVisible}: Props) => {
  const navigate = useNavigation<ChatStackNavigationProps>();
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={styles.blankSpace}
          // onTouchEnd={() => {
          //   setModalVisible(false);
          // }}
        />
        <View style={styles.midView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, styles.titleText]}>
              버스킹이 종료되었습니다.
            </Text>
            <Text style={styles.modalText}>총 관객 수 : {totalCnt}</Text>
            <Button
              title="나가기"
              btnSize="extraLarge"
              textSize="extraLarge"
              isOutlined={false}
              isGradient={true}
              customStyle={styles.button}
              onPress={() => navigate.goBack()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  midView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.black500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    width: '80%',
    borderColor: Colors.purple300,
    borderWidth: 1,
  },
  button: {
    width: 150,
  },
  modalText: {
    color: 'white',
    marginBottom: 15,
    width: '80%',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
  },
  blankSpace: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
});
export default EndModal;
