import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Text, Alert} from 'react-native';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';

import {
  ChatStackScreens,
  PheedStackScreens,
  PheedStackNavigationProps,
  BottomTabScreens,
  BottomTabNavigationProps,
} from '../../constants/types';
import Colors from '../../constants/Colors';

type navigationProp = CompositeNavigationProp<
  PheedStackNavigationProps,
  BottomTabNavigationProps
>;

const CreateButton = () => {
  const navigation = useNavigation<navigationProp>();
  const goPheed = () => {
    navigation.navigate(PheedStackScreens.CreatePheed);
  };
  const goChat = () => {
    navigation.navigate(BottomTabScreens.Chat, {
      screen: ChatStackScreens.MainChat,
    });
  };
  const pressHandler = () => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  // const [video, SetVideo] = useState<any>([]);

  const openPicker = async () => {
    try {
      const response = await ImagePicker.openPicker({
        mediaType: 'video',
      });

      if (response.duration !== null && response.duration > 30000) {
        Alert.alert('영상은 30초 미만의 길이만 가능합니다.');
      } else {
        navigation.navigate(PheedStackScreens.CreateShorts, {
          duration: response.duration,
          height: response.height,
          mime: response.mime,
          path: response.path,
          size: response.size,
          width: response.width,
        });
      }
    } catch (_err) {
      navigation.navigate(PheedStackScreens.MainPheed);
    }
  };

  const [active, setActive] = useState(true);

  return (
    <>
      {active ? (
        <Pressable onPress={pressHandler} style={styles.buttonContainer}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            useAngle={true}
            angle={135}
            angleCenter={{x: 0.5, y: 0.5}}
            colors={[Colors.purple300, Colors.pink500]}
            style={styles.button}>
            <Text style={styles.btnText}>+</Text>
          </LinearGradient>
        </Pressable>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable onPress={goChat}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              useAngle={true}
              angle={135}
              angleCenter={{x: 0.5, y: 0.5}}
              colors={[Colors.purple300, Colors.pink500]}
              style={styles.button2}>
              <Text style={styles.pheedText}>채팅</Text>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={openPicker}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              useAngle={true}
              angle={135}
              angleCenter={{x: 0.5, y: 0.5}}
              colors={[Colors.purple300, Colors.pink500]}
              style={styles.button2}>
              <Text style={styles.storyText}>스트릿</Text>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={goPheed}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              useAngle={true}
              angle={135}
              angleCenter={{x: 0.5, y: 0.5}}
              colors={[Colors.purple300, Colors.pink500]}
              style={styles.button2}>
              <Text style={styles.pheedText}>피드</Text>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={pressHandler}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              useAngle={true}
              angle={135}
              angleCenter={{x: 0.5, y: 0.5}}
              colors={[Colors.purple300, Colors.pink500]}
              style={styles.button2}>
              <Text style={styles.closeText}>x</Text>
            </LinearGradient>
          </Pressable>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  button2: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 10,
  },
  btnText: {
    alignSelf: 'center',
    fontSize: 42,
  },
  pheedText: {
    alignSelf: 'center',
    marginTop: 19,
    fontSize: 20,
    fontFamily: 'NanumSquareRoundR',
  },
  storyText: {
    alignSelf: 'center',
    marginTop: 19,
    fontSize: 18,
    fontFamily: 'NanumSquareRoundR',
  },
  closeText: {
    alignSelf: 'center',
    marginTop: 9,
    fontSize: 28,
    fontFamily: 'NanumSquareRoundR',
    fontWeight: 'bold',
  },
});

export default CreateButton;
