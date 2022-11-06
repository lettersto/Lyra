import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {View, Text, StyleSheet} from 'react-native';
import MapStyle from './mapStyle';
import Colors from '../../constants/Colors';
import {profileData} from './profileData';
import CircleProfile from '../Utils/CircleProfile';

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

  const ProfilePressHandler = () => {};

  if (!location) {
    return (
      <View style={styles.body}>
        <Text style={styles.loadingtext}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          customMapStyle={MapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          {profileData.map((val, i) => {
            return (
              <View key={i} style={[styles.profile]}>
                <Marker coordinate={val.coords} onPress={ProfilePressHandler}>
                  <CircleProfile grade="hot" size="medium" isGradient={true} />
                </Marker>
              </View>
            );
          })}
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  loadingtext: {
    flex: 1,
    top: '50%',
    textAlign: 'center',
    color: Colors.gray300,
  },
  profile: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: Colors.purple300,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default Map;
