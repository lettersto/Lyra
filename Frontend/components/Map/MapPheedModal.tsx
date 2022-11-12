import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeModal from 'react-native-modal';
import Colors from '../../constants/Colors';
import CircleProfile from '../Utils/CircleProfile';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {getPheedbyUser} from '../../api/pheed';
import Icon2 from 'react-native-vector-icons/Ionicons';

interface Props {
  userId: number | null;
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const MapPheedModal = ({userId, isModalVisible, setIsModalVisible}: Props) => {
  const gradientColors = [Colors.pink300, Colors.purple300];
  const navigation = useNavigation();
  const [contents, setContents] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getPheedbyUser(userId);
      // console.log(res);
      setContents(res.data);
    };
    fetch();
  });

  return (
    <ReactNativeModal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}>
      <View style={styles.backdrop}>
        <LinearGradient
          colors={[...gradientColors]}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 1.0}}
          style={styles.gradientContainer}>
          <View style={styles.modal}>
            <View style={styles.container}>
              <View style={styles.profileContainer}>
                <View style={styles.profileImg}>
                  <CircleProfile size="small" isGradient={false} />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.boldtext}>APOLLON</Text>
                  {/* <Text style={styles.boldtext}>{name}</Text> */}
                  <View style={styles.liveInfo}>
                    <View style={styles.dateContainer}>
                      <Icon
                        name="clock"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>시간</Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <Icon2
                        name="location-outline"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>장소</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Pressable onPress={() => {}}>
                <View style={styles.contentContainer}>
                  <Text style={styles.titleText}>타이틀</Text>
                  <Text style={styles.contentText}>
                    오랜만에 여수에 오니 좋네요. 오늘은 신청곡을 받아 연주할
                    예정입니다. 그리고 특별 게스트가 있습니다. 많이 기대해
                    주세요!
                  </Text>
                </View>
              </Pressable>
              <View style={styles.bottomContainer}>
                <View style={styles.viewerCnt}>
                  <Icon2
                    name="person-outline"
                    color={Colors.gray300}
                    size={20}
                  />
                  <Text style={styles.text}>22</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('Chat')}>
                  <Icon2
                    name="chatbubble-ellipses-outline"
                    color={Colors.gray300}
                    size={20}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ReactNativeModal>
  );
};
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  loadingtext: {
    flex: 1,
    top: '50%',
    textAlign: 'center',
    color: Colors.gray300,
  },
  text: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
  },
  boldtext: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
  },
  titleText: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  contentText: {
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    marginVertical: 5,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    padding: 1,
    borderRadius: 20,
  },
  modal: {
    width: deviceWidth * 0.9,
    height: deviceWidth * 0.5,
    borderRadius: 20,
    backgroundColor: Colors.black500,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  contentContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    margin: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  liveInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileDatetime: {
    flexDirection: 'row',
    left: 5,
    alignItems: 'center',
  },
  profileImg: {
    marginRight: 5,
  },
  profileInfo: {
    marginLeft: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: 1.5,
  },
  clock: {
    marginRight: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  viewerCnt: {flexDirection: 'row', alignItems: 'center'},
});

export default MapPheedModal;
