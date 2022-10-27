import React from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';

import GradientLine from '../../Utils/GradientLine';
import Colors from '../../../constants/Colors';

const ProfileInfoItem = ({
  title,
  content,
  placeHolder,
}: {
  title?: string;
  content: string;
  placeHolder?: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.text, styles.title]}>{title}</Text>
      </View>
      <Pressable style={styles.contentContainer}>
        <Text style={[styles.text, styles.content]}>
          {content ? content : placeHolder}
        </Text>
        <GradientLine />
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
    flexBasis: '75%',
    paddingVertical: 8,
  },
  text: {
    minHeight: 40,
    paddingBottom: 4,
    paddingRight: 4,
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: Colors.gray300,
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
