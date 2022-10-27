import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Input from '../../../components/Utils/Input';

const CreatePheed = () => {
  return (
    <>
      <SafeAreaView>
        <Text>Create Pheed</Text>
        <Text>Title</Text>
        <Input height={0.05} width={0.8} keyboard={1} />
        <Text>Content</Text>
        <Input height={0.2} width={0.8} keyboard={2} />
      </SafeAreaView>
    </>
  );
};

export default CreatePheed;
