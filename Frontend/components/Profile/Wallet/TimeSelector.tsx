import React, {useState, Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FIcon from 'react-native-vector-icons/Feather';

import Colors from '../../../constants/Colors';

const TimeSelector = ({
  time,
  content,
  setTime,
}: {
  time: Date | undefined;
  setTime: Dispatch<SetStateAction<Date | undefined>>;
  content: string;
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const _today = new Date();
  const today = new Date(_today.getTime() + 9 * 60 * 60 * 1000);

  const confirmHandler = (enteredDate: Date) => {
    setTime(enteredDate);
    setDatePickerVisibility(false);
  };

  const textStyle = {
    color: time ? Colors.pink300 : Colors.white300,
    marginLeft: 8,
    fontSize: 16,
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={confirmHandler}
        onCancel={() => setDatePickerVisibility(true)}
        maximumDate={today}
      />
      <Pressable
        style={styles.container}
        onPress={() => setDatePickerVisibility(true)}>
        <FIcon name="clock" size={18} color={Colors.pink300} />
        <Text style={textStyle}>{content}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    marginBottom: 4,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.white300,
  },
});

export default React.memo(TimeSelector);
