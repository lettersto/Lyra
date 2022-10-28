import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Modal as ReactModal,
  KeyboardAvoidingView,
} from 'react-native';
import Input from '../Utils/Input';
import Button from '../Utils/Button';

interface ITodo {
  text: string;
}

const Tag = () => {
  const [value, setValue] = useState<string>('');
  const [tags, setTag] = useState<ITodo[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const submit = () => {
    if (value.trim()) {
      setTag([...tags, {text: value}]);
    }
    setValue('');
  };

  const removeTag = (index: number): void => {
    const newTag = [...tags];
    newTag.splice(index, 1);
    setTag(newTag);
  };

  const showInput = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <View style={styles.container}>
      {tags.length === 0 && (
        <Text style={styles.text}>#태그를 입력해주세요.</Text>
      )}
      {tags.map((tag: ITodo, index: number) => {
        <View key={index}>
          <Text> {tag.text}</Text>
        </View>;
      })}
      {show === true ? (
        <View style={styles.inputCt}>
          <Input
            width={0.4}
            height={0.05}
            borderRadius={10}
            keyboard={1}
            placeholder="태그"
            value={value}
          />
          <View style={styles.btn}>
            <Button
              title="추가"
              btnSize="small"
              textSize="small"
              isGradient={true}
              isOutlined={false}
              onPress={() => {
                submit;
              }}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
      <Button
        title="+"
        btnSize="small"
        textSize="medium"
        isGradient={true}
        isOutlined={true}
        onPress={showInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  text: {
    color: 'white',
  },
  inputCt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btn: {
    marginLeft: 10,
  },
});

export default Tag;
