import React, {Dispatch, SetStateAction} from 'react';
import {View, StyleSheet, ScrollView, ViewStyle} from 'react-native';
import CategoryBtn from './CategoryBtn';

const PHEED_CATEGORY = [
  {label: '음악', code: 'song'},
  {label: '댄스', code: 'dance'},
  {label: '악기', code: 'instrument'},
  {label: '예술', code: 'art'},
  {label: '기타', code: 'etc'},
];

const MAIN_CATEGORY = [
  {label: '전체', code: 'all'},
  {label: '음악', code: 'song'},
  {label: '댄스', code: 'dance'},
  {label: '악기', code: 'instrument'},
  {label: '예술', code: 'art'},
  {label: '기타', code: 'etc'},
];

const PheedCategory = ({
  CustomStyle,
  scrollStyle,
  Category,
  currentCategory,
  SetCurrentCategory,
}: {
  CustomStyle?: ViewStyle;
  scrollStyle?: ViewStyle;
  Category: string;
  currentCategory: string;
  SetCurrentCategory: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <View style={[styles.buttons, CustomStyle]}>
      <ScrollView
        horizontal
        style={scrollStyle}
        showsHorizontalScrollIndicator={false}>
        {Category === 'phead' ? (
          PHEED_CATEGORY.map(category => {
            return (
              <View style={styles.button} key={category.code}>
                <CategoryBtn
                  title={category.label}
                  code={category.code}
                  isactive={currentCategory}
                  setIsActive={SetCurrentCategory}
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
                  isactive={currentCategory}
                  setIsActive={SetCurrentCategory}
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
    textAlign: 'center',
    marginStart: 10,
    marginEnd: 10,
    marginVertical: 10,
  },
  button: {
    marginRight: 5,
    alignSelf: 'center',
  },
});

export default PheedCategory;
