import React from 'react';
import {Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';

const EventModal = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      useAngle={true}
      angle={135}
      angleCenter={{x: 0.5, y: 0.5}}
      colors={[Colors.purple300, Colors.pink500]}>
      <Text style={styles.BackGround}>event page</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  BackGround: {
    height: '100%',
  },
});

export default EventModal;
