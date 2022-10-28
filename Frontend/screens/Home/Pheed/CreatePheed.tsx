import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';
import Input from '../../../components/Utils/Input';
import DateTime from '../../../components/Pheed/DateTime';
import Colors from '../../../constants/Colors';
import Gallery from '../../../components/Pheed/Gallery';
import PheedCategory from '../../../components/Pheed/Category/PheedCategory';
import Tag from '../../../components/Pheed/Tag';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreatePheed = () => {
  return (
    <>
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <Text style={styles.text}>Create Pheed</Text>
            <Gallery />
            <PheedCategory />
            <View style={styles.inputCt}>
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
    // height: 500,
    height: Dimensions.get('window').height,
    paddingTop: 10,
  },
  text: {
    color: 'white',
  },
  inputCt: {
    margin: 15,
  },
  inputMargin: {
    marginTop: 15,
  },
  dateplace: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: '5%',
    justifyContent: 'space-between',
  },
});

export default CreatePheed;
