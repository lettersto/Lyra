import React, {useContext, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import PheedCategory from '../../components/Pheed/Category/PheedCategory';
import {Modalize} from 'react-native-modalize';
import MainMapView from '../../components/Map/MainMapView';
import MapPheedContent from '../../components/Map/MapPheedContent';
import Colors from '../../constants/Colors';
import {MapContext} from '../../store/map-context';

const deviceWidth = Dimensions.get('window').width;

const MainMapScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const {pheedsCnt} = useContext(MapContext);
  const [currentCategory, SetCurrentCategory] = useState('all');

  const renderHeader = () => (
    <View style={styles.content}>
      <PheedCategory
        Category="main"
        CustomStyle={styles.pheedCategory}
        currentCategory={currentCategory}
        SetCurrentCategory={SetCurrentCategory}
      />
    </View>
  );

  const renderContent = () => (
    <View style={styles.pheedContent}>
      <MapPheedContent category={currentCategory} />
    </View>
  );

  return (
    <>
      <MainMapView />
      <Text style={styles.liveCategory}>현재 {pheedsCnt}개의 버스킹</Text>
      {/* <LiveCategory CustomStyle={styles.liveCategory} /> */}
      <Modalize
        ref={modalizeRef}
        modalStyle={styles.content__modal}
        alwaysOpen={150}
        withHandle
        HeaderComponent={renderHeader}
        handleStyle={styles.handle}
        handlePosition="inside">
        {renderContent()}
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  liveCategory: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 5,
    color: Colors.gray300,
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  pheedCategory: {
    justifyContent: 'center',
    width: deviceWidth,
    paddingVertical: 5,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  handle: {
    backgroundColor: '#FFF',
  },
  content__modal: {
    backgroundColor: '#000',
    shadowColor: '#FFF',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.45,
    shadowRadius: 16,
    marginBottom: 30,
  },
  pheedContent: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});

export default MainMapScreen;
