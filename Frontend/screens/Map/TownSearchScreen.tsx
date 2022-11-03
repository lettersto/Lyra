import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocationSearch from '../../components/Map/LocationSearch';
import MapStyle from '../../components/Map/mapStyle';
import Button from '../../components/Utils/Button';
import Colors from '../../constants/Colors';

const deviceWidth = Dimensions.get('window').width;

const TownSearchScreen = () => {
  const [location, setLocation] = useState<Region>({
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
    latitude: 0,
    longitude: 0,
  });
  const [name, setName] = useState('');
  const pressHandler = () => {};

  return (
    <>
      <View style={styles.body}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>주소 찾기</Text>
          <LocationSearch
            onPress={(data, detail) => {
              const {
                geometry: {
                  location: {lat, lng},
                },
              } = detail!;
              setLocation(prev => ({
                ...prev,
                latitude: lat,
                longitude: lng,
              }));
              setName(data.description);
            }}
          />
          {location && (
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              customMapStyle={MapStyle}
              region={
                location.latitude && location.longitude ? location : undefined
              }>
              <Marker coordinate={location}>
                <Icon name="map-marker" size={20} color="white" />
              </Marker>
            </MapView>
          )}
          <View style={{height: '25%', bottom: 0}}>
            <Text style={styles.name}>{name}</Text>
            <Button
              title="선택한 위치로 설정"
              btnSize="large"
              textSize="medium"
              isGradient={false}
              isOutlined={false}
              onPress={pressHandler}
              customStyle={styles.button}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default TownSearchScreen;

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
  button: {
    marginTop: 20,
    width: deviceWidth * 0.8,
  },
  name: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 20,
  },
});
