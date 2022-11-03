import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/Colors';

const TownSearchScreen = () => {
  return (
    <>
      <View style={styles.body}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>도로명 또는 지번으로 검색</Text>
        </View>
      </View>
    </>
  );
};

export default TownSearchScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: Colors.gray300,
    margin: 20,
  },
  location: {
    position: 'absolute',
    width: '90%',
    borderBottomWidth: 0,
  },
});
