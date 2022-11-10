import React, {useLayoutEffect, useState, useContext} from 'react';
import {
  KeyboardTypeOptions,
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useMutation, useQueryClient} from 'react-query';

import {AuthContext} from '../../store/auth-context';
import {updateUserInfo} from '../../api/profile';
import {ProfileStackRouteProps, UserProfileType} from '../../constants/types';
import Colors from '../../constants/Colors';
import LoadingSpinner from '../../components/Utils/LoadingSpinner';
import ModalWithButton from '../../components/Utils/ModalWithButton';

interface editProfileObj {
  [key: string]: {
    title: string;
    placeholder: string;
    modalText: string;
    keyboardType: KeyboardTypeOptions;
    // pressHandler: (event: GestureResponderEvent) => void;
  };
}

const EditProfileScreen = () => {
  const {userId} = useContext(AuthContext);
  const route = useRoute<ProfileStackRouteProps>();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    mutate: userInfoMutate,
    isLoading: userInfoIsLoading,
    // isError,
  } = useMutation(updateUserInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('userProfile');
      navigation.goBack();
    },
  });

  const mode = route.params?.param!;
  const modeToScreenTitle: editProfileObj = {
    nickname: {
      title: '닉네임 변경',
      placeholder: '새 닉네임을 작성하세요.',
      keyboardType: 'default',
      modalText: '닉네임을 변경하시겠습니까?',
    },
    introduction: {
      title: '소개 변경',
      placeholder: '새 소개글을 작성하세요.',
      keyboardType: 'default',
      modalText: '소개글을 변경하시겠습니까?',
    },
    bank: {
      title: '은행 변경',
      placeholder: '은행 이름을 작성하세요.',
      keyboardType: 'default',
      modalText: '은행을 변경하시겠습니까?',
    },
    account: {
      title: '계좌번호 변경',
      placeholder: '새 계좌번호를 작성하세요.',
      keyboardType: 'decimal-pad',
      modalText: '계좌 번호를 변경하시겠습니까?',
    },
    holder: {
      title: '예금주 변경',
      placeholder: '새 예금주 이름을 작성하세요.',
      keyboardType: 'default',
      modalText: '예금주를 변경하시겠습니까?',
    },
  };

  const {title, placeholder, keyboardType, modalText} = modeToScreenTitle[mode];

  const changeTextHandler = (text: string) => {
    if (text.trim()) {
      setEnteredValue(text);
      return;
    }
    setEnteredValue('');
  };

  const pressHandler = () => {
    if (enteredValue) {
      const {bank, account, nickname, introduction} = queryClient.getQueryData(
        'userProfile',
      ) as UserProfileType;
      const prevInfo = {
        userId: userId!,
        bank,
        account,
        nickname,
        introduction,
      };
      const updatedInfo = {...prevInfo, [mode]: enteredValue.trim()};
      return userInfoMutate(updatedInfo);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title, navigation]);

  const isLoading = userInfoIsLoading;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingSpinner
          animating={isLoading}
          size="large"
          color={Colors.purple300}
        />
      ) : null}
      <ModalWithButton
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        leftText="취소하기"
        rightText="변경하기"
        onLeftPress={() => setIsModalVisible(false)}
        onRightPress={pressHandler}>
        <Text style={[styles.text, styles.modalText]}>{modalText}</Text>
      </ModalWithButton>
      <View style={styles.innerContainer}>
        <TextInput
          multiline={true}
          placeholder={placeholder}
          placeholderTextColor={Colors.white300}
          style={[styles.text, styles.input]}
          keyboardType={keyboardType}
          value={enteredValue}
          onChangeText={changeTextHandler}
        />
        <Pressable
          onPress={() => setIsModalVisible(true)}
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
    color: 'white',
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
  modalText: {
    fontSize: 18,
    color: Colors.pink500,
  },
});

export default EditProfileScreen;
