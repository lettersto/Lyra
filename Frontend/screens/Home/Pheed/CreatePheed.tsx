import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Dimensions} from 'react-native';
import Input from '../../../components/Utils/Input';
import DateTime from '../../../components/Pheed/DateTime';
import Colors from '../../../constants/Colors';
import Gallery from '../../../components/Pheed/Gallery';
import PheedCategory from '../../../components/Pheed/Category/PheedCategory';
import Tag from '../../../components/Pheed/Tag';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../components/Utils/Button';

const CreatePheed = () => {
  const [userData, setUserData] = useState('');

  const register = () => {
    setUserData(userData);
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <Gallery />
            <View style={styles.category}>
              <PheedCategory Category="phead" />
            </View>
            <View>
              <Input
                height={0.05}
                width={0.9}
                keyboard={1}
                borderRadius={10}
                placeholder="제목"
                maxLength={30}
              />
              <Input
                height={0.2}
                width={0.9}
                keyboard={1}
                borderRadius={10}
                placeholder="내용"
                customStyle={styles.inputMargin}
              />
            </View>
            <View style={styles.dateplace}>
              <DateTime />
              <DateTime />
            </View>
            <Tag />
            <View style={styles.registerBtn}>
              <Button
                title="등록"
                textSize="large"
                btnSize="medium"
                isGradient={true}
                isOutlined={false}
                onPress={register}
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  rootCt: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.black500,
    height: Dimensions.get('window').height,
    paddingTop: 15,
  },
  text: {
    color: 'white',
  },
  inputMargin: {
    marginTop: 10,
    marginBottom: 15,
  },
  dateplace: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: '5%',
    justifyContent: 'space-between',
  },
  category: {
    marginBottom: 15,
  },
  registerBtn: {
    marginTop: 10,
  },
});

export default CreatePheed;
