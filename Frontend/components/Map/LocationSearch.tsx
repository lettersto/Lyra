import React from 'react';
import {View} from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';

interface propsType {
  onPress:
    | ((data: GooglePlaceData, detail: GooglePlaceDetail | null) => void)
    | undefined;
}

const LocationSearch = ({onPress}: propsType) => {
  console.log(Config.REACT_APP_API_KEY);
  const homePlace = {
    description: 'Home',
    geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
  };
  return (
    <View style={{zIndex: 1}}>
      <GooglePlacesAutocomplete
        placeholder={'도로명 또는 지번으로 검색'}
        query={{key: Config.Google_API_KEY, language: 'ko'}}
        onPress={onPress}
        onFail={e => {
          // eslint-disable-next-line no-console
          console.log('GooglePlacesAutocomplete : ', e);
        }}
        styles={{
          container: {flex: 0},
        }}
        debounce={400}
        enablePoweredByContainer={false}
        fetchDetails={true}
        predefinedPlaces={[homePlace]}
      />
    </View>
  );
};

export default LocationSearch;
