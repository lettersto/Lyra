import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, Dimensions} from 'react-native';
import Input from '../../../components/Utils/Input';
import DateTime from '../../../components/Pheed/DateTime';
import Colors from '../../../constants/Colors';

const CreatePheed = () => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.text}>Create Pheed</Text>
          <Text style={styles.text}>Title</Text>
          <Input height={0.05} width={0.8} keyboard={1} borderRadius={10} />
          <Text style={styles.text}>Content</Text>
          <Input height={0.2} width={0.8} keyboard={2} borderRadius={10} />
          <Text style={styles.text}>Content</Text>
          <DateTime />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black500,
    height: Dimensions.get('window').height,
  },
  text: {
    color: 'white',
  },
});

export default CreatePheed;
