import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeModal from 'react-native-modal';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Feather';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {getPheedDetail} from '../../api/pheed';
import {
  PheedDetailParamList,
  BottomTabNavigationProps,
  BottomTabScreens,
  MapStackNavigationProps,
  ChatStackScreens,
  PheedStackScreens,
} from '../../constants/types';
import ProfilePhoto from '../Utils/ProfilePhoto';
import Button from '../Utils/Button';
import {ChatContext} from '../../store/chat-context';

type navigationProps = CompositeNavigationProp<
  BottomTabNavigationProps,
  MapStackNavigationProps
>;

interface Props {
  pheedId: number | null;
  isModalVisible: boolean;
  setPheedId: Dispatch<SetStateAction<number | null>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const MapPheedModal = ({
  pheedId,
  setPheedId,
  isModalVisible,
  setIsModalVisible,
}: Props) => {
  const gradientColors = [Colors.pink300, Colors.purple300];
  const navigation = useNavigation<navigationProps>();
  const [pheed, setPheed] = useState<PheedDetailParamList>();
  const [userCnt, setUserCnt] = useState(0);
  const {socket} = useContext(ChatContext);

  useEffect(() => {
    const fetch = async () => {
      socket!.on('fetch user', (num: number) => {
        setUserCnt(num);
      });
      const res = await getPheedDetail(pheedId);
      setPheed(res);
      console.log(res.userId);
      socket!.emit('fetch user', res.userId);
    };
    fetch();
  }, [pheedId, socket]);

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
          {pheed && (
            <View style={styles.modal}>
              <View style={styles.container}>
                <View style={styles.profileContainer}>
                  <View style={styles.profileImg}>
                    <ProfilePhoto
                      profileUserId={pheed.userId}
                      imageURI={pheed.userImage_url}
                      grade="hot"
                      size="small"
                      isGradient={true}
                    />
                  </View>
                  <View style={styles.profileInfo}>
                    <Text style={styles.boldtext}>{pheed!.userNickname}</Text>
                    {/* <View style={styles.liveInfo}> */}
                    <View style={styles.dateContainer}>
                      <Icon
                        name="clock"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{pheed!.startTime}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <Icon2
                        name="location-outline"
                        color={Colors.gray300}
                        size={16}
                        style={styles.clock}
                      />
                      <Text style={styles.text}>{pheed.location}</Text>
                    </View>
                    {/* </View> */}
                  </View>
                </View>
                <Pressable
                  onPress={() => {
                    setPheedId(null);
                    setIsModalVisible(false);
                    navigation.navigate(BottomTabScreens.Home, {
                      screen: PheedStackScreens.DetailPheed,
                      params: {pheedId: pheed.pheedId},
                    });
                  }}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.titleText}>{pheed!.title}</Text>
                    <Text style={styles.contentText}>{pheed!.content}</Text>
                  </View>
                </Pressable>
                <View style={styles.bottomContainer}>
                  <View style={styles.viewerCnt}>
                    <Icon2
                      name="person-outline"
                      color={Colors.gray300}
                      size={20}
                    />
                    <Text style={styles.text}>{userCnt}</Text>
                  </View>
                  <Button
                    title="LIVE"
                    btnSize="small"
                    textSize="small"
                    isGradient={true}
                    isOutlined={false}
                    onPress={() => {
                      navigation.navigate(BottomTabScreens.Chat, {
                        screen: ChatStackScreens.MainChat,
                        params: {
                          buskerId: pheed.userId,
                          buskerNickname: pheed.userNickname,
                          buskerImg: pheed.userImage_url,
                        },
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    </ReactNativeModal>
  );
};
const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

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
    borderRadius: 20,
    backgroundColor: Colors.black500,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  contentContainer: {
    width: deviceWidth * 0.85,
    alignItems: 'flex-start',
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
    alignItems: 'flex-end',
    width: '100%',
  },
  viewerCnt: {flexDirection: 'row', alignItems: 'center'},
});

export default MapPheedModal;
