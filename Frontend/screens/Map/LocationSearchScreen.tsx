import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Colors from '../../constants/Colors';
import {MAP_KEY} from '../../.env';

const LocationSearchScreen = () => {
  const [location, setLocation] = useState({
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  return (
    <>
      <View style={styles.body}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>도로명 또는 지번으로 검색</Text>
          <View>
            <GooglePlacesAutocomplete
              placeholder={'Location'}
              query={{
                key: MAP_KEY,
                language: 'en',
              }}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              styles={{container: {flex: 0}}}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default LocationSearchScreen;

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
