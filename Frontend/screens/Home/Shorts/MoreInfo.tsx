import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

import MIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../constants/Colors';

const MoreInfo = ({content}: {content: string}) => {
  const [moreIsOpen, setMoreIsOpen] = useState(false);
  // TODO 글자 수 몇에서 컷할지 생각 필요
  let cuttedText = content;
  let isCutted = false;

  if (content?.length > 30) {
    isCutted = true;
    cuttedText = content.substring(0, 30);
  }

  const pressHandler = () => {
    setMoreIsOpen(prevState => !prevState);
  };

  return (
    <>
      <View style={styles.textContainer}>
        {!moreIsOpen && (
          <Text style={[styles.text, styles.content]}>{`${cuttedText} ${
            isCutted && !moreIsOpen ? '...' : ''
          }`}</Text>
        )}
        {isCutted && moreIsOpen ? (
          <Text style={[styles.text, styles.content]}>{content}</Text>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: '100%',
  },
  text: {
    color: Colors.gray300,
    flexDirection: 'row',
    fontFamily: 'NanumSquareRoundR',
    fontSize: 12,
  },
  content: {
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MoreInfo;
