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

const MAIN_CATEGORY = [
  {label: '전체', code: 1},
  {label: '음악', code: 2},
  {label: '댄스', code: 3},
  {label: '악기', code: 4},
  {label: '마술', code: 5},
  {label: '기타', code: 6},
];

const PheedCategory = ({
  CustomStyle,
  scrollStyle,
  Category,
}: {
  CustomStyle?: ViewStyle;
  scrollStyle?: ViewStyle;
  Category: string;
}) => {
  const [isactive, setIsActive] = useState<number>(1);

  return (
    <View style={[styles.buttons, CustomStyle]}>
      <ScrollView horizontal style={scrollStyle}>
        {Category === 'phead' ? (
          PHEED_CATEGORY.map(category => {
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
          })
        ) : (
          <></>
        )}
        {Category === 'main' ? (
          MAIN_CATEGORY.map(category => {
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
          })
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    width: '90%',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    margin: 5,
    alignSelf: 'center',
  },
});

export default PheedCategory;
