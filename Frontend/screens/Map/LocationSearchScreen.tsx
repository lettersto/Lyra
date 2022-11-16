import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocationSearch from '../../components/Map/LocationSearch';
import MapStyle from '../../components/Map/MapStyle';
import Button from '../../components/Utils/Button';
import Input from '../../components/Utils/Input';
import Colors from '../../constants/Colors';
import {RootStackParamList} from '../../constants/types';
import {PheedMapContext} from '../../store/pheedMap-context';

type Props = NativeStackScreenProps<RootStackParamList>;

const deviceWidth = Dimensions.get('window').width;

const LocationSearchScreen = ({navigation}: Props) => {
  // const [location, setLocation] = useState<Region>({
  //   latitudeDelta: 0.005,
  //   longitudeDelta: 0.005,
  //   latitude: 0,
  //   longitude: 0,
  // });
  const {
    pheedMapLocationInfo,
    pheedMapLocationAddInfo,
    pheedMapLatitude,
    pheedMapLongitude,
    setPheedMapLocationInfo,
    setPheedMapLocationAddInfo,
    setPheedMapRegionCode,
    setPheedMapRegionName,
    setPheedMapLatitude,
    setPheedMapLongitude,
  } = useContext(PheedMapContext);

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
    setPheedMapRegionName(result.documents[0].region_3depth_name);
  };

  const pressHandler = () => {
    navigation.navigate('CreatePheed');
  };

  return (
    <>
      <View style={styles.body}>
        <View style={{flex: 1}}>
          {/* <Text style={styles.title}>주소 찾기</Text> */}
          <LocationSearch
            onPress={(data, detail) => {
              const {
                geometry: {
                  location: {lat, lng},
                },
              } = detail!;
              setPheedMapLatitude(lat);
              setPheedMapLongitude(lng);
              setPheedMapLocationInfo(data.description);
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

          {pheedMapLatitude !== 0 && (
            <View style={{height: '35%', bottom: 0}}>
              <Text style={styles.name}>{pheedMapLocationInfo}</Text>
              <Input
                setEnteredValue={setPheedMapLocationAddInfo}
                enteredValue={pheedMapLocationAddInfo}
                width={0.8}
                height={0.05}
                borderRadius={25}
                keyboard={1}
                placeholder="구체적인 장소를 입력해주세요."
                customStyle={styles.input}
                maxLength={30}
              />
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
      </View>
    </>
  );
};

export default LocationSearchScreen;

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
    margin: 20,
  },
  input: {
    marginBottom: 2,
  },
});
