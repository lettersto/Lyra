import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

const MoreInfo = ({content, pheedId}: {content: string; pheedId: number}) => {
  const navigation = useNavigation();
  const [moreIsOpen, setMoreIsOpen] = useState(false);
  // TODO 글자 수 몇에서 컷할지 생각 필요
  let cuttedText = content;
  let isCutted = false;

  if (content.length > 35) {
    isCutted = true;
    cuttedText = content.substring(0, 35);
  }

  const goDetail = () => {
    navigation.navigate('DetailPheed', {pheedId: pheedId});
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
        {isCutted && (
          <View style={styles.buttonContainer}>
            <Pressable onPress={goDetail} style={styles.button}>
              <Text style={styles.text}>더보기</Text>
            </Pressable>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.gray300,
    flexDirection: 'row',
    fontFamily: 'NanumSquareRoundR',
    fontSize: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  content: {
    fontSize: 14,
  },
  buttonContainer: {
    // width: '100%',
  },
  button: {
    paddingVertical: 4,
    flexDirection: 'row',
  },
});

export default MoreInfo;
