import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, Pressable, Text, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {KeyboardTypeOptions} from 'react-native';

import {RootStackParamList} from '../../constants/types';
import {EditProfileType} from '../../constants/types';
import Colors from '../../constants/Colors';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

interface editProfileObj {
  [key: string]: {
    title: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
  };
}

const EditProfileScreen = ({route, navigation}: Props) => {
  const editProfileMode: EditProfileType = route.params.editProfileMode;

  const modeToScreenTitle: editProfileObj = {
    nickname: {
      title: '닉네임 변경',
      placeholder: '새 닉네임을 작성하세요.',
      keyboardType: 'default',
    },
    introduction: {
      title: '소개 변경',
      placeholder: '새 소개글을 작성하세요.',
      keyboardType: 'default',
    },
    bank: {
      title: '은행 변경',
      placeholder: '은행 이름을 작성하세요.',
      keyboardType: 'default',
    },
    account: {
      title: '계좌번호 변경',
      placeholder: '새 계좌번호를 작성하세요.',
      keyboardType: 'decimal-pad',
    },
    holder: {
      title: '예금주 변경',
      placeholder: '새 예금주 이름을 작성하세요.',
      keyboardType: 'default',
    },
  };

  const {title, placeholder, keyboardType} = modeToScreenTitle[editProfileMode];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          multiline={true}
          placeholder={placeholder}
          placeholderTextColor={Colors.white300}
          style={[styles.text, styles.input]}
          keyboardType={keyboardType}
        />
        <Pressable
          style={({pressed}) => {
            return pressed ? [styles.button, styles.pressed] : styles.button;
          }}>
          <Text style={[styles.text, styles.buttonText]}>변경</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 8,
  },
  input: {
    justifyContent: 'flex-start',
    flexBasis: '83%',
    borderBottomColor: Colors.pink500,
    borderBottomWidth: 1,
  },
  button: {
    flexBasis: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginVertical: 4,
    borderRadius: 8,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
  },
  buttonText: {
    color: Colors.pink500,
  },
  pressed: {
    backgroundColor: Colors.white300,
  },
});

export default EditProfileScreen;
