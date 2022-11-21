import React, {Dispatch, SetStateAction, useState} from 'react';
import {View, StyleSheet, Text, Alert, ScrollView, Modal} from 'react-native';
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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const submit = () => {
    if (enteredValue.trim()) {
      setTag(prevTags => {
        return [...prevTags, enteredValue];
      });
      SetPheedTags(prevTags => {
        return [...prevTags, enteredValue];
      });
    } else {
      setIsModalVisible(true);
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
      <Modal
        style={styles.modal}
        transparent={true}
        animationType="fade"
        visible={isModalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.titleWarning}>태그를 입력해주세요.</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="확인"
                btnSize="medium"
                textSize="medium"
                isGradient={true}
                isOutlined={false}
                onPress={() => setIsModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
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
      <View style={styles.tagContainer}>
        {show === true ? (
          <View style={styles.inputCt}>
            <Input
              width={0.3}
              height={0.05}
              borderRadius={10}
              keyboard={1}
              placeholder="#태그"
              enteredValue={enteredValue}
              setEnteredValue={setEnteredValue}
              maxLength={10}
            />
            <View style={styles.btn}>
              <Button
                title="추가"
                btnSize="small"
                textSize="medium"
                isGradient={true}
                isOutlined={false}
                onPress={submit}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
        {show ? (
          <Button
            title="닫기"
            btnSize="small"
            textSize="medium"
            isGradient={true}
            isOutlined={true}
            onPress={showInput}
          />
        ) : (
          <Button
            title="태그 추가"
            btnSize="small"
            textSize="medium"
            isGradient={true}
            isOutlined={true}
            onPress={showInput}
          />
        )}
      </View>
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
    marginLeft: '5%',
  },
  btn: {
    marginHorizontal: 10,
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
  modal: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020ee',
  },
  modalContainer: {
    backgroundColor: Colors.black500,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '20%',
    borderColor: Colors.purple300,
    borderWidth: 1,
  },
  titleWarning: {
    marginVertical: 5,
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'relative',
    marginTop: 15,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Tag;
