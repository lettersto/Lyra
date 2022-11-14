import React, {LegacyRef, useContext, useEffect, useRef, useState} from 'react';
import MapView, {
  Camera,
  Details,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import MapStyle from './MapStyle';
import Colors from '../../constants/Colors';
import MapPheedModal from './MapPheedModal';
import {AuthContext} from '../../store/auth-context';
import {getMapPheeds as getMapPheedsApi} from '../../api/pheed';
import ProfilePhoto from '../Utils/ProfilePhoto';
import {MapContext} from '../../store/map-context';

interface ILocation {
  latitude: number;
  longitude: number;
}

const MainMapView = () => {
  const map: LegacyRef<MapView> = useRef(null);
  const {mapLatitude, mapLongitude, setMapLatitude, setMapLongitude} =
    useContext(MapContext);
  const {userId} = useContext(AuthContext);
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const [zoom, setZoom] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contents, setContents] = useState<any[]>([]);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setLocation(pos.coords);
        setMapLatitude(pos.coords.latitude);
        setMapLongitude(pos.coords.longitude);
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

  const getMapPheeds = async (zoomLv: number) => {
    const res = await getMapPheedsApi({
      latitude: mapLatitude,
      longitude: mapLongitude,
      zoom: zoomLv,
    });
    console.log('================');
    res.reduce((a, b, c, d) => {
      console.log(a, b, c, d);
    }, []);
    setContents(res);
  };

  if (!location) {
    return (
      <View style={styles.body}>
        <Text style={styles.loadingtext}>Loading...</Text>
      </View>
    );
  }
  const onRegionChange = (region: Region, details: Details) => {
    console.log(region);
    console.log(details);
    map.current?.getCamera().then((cam: Camera) => {
      if (cam.zoom) {
        // console.log(`줌 : ${cam.zoom}`);
        getMapPheeds(zoom);
      }
    });
  };
  return (
    <>
      <View style={{flex: 1, position: 'relative'}}>
        {/* <Button title="Zoom" onPress={onZoomInPress} /> */}
        <MapView
          onMapReady={() => {
            map.current?.getCamera().then((cam: Camera) => {
              if (cam.zoom) {
                setZoom(Math.round(cam.zoom));
                getMapPheeds(zoom);
              }
            });
          }}
          onRegionChangeComplete={onRegionChange}
          ref={map}
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: mapLatitude,
            longitude: mapLongitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          customMapStyle={MapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          {contents.map((val, i) => {
            return (
              <View key={i} style={[styles.profile]}>
                <Marker
                  coordinate={{
                    latitude: val.latitude,
                    longitude: val.longitude,
                  }}
                  onPress={() => {
                    setIsModalVisible(true);
                  }}>
                  {/* <CircleProfile grade="hot" size="medium" isGradient={true} /> */}
                  <ProfilePhoto
                    imageURI={val.userImage_url}
                    grade="hot"
                    size="medium"
                    isGradient={true}
                    profileUserId={val.userId}
                  />
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
  liveCategory: {
    position: 'absolute',
    zIndex: 1,
    // width: deviceWidth,
    // bottom: 114,
    top: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 5,
  },
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
