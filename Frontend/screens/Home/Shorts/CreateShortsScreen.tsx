import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Video from 'react-native-video';
import Button from '../../../components/Utils/Button';
import Colors from '../../../constants/Colors';
import {RootStackParamList} from '../../../constants/types';
import data from '../../../components/Pheed/pheedData.json';
import {Picker} from 'react-native-wheel-pick';
import GestureRecognizer from 'react-native-swipe-gestures';
import MoreInfo from './MoreInfo';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateShorts'>;

const CreateShortsScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [timeLocation, setTimeLocation] = useState('');
  const [pheedValue, setPheedValue] = useState(0);
  const [index, setIndex] = useState<number | undefined>(undefined);

  const onStart = () => {
    setModalVisible(true);
  };
  const onClose = () => {
    setModalVisible(false);
  };

  const goHome = () => {
    navigation.navigate('MainPheed');
  };

  const dateTimeLocation = [];

  for (var i = 0; i < data.length; i++) {
    dateTimeLocation.push({
      label: data[i].datetime + ' ' + data[i].location,
      value: i,
    });
  }

  return (
    <>
      <GestureRecognizer
        onSwipeDown={onClose}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={modalVisible}>
          <View style={styles.container}>
            {/* <View
              style={styles.blankSpace}
              onTouchEnd={() => setModalVisible(false)}
            /> */}

            <View style={styles.contentContainer}>
              <Picker
                textColor={Colors.gray300}
                textSize={20}
                selectLineColor={Colors.gray300}
                selectLineSize={4}
                style={styles.picker}
                pickerData={dateTimeLocation}
                onValueChange={value => {
                  setPheedValue(value);
                }}
              />
              <Button
                title="확인"
                btnSize="medium"
                textSize="medium"
                isGradient={true}
                isOutlined={false}
                onPress={() => {
                  setModalVisible(false);
                  setTimeLocation(
                    data[pheedValue].datetime + ' ' + data[pheedValue].location,
                  );
                  setIndex(pheedValue);
                }}
              />
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
      <View>
        <View style={styles.videoContainer}>
          <Video
            // source={{
            //   uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            // }}
            source={{
              uri: route.params.path,
            }}
            style={styles.backgroundVideo}
            resizeMode={'contain'}
            repeat={true}
            fullscreen={true}
          />
        </View>
        <View style={styles.textContainerTop}>
          <View>
            <Text style={styles.boldtext}>APOLLON</Text>
            <Text style={styles.text}>
              {timeLocation === '' ? (
                <></>
              ) : (
                <Icon2
                  name="location-outline"
                  color={Colors.gray300}
                  size={16}
                />
              )}
              {timeLocation}
            </Text>
          </View>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon2 name="close" color={Colors.gray300} size={30} />
          </Pressable>
        </View>

        <View style={styles.textContainerBottom}>
          {index === undefined ? (
            <></>
          ) : (
            <View style={styles.goPheed}>
              <View>
                <Text style={styles.boldtext}>{data[index].title}</Text>
                <MoreInfo content={data[index].content} />
              </View>
              <Pressable>
                <Icon name="file-text" color={Colors.gray300} size={20} />
              </Pressable>
            </View>
          )}
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textContainerTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.black500,
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  textContainerBottom: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.black500,
    opacity: 0.8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 15,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  boldtext: {
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    color: Colors.gray300,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    color: Colors.gray300,
  },
  videoContainer: {
    height: Dimensions.get('screen').height,
  },
  backgroundVideo: {
    backgroundColor: Colors.purple300,
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
  closebar: {
    flex: 1,
    width: 100,
    height: Dimensions.get('screen').height * 0.001,
    backgroundColor: Colors.gray300,
    borderRadius: 20,
  },
  contentContainer: {
    height: Dimensions.get('screen').height * 0.3,
    width: Dimensions.get('screen').width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    border: '2px solid Colors.purple300',
    backgroundColor: Colors.black500,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '3%',
    paddingBottom: '5%',
  },
  picker: {
    flex: 1,
    backgroundColor: Colors.black500,
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.2,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    color: Colors.gray300,
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
  goPheed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default CreateShortsScreen;
