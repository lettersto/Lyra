import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {forwardRef} from 'react';

interface propsType {
  styles: object;
  onPress: (event: GestureResponderEvent) => void;
  // isLoading: boolean;
  // isSelected?: boolean;
  // iconVisible: boolean;
}

const LocationSearch = ({
  styles,
  onPress,
  isLoading,
}: // isSelected,
// iconVisible,
propsType) => {
  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <GooglePlacesAutocomplete
        placeholder={'Location'}
        query={{key: 'AIzaSyCggKeXOHi8_SSLeBMH12DaN2URuvkV_yM', language: 'ko'}}
        onPress={onPress}
        onFail={e => {
          // eslint-disable-next-line no-console
          console.log('GooglePlacesAutocomplete : ', e);
        }}
        styles={{
          container: {flex: 0},
          textInput: {paddingLeft: iconVisible ? 30 : 10},
        }}
        debounce={400}
        enablePoweredByContainer={false}
        textInputProps={{editable: !isLoading}}
        fetchDetails={true}
      />

      {/* {iconVisible && (
          <View style={[defaultStyles.icon, styles?.icon]}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={isSelected ? PRIMARY.DEFAULT : GRAY.DARK}
            />
          </View>
        )} */}
    </View>
  );
};
LocationSearch.displayName = 'LocationSearch';

LocationSearch.defaultProps = {
  iconVisible: true,
};

LocationSearch.propTypes = {
  styles: PropTypes.object,
  onPress: PropTypes.func,
  isLoading: PropTypes.bool,
  isSelected: PropTypes.bool,
  iconVisible: PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
});

export default LocationSearch;
