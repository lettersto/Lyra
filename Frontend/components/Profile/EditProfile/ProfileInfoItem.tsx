import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';

import GradientLine from '../../Utils/GradientLine';
import Colors from '../../../constants/Colors';

const ProfileInfoItem = ({
  title,
  content,
  placeHolder,
  onLongPress,
}: {
  title?: string;
  content: string;
  placeHolder?: string;
  onLongPress: () => void;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const pressInHandler = () => setIsPressed(true);
  const pressOutHandler = () => setIsPressed(false);

  const textColor = {color: content ? Colors.gray300 : Colors.white300};

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.text, styles.title]}>{title}</Text>
      </View>
      <Pressable
        style={[styles.contentContainer]}
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
        onLongPress={onLongPress}>
        {isPressed && <View style={styles.pressed} />}
        <Text style={[styles.text, styles.content, textColor]}>
          {content ? content : placeHolder}
        </Text>
        {/* <GradientLine /> */}
      </Pressable>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    flexDirection: 'row',
  },
  titleContainer: {
    flexBasis: '25%',
    justifyContent: 'center',
  },
  contentContainer: {
    position: 'relative',
    flexBasis: '75%',
    paddingVertical: 8,
  },
  pressed: {
    position: 'absolute',
    width: '98%',
    height: '100%',
    backgroundColor: Colors.black300,
    borderRadius: 4,
  },
  text: {
    minHeight: 40,
    paddingBottom: 4,
    paddingRight: 4,
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    zIndex: 100,
  },
  title: {
    textAlign: 'center',
    color: Colors.pink500,
  },
  content: {
    marginLeft: 8,
  },
});

export default ProfileInfoItem;
