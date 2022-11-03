import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, Modal, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/Colors';
import Button from './Button';

import Icon from 'react-native-vector-icons/FontAwesome';
import GestureRecognizer from 'react-native-swipe-gestures';

const deviceWidth = Dimensions.get('window').width;

export const LocationModal = () => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate('LocationSearch');
    console.log('검색으로..');
    setModalVisible(false);
  };

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <GestureRecognizer
      onSwipeDown={() => setModalVisible(false)}
      config={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
      }}>
      <Modal animationType={'slide'} transparent={true} visible={modalVisible}>
        <View
          style={styles.blankSpace}
          onTouchEnd={() => navigation.navigate('MainPheed')}
        />
        <View style={styles.modal}>
          <Text style={styles.title}>동네 설정</Text>
          <Button
            title="도로명 또는 지번으로 검색"
            btnSize="large"
            textSize="medium"
            isGradient={false}
            isOutlined={false}
            onPress={pressHandler}
            customStyle={styles.button}
          />
          <Button
            title="현재 위치로 주소 설정"
            btnSize="medium"
            textSize="small"
            isGradient={false}
            isOutlined={false}
            customStyle={styles.currentBtn}
            onPress={() => console.log('현재 위치 버튼')}
          />
          {/* <Text>{address}</Text> */}
          <View style={styles.addressLog}>
            <Icon name="map-marker" size={20} color="white" />
            <Text style={styles.address}>광주광역시 광산구 오선동</Text>
          </View>
          <View style={styles.addressLog}>
            <Icon name="map-marker" size={20} color="white" />
            <Text style={styles.address}>광주광역시 광산구 오선동</Text>
          </View>
          <View style={styles.addressLog}>
            <Icon name="map-marker" size={20} color="white" />
            <Text style={styles.address}>광주광역시 광산구 오선동</Text>
          </View>
        </View>
      </Modal>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.purple300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    backgroundColor: Colors.black500,
  },
  title: {
    fontFamily: 'NanumSquareRoundR',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    width: deviceWidth * 0.8,
  },
  currentBtn: {
    backgroundColor: 'none',
    marginBottom: 5,
  },
  address: {
    fontFamily: 'NanumSquareRoundR',
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    marginVertical: 5,
    marginLeft: 10,
  },
  addressLog: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blankSpace: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
});
