import React, {useState} from 'react';
import {View, Alert, StyleSheet, Image, ScrollView} from 'react-native';
import Colors from '../../constants/Colors';
import Button from '../Utils/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

const Gallery = () => {
  const [Photos, SetPhotos] = useState<any[]>([]);
  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        usedCameraButton: false,
        selectedAssets: [],
        maxSelectedAssets: 5,
      });
      SetPhotos(response);
    } catch (e) {
      Alert.alert('error');
    }
  };

  return (
    <>
      <View>
        <ScrollView horizontal style={styles.viewCt}>
          <View style={styles.selectImg}>
            <Icon
              name="file-image-plus-outline"
              color={Colors.gray300}
              size={30}
              style={styles.imgIcon}
            />
            <Button
              title="업로드"
              btnSize="medium"
              textSize="large"
              isGradient={true}
              isOutlined={false}
              onPress={openPicker}
              customStyle={styles.button}
            />
          </View>
          {Photos.length === 0 ? (
            <></>
          ) : (
            <>
              {Photos.map(photo => (
                <Image
                  source={{uri: photo.path}}
                  style={styles.imgCnt}
                  key={photo.path}
                />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  viewCt: {
    marginStart: 20,
    marginEnd: 20,
  },
  text: {
    color: 'white',
  },
  imgCnt: {
    width: 150,
    height: 150,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 20,
  },
  button: {
    width: 100,
  },
  selectImg: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.purple300,
    borderRadius: 20,
  },
  imgIcon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default Gallery;
