import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Dimensions, Modal, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import Button from '../../../components/Utils/Button';
import Colors from '../../../constants/Colors';
import {RootStackParamList} from '../../../constants/types';
import data from '../../../components/Pheed/pheedData.json';
import {Picker} from 'react-native-wheel-pick';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateShorts'>;

const CreateShortsScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [timeLocation, setTimeLocation] = useState('');

  const onStart = () => {
    setModalVisible(true);
  };

  const goHome = () => {
    navigation.navigate('MainPheed');
  };

  const dateTimeLocation = [];

  for (var i = 0; i < data.length; i++) {
    dateTimeLocation.push(data[i].datetime + ' ' + data[i].location);
  }

  return (
    <>
      <Modal animationType={'fade'} transparent={true} visible={modalVisible}>
        <View style={styles.container}>
          <View
            style={styles.blankSpace}
            onTouchEnd={() => setModalVisible(false)}
          />
          <View style={styles.contentContainer}>
            <Picker
              textSize={20}
              style={styles.picker}
              selectedValue="item4"
              pickerData={dateTimeLocation}
              onValueChange={value => {
                setTimeLocation(value);
              }}
            />
            <Button
              title="확인"
              btnSize="medium"
              textSize="medium"
              isGradient={true}
              isOutlined={false}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <View>
        <View style={styles.videoContainer}>
          <Video
            source={{uri: route.params.path}}
            style={styles.backgroundVideo}
            resizeMode={'contain'}
            repeat={true}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="위치설정"
            btnSize="medium"
            textSize="medium"
            isGradient={true}
            isOutlined={false}
            onPress={onStart}
          />
          <Button
            title="등록"
            btnSize="medium"
            textSize="medium"
            isGradient={true}
            isOutlined={false}
            onPress={goHome}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    height: Dimensions.get('screen').height * 0.8,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  blankSpace: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#000000',
    opacity: 0.8,
  },
  contentContainer: {
    height: Dimensions.get('screen').height * 0.4,
    width: Dimensions.get('screen').width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    backgroundColor: Colors.gray300,
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.3,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 10,
  },
  btnContainer: {
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'flex-end',
    marginBottom: '15%',
  },
});

export default CreateShortsScreen;
