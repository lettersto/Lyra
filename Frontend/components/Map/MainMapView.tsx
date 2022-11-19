import React, {LegacyRef, useContext, useEffect, useRef, useState} from 'react';
import MapView, {
  Camera,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Alert,
  Image,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import MapStyle from './MapStyle';
import Colors from '../../constants/Colors';
import MapPheedModal from './MapPheedModal';
import {getMapPheeds as getMapPheedsApi} from '../../api/pheed';
import ProfilePhoto from '../Utils/ProfilePhoto';
import {MapContext} from '../../store/map-context';
import StarImg from './StarImg';
import {ChatContext} from '../../store/chat-context';

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
    setPheedsCnt,
  } = useContext(MapContext);
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  // const [zoomLv, setZoomLv] = useState(18);
  const [pheedId, setPheedId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {socket} = useContext(ChatContext);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const requestPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Alert.alert('Lyra', '위치 정보를 허용했습니다.');
            getPosition();
          } else {
            Alert.alert(
              'Lyra',
              '위치 정보를 허용하지 않으면 앱을 쓸 수 없어요. 그래도 괜찮겠어요?',
            );
          }
        } catch (err) {
          Alert.alert('다시 시도해주세요.');
        }
      };
      requestPermission();
    }
  }, []);

  const getPosition = () => {
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
        timeout: 36000,
        maximumAge: 3600,
      },
    );
  };
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
        timeout: 36000,
        maximumAge: 3600,
      },
    );
  }, [setMapLatitude, setMapLongitude]);

  const getMapPheeds = async (testZoomLv: number) => {
    const res = await getMapPheedsApi({
      latitude: mapLatitude,
      longitude: mapLongitude,
      zoom: testZoomLv,
    });
    setPheeds(res);
  };

  useEffect(() => {
    setPheedsCnt(pheeds.length);
  }, [pheeds, setPheedsCnt]);

  if (!location) {
    return (
      <View style={styles.body}>
        <Text style={styles.loadingtext}>Loading...</Text>
      </View>
    );
  }
  const onRegionChange = (region: Region) => {
    setMapLatitude(region.latitude);
    setMapLongitude(region.longitude);
    map.current?.getCamera().then((cam: Camera) => {
      if (cam.zoom) {
        // setZoomLv(Math.round(cam.zoom * 10) / 10);
        const testZoomLv = Math.round(cam.zoom * 10) / 10;
        getMapPheeds(testZoomLv);
      }
    });
  };
  return (
    <>
      <View style={{flex: 1, position: 'relative'}}>
        <MapView
          onMapReady={() => {
            map.current?.getCamera().then((cam: Camera) => {
              if (cam.zoom) {
                // setZoomLv(Math.round(cam.zoom * 10) / 10);
                const testZoomLv = Math.round(cam.zoom * 10) / 10;
                getMapPheeds(testZoomLv);
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
          {pheeds.map(pheed => {
            let cnt = 1;
            socket!.on('total user cnt', (num: number) => {
              cnt = num;
            });
            socket!.emit('total user cnt', pheed.userId);

            return (
              <View key={uuidv4()}>
                <View style={[styles.profile]}>
                  <Marker
                    tracksViewChanges={false}
                    coordinate={{
                      latitude: pheed.latitude,
                      longitude: pheed.longitude,
                    }}
                    onPress={() => {
                      setPheedId(pheed.pheedId);
                      setIsModalVisible(true);
                    }}>
                    <StarImg chatCnt={cnt} />
                  </Marker>
                </View>
                <View style={[styles.profile]}>
                  <Marker
                    tracksViewChanges={false}
                    coordinate={{
                      latitude: pheed.latitude,
                      longitude: pheed.longitude,
                    }}>
                    <ProfilePhoto
                      imageURI={pheed.userImage_url}
                      grade="hot"
                      size="extraSmall"
                      isGradient={true}
                      profileUserId={pheed.userId}
                    />
                    <View style={{height: 50}} />
                  </Marker>
                </View>
              </View>
            );
          })}
        </MapView>
        {pheedId && (
          <MapPheedModal
            pheedId={pheedId}
            setPheedId={setPheedId}
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
  star: {
    // translateY: 50,
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
