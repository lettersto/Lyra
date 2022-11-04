import React, {useState} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import LiveStateBtn from './LiveStateBtn';

const LIVE_CATEGORY = [
  {label: '인기공연', code: 1},
  {label: '공연중', code: 2},
  {label: '공연예정', code: 3},
  {label: '공연완료', code: 4},
];

const LiveCategory = ({
  CustomStyle,
}: {
  CustomStyle?: ViewStyle;
  scrollStyle?: ViewStyle;
}) => {
  const [isactive, setIsActive] = useState<number>(1);

  return (
    <View style={[styles.buttons, CustomStyle]}>
      {LIVE_CATEGORY.map(category => {
        return (
          <View style={styles.button} key={category.code}>
            <LiveStateBtn
              title={category.label}
              code={category.code}
              isactive={isactive}
              setIsActive={setIsActive}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    width: '90%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: 5,
    alignSelf: 'center',
  },
});

export default LiveCategory;
