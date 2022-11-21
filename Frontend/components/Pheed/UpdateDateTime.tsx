import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Alert,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Feather';

const UpDateTime = ({
  pheedDate,
  SetDate,
}: {
  pheedDate: Date;
  SetDate: Dispatch<SetStateAction<Date>>;
}) => {
  const [isDatePickerVisible, setDatePickerVIsibility] = useState(false);
  const [changeDate, onChangeDate] = useState<Date>();
  const [text, onChangeText] = useState<string>('');

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

  const handleConfirm = (date: Date) => {
    if (date <= new Date()) {
      Alert.alert('현재보다 이후 시간을 선택해주세요.');
    } else {
      onChangeDate(date);
      onChangeText(
        [sliceYear(date.getFullYear())] +
          '-' +
          [padTo2Digits(date.getMonth() + 1)] +
          '-' +
          [padTo2Digits(date.getDate())] +
          ' ' +
          [padTo2Digits(date.getHours())] +
          ':' +
          [padTo2Digits(date.getMinutes())],
      );
      SetDate(date);
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
          <View style={styles.container}>
            {changeDate !== undefined ? (
              //수정후
              <View style={styles.text}>
                <Icon
                  name="clock"
                  color={Colors.gray300}
                  size={16}
                  style={styles.icon}
                />
                <Text style={styles.dateText}>{text}</Text>
              </View>
            ) : (
              //수정전
              <View style={styles.text}>
                <Icon
                  name="clock"
                  color={Colors.gray300}
                  size={16}
                  style={styles.icon}
                />
                <Text style={styles.dateText}>
                  {[sliceYear(pheedDate.getFullYear())] +
                    '-' +
                    [padTo2Digits(pheedDate.getMonth() + 1)] +
                    '-' +
                    [padTo2Digits(pheedDate.getDate())] +
                    ' ' +
                    [padTo2Digits(pheedDate.getHours())] +
                    ':' +
                    [padTo2Digits(pheedDate.getMinutes())]}
                </Text>
              </View>
            )}
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
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
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.gray300,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  container: {
    height: Dimensions.get('window').height * 0.05 - 2,
    width: Dimensions.get('window').width * 0.4 - 2,
    backgroundColor: Colors.black500,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    marginRight: 5,
    color: Colors.gray300,
    alignSelf: 'center',
  },
  dateText: {
    color: Colors.gray300,
  },
});

export default UpDateTime;
