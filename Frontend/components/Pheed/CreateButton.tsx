import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';

const CreateButton = () => {
  const navigation = useNavigation();
  const goPheed = () => {
    navigation.navigate('CreatePheed');
  };
  const goChat = () => {
    navigation.navigate('Chat');
  };
  const pressHandler = () => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
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
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            useAngle={true}
            angle={135}
            angleCenter={{x: 0.5, y: 0.5}}
            colors={[Colors.purple300, Colors.pink500]}
            style={styles.button2}>
            <Text style={styles.storyText}>스토리</Text>
          </LinearGradient>
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
