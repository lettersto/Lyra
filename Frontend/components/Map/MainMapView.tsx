import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import MapStyle from './MapStyle';
import Colors from '../../constants/Colors';
import {profileData} from './profileData';
import CircleProfile from '../Utils/CircleProfile';
import MapPheedModal from './MapPheedModal';
import {getPheeds} from '../../api/pheed';

interface ILocation {
  latitude: number;
  longitude: number;
}

const MainMapView = () => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState('');
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
  useEffect(() => {
    const fetch = async () => {
      const res = await getPheeds();
      setUserId(res.data.userId);
    };
    fetch();
  });

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
                <Marker
                  coordinate={val.coords}
                  onPress={() => {
                    setIsModalVisible(true);
                  }}>
                  <CircleProfile grade="hot" size="medium" isGradient={true} />
                </Marker>
              </View>
            );
          })}
        </MapView>
        <MapPheedModal
          userId={userId}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </View>
    </>
  );
};

const deviceWidth = Dimensions.get('window').width;

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
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    padding: 1,
    borderRadius: 8,
  },
  modal: {
    width: deviceWidth * 0.7,
    borderRadius: 8,
    backgroundColor: Colors.black500,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainMapView;
