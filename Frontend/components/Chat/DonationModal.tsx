import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';
import Button from '../Utils/Button';
import Input from '../Utils/Input';

interface Props {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  sendDonation: (
    myPrivateKey: string,
    message: string,
    donation: string,
  ) => void;
  warningMsg: string;
  setWarningMsg: Dispatch<SetStateAction<string>>;
  balance: number;
  isDonationLoading: boolean;
}

const DonationModal = ({
  modalVisible,
  setModalVisible,
  sendDonation,
  warningMsg,
  balance,
  setWarningMsg,
  isDonationLoading,
}: Props) => {
  const [message, setMessage] = useState('');
  const [donation, setDonation] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    setMessage('');
    setDonation('');
    setPrivateKey('');
    setWarningMsg('');
  }, [modalVisible, setWarningMsg]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={styles.blankSpace}
          onTouchEnd={() => {
            setModalVisible(false);
          }}
        />
        <View style={styles.bottomView}>
          {isDonationLoading ? (
            <View style={styles.backContainer}>
              <ActivityIndicator
                style={styles.spinner}
                size="large"
                animating={isDonationLoading}
                color={Colors.purple300}
              />
            </View>
          ) : null}
          <View style={styles.modalView}>
            <Text style={[styles.modalText, styles.titleText]}>후원하기</Text>
            <Text style={[styles.modalText, styles.balanceText]}>
              잔액 : {balance}
            </Text>
            <Text style={styles.modalText}>
              금액 및 메시지가 공개적으로 표시됩니다.
            </Text>
            <Text style={styles.modalText}>개인키</Text>
            <Input
              setEnteredValue={setPrivateKey}
              enteredValue={privateKey}
              width={0.77}
              height={0.06}
              borderRadius={25}
              keyboard={1}
              placeholder="개인키를 입력해주세요."
              customStyle={styles.input}
              maxLength={70}
            />
            <Text style={styles.modalText}>금액</Text>
            <Input
              setEnteredValue={setDonation}
              enteredValue={donation}
              width={0.77}
              height={0.06}
              borderRadius={25}
              keyboard={2}
              placeholder="$ 1 (최소 금액)"
              customStyle={styles.input}
              maxLength={10}
            />
            <Text style={styles.modalText}>메시지</Text>
            <Input
              setEnteredValue={setMessage}
              enteredValue={message}
              width={0.77}
              height={0.06}
              borderRadius={25}
              keyboard={1}
              placeholder="메시지를 입력해주세요."
              customStyle={styles.input}
              maxLength={30}
            />
            {warningMsg !== '' && (
              <Text style={[styles.modalText, styles.warningText]}>
                {warningMsg}
              </Text>
            )}
            <Button
              title="후원하기"
              btnSize="extraLarge"
              textSize="extraLarge"
              isOutlined={false}
              isGradient={true}
              customStyle={styles.button}
              onPress={() => sendDonation(privateKey, message, donation)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.black500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    paddingBottom: 30,
    alignItems: 'center',
    width: '100%',
    borderColor: Colors.purple300,
    borderWidth: 1,
  },
  button: {
    width: 300,
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
  input: {
    marginBottom: 20,
  },
  blankSpace: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  warningText: {
    color: 'orange',
  },
  balanceText: {
    textAlign: 'right',
  },
  backContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 2,
  },
  spinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
});
export default DonationModal;
