import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, ViewStyle} from 'react-native';
import CategoryBtn from './CategoryBtn';

const PHEED_CATEGORY = [
  {label: '음악', code: 1},
  {label: '댄스', code: 2},
  {label: '악기', code: 3},
  {label: '마술', code: 4},
  {label: '기타', code: 5},
];

const PheedCategory = ({CustomStyle}: {CustomStyle?: ViewStyle}) => {
  const [isactive, setIsActive] = useState<number>(1);
  return (
    <View style={[styles.buttons, CustomStyle]}>
      <ScrollView horizontal>
        {PHEED_CATEGORY.map(category => {
          return (
            <View style={styles.button} key={category.code}>
              <CategoryBtn
                title={category.label}
                code={category.code}
                isactive={isactive}
                setIsActive={setIsActive}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    width: '90%',
    height: 50,
    textAlign: 'center',
    marginLeft: '5%',
    marginTop: 10,
  },
  button: {
    marginRight: 10,
    alignSelf: 'center',
  },
});

export default PheedCategory;
