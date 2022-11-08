import React, {Dispatch, SetStateAction, useState} from 'react';
import {View, StyleSheet, Text, Alert, ScrollView} from 'react-native';
import Input from '../Utils/Input';
import Button from '../Utils/Button';
import Colors from '../../constants/Colors';

const Tag = ({
  PheedTags,
  SetPheedTags,
}: {
  PheedTags: string[];
  SetPheedTags: Dispatch<SetStateAction<string[]>>;
}) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [tags, setTag] = useState<string[]>(PheedTags);
  const [show, setShow] = useState<boolean>(false);

  const submit = () => {
    if (enteredValue.trim()) {
      setTag(prevTags => {
        return [...prevTags, enteredValue];
      });
      SetPheedTags(prevTags => {
        return [...prevTags, enteredValue];
      });
    } else {
      Alert.alert('태그를 입력해주세요.');
    }
    setEnteredValue('');
  };

  const removeTag = (index: number): void => {
    const newTag = [...tags];
    newTag.splice(index, 1);
    setTag(newTag);
    SetPheedTags(newTag);
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
      <ScrollView horizontal style={styles.tagCt}>
        {tags.length === 0 ? (
          <Text style={styles.text}> #태그를 입력해주세요.</Text>
        ) : (
          tags.map((tag, index: number) => {
            return (
              <View key={index} style={styles.tag}>
                <Button
                  title={'#' + tag}
                  textSize="small"
                  btnSize="small"
                  isGradient={true}
                  isOutlined={true}
                  onPress={() => removeTag(index)}
                />
              </View>
            );
          })
        )}
      </ScrollView>
      {show === true ? (
        <View style={styles.inputCt}>
          <Input
            width={0.3}
            height={0.05}
            borderRadius={20}
            keyboard={1}
            placeholder="  #태그"
            enteredValue={enteredValue}
            setEnteredValue={setEnteredValue}
          />
          <View style={styles.btn}>
            <Button
              title="추가"
              btnSize="small"
              textSize="small"
              isGradient={true}
              isOutlined={false}
              onPress={submit}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
      <Button
        title="태그 +"
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
  tagCt: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 10,
  },
  tag: {
    marginLeft: 5,
  },
  detailtag: {
    color: Colors.purple300,
  },
});

export default Tag;
