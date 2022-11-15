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
import {getMapPheeds as getMapPheedsApi} from '../../api/pheed';
import ProfilePhoto from '../Utils/ProfilePhoto';
import {MapContext} from '../../store/map-context';

interface ILocation {
  latitude: number;
  longitude: number;
}

const MainMapView = () => {
  const map: LegacyRef<MapView> = useRef(null);
  const {
    mapLatitude,
    mapLongitude,
    pheeds,
    setMapLatitude,
    setMapLongitude,
    setPheeds,
  } = useContext(MapContext);
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const [zoom, setZoom] = useState(0);
  const [pheedId, setPheedId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [pheeds, setPheeds] = useState<any[]>([]);

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
  }, [setMapLatitude, setMapLongitude]);

  const getMapPheeds = async (zoomLv: number) => {
    const res = await getMapPheedsApi({
      latitude: mapLatitude,
      longitude: mapLongitude,
      zoom: zoomLv,
    });
    // console.log('================');
    // res.reduce((a, b, c, d) => {
    //   console.log(a, b, c, d);
    // }, []);
    setPheeds(res);
  };

  if (!location) {
    return (
      <View style={styles.body}>
        <Text style={styles.loadingtext}>Loading...</Text>
      </View>
    );
  }
  const onRegionChange = (region: Region, details: Details) => {
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
          {pheeds.map((pheed, i) => {
            return (
              <View key={i} style={[styles.profile]}>
                <Marker
                  coordinate={{
                    latitude: pheed.latitude,
                    longitude: pheed.longitude,
                  }}
                  onPress={() => {
                    setPheedId(pheed.pheedId);
                    setIsModalVisible(true);
                  }}>
                  {/* <CircleProfile grade="hot" size="medium" isGradient={true} /> */}
                  <ProfilePhoto
                    imageURI={pheed.userImage_url}
                    grade="hot"
                    size="medium"
                    isGradient={true}
                    profileUserId={pheed.userId}
                  />
                </Marker>
              </View>
            );
          })}
        </MapView>
        {pheedId && (
          <MapPheedModal
            pheedId={pheedId}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        )}
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
