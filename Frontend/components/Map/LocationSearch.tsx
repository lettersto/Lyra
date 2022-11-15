import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';
import Colors from '../../constants/Colors';

interface propsType {
  onPress:
    | ((data: GooglePlaceData, detail: GooglePlaceDetail | null) => void)
    | undefined;
}

const LocationSearch = ({onPress}: propsType) => {
  const homePlace = {
    description: 'Home',
    geometry: {location: {lat: 37.513, lng: 127.103}},
  };
  return (
    <View style={styles.view}>
      <GooglePlacesAutocomplete
        placeholder={'도로명 또는 지번으로 검색'}
        query={{key: Config.GOOGLE_API_KEY, language: 'ko'}}
        onPress={onPress}
        onFail={e => {
          // eslint-disable-next-line no-console
          console.log('GooglePlacesAutocomplete : ', e);
        }}
        styles={{
          textInputContainer: {},
          textInput: {
            width: '100%',
            backgroundColor: Colors.black500,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: Colors.pink500,
            fontSize: 16,
            paddingHorizontal: 8,
            flex: 1,
            color: Colors.gray300,
          },
          container: {
            flex: 0,
            backgroundColor: Colors.black500,
            paddingHorizontal: 10,
          },
          description: {color: Colors.gray300},
          row: {
            backgroundColor: Colors.black500,
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          separator: {
            height: 0.5,
            backgroundColor: Colors.pink500,
          },
        }}
        debounce={400}
        enablePoweredByContainer={false}
        fetchDetails={true}
        predefinedPlaces={[homePlace]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  view: {zIndex: 1},
});

export default LocationSearch;
