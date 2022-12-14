import React, {useContext} from 'react';
import {StyleSheet, Text, Dimensions, Pressable} from 'react-native';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {PheedMapContext} from '../../store/pheedMap-context';

const Location = ({pheedMapLocation}: {pheedMapLocation: string}) => {
  const navigation = useNavigation();
  const {pheedMapLocationAddInfo} = useContext(PheedMapContext);

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
        <Pressable
          onPress={() => {
            // setModalVisible(true);
            navigation.navigate('LocationSearch');
          }}>
          <Text style={styles.text}>
            <Icon name="location" color={Colors.gray300} size={20} />
            {pheedMapLocationAddInfo === '' ? (
              pheedMapLocation === '' ? (
                <Text>장소</Text>
              ) : (
                <Text> {pheedMapLocation}</Text>
              )
            ) : (
              <Text> {pheedMapLocationAddInfo}</Text>
            )}
          </Text>
          {/* <LocationModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            text={text}
            onChangeText={onChangeText}
          /> */}
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

export default Location;
