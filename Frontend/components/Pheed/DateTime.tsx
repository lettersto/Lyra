import React, {useState} from 'react';
import {StyleSheet, Text, Dimensions, Pressable, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Feather';

const DateTime = () => {
  const [isDatePickerVisible, setDatePickerVIsibility] = useState(false);
  const [text, onChangeText] = useState<string>();

  function sliceYear(num: number) {
    return num.toString().slice(2, 4);
  }

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  const showDatePicker = () => {
    setDatePickerVIsibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVIsibility(false);
  };

  const handleCofirm = (date: Date) => {
    if (date <= new Date()) {
      Alert.alert('현재보다 이후 시간을 선택해주세요.');
    } else {
      onChangeText(
        [sliceYear(date.getFullYear())] +
          '.' +
          [padTo2Digits(date.getMonth())] +
          '.' +
          [padTo2Digits(date.getDate())] +
          ' ' +
          [padTo2Digits(date.getHours())] +
          ':' +
          [padTo2Digits(date.getMinutes())],
      );
    }
    hideDatePicker();
  };

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        useAngle={true}
        angle={135}
        angleCenter={{x: 0.5, y: 0.5}}
        colors={[Colors.purple300, Colors.pink500]}
        style={styles.gradient}>
        <Pressable onPress={showDatePicker}>
          <Text style={styles.text}>
            {text === undefined ? (
              <>
                <Icon name="clock" color={Colors.gray300} size={16} />
                <Text> 시간</Text>
              </>
            ) : (
              <>
                <Icon name="clock" color={Colors.gray300} size={16} />
                <Text> {text}</Text>
              </>
            )}
          </Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleCofirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
          />
        </Pressable>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.05,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.gray300,
    height: Dimensions.get('window').height * 0.05 - 2,
    width: Dimensions.get('window').width * 0.4 - 2,
    backgroundColor: Colors.black500,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default DateTime;
