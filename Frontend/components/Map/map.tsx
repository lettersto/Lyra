import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {View, Text} from 'react-native';
import MapStyle from './mapStyle';

interface ILocation {
  latitude: number;
  longitude: number;
}

const Map = () => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setLocation(pos.coords);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 3600,
        maximumAge: 3600,
      },
    );
  }, []);

  if (!location) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1, zIndex: -1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          customMapStyle={MapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
        />
      </View>
    </>
  );
};

export default Map;
