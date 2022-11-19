import React, {useContext, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

import {PheedStackNavigationProps} from '../../constants/types';
import {PheedMapContext} from '../../store/pheedMap-context';
import LocationSearch from '../../components/Map/LocationSearch';
import MapStyle from '../../components/Map/MapStyle';
import Colors from '../../constants/Colors';
import Button from '../../components/Utils/Button';

const deviceWidth = Dimensions.get('window').width;

const StoryLocationSerachScreen = () => {
  const navigation = useNavigation<PheedStackNavigationProps>();
  const {
    pheedMapLatitude,
    pheedMapLongitude,
    pheedMapLocationInfo,
    // pheedMapRegionCode,
    setPheedMapLatitude,
    setPheedMapLongitude,
    setPheedMapRegionCode,
    setPheedMapLocationInfo,
  } = useContext(PheedMapContext);

  useEffect(() => {
    setPheedMapRegionCode(null);
    setPheedMapLocationInfo('');
  }, [setPheedMapRegionCode, setPheedMapLocationInfo]);

  const getTownName = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
        },
      },
    );
    const result = await response.json();
    setPheedMapRegionCode(result.documents[0].code);
  };

  const pressHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.body}>
      <LocationSearch
        onPress={(_data, detail) => {
          const {
            geometry: {
              location: {lat, lng},
            },
          } = detail!;
          setPheedMapLatitude(lat);
          setPheedMapLongitude(lng);
          setPheedMapLocationInfo(_data.description);
          getTownName(lat, lng);
        }}
      />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyle}
        region={{
          latitude: pheedMapLatitude,
          longitude: pheedMapLongitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        <Marker
          coordinate={{
            latitude: pheedMapLatitude,
            longitude: pheedMapLongitude,
          }}>
          <Icon name="map-marker" size={20} color="white" />
        </Marker>
      </MapView>
      {pheedMapLocationInfo !== '' && (
        <View style={styles.buttonContainer}>
          <Text style={styles.name}>{pheedMapLocationInfo}</Text>
          <Button
            title="해당 위치로 설정"
            btnSize="large"
            textSize="medium"
            isGradient={false}
            isOutlined={false}
            onPress={pressHandler}
            customStyle={styles.button}
          />
        </View>
      )}
    </View>
  );
};

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
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: -1,
  },
  buttonContainer: {
    height: '25%',
    bottom: 0,
  },
  button: {
    marginTop: 20,
    width: deviceWidth * 0.8,
  },
  name: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    margin: 20,
  },
  input: {
    marginBottom: 2,
  },
});

export default StoryLocationSerachScreen;
