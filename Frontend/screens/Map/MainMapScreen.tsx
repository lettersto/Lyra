import React, {useRef, useState} from 'react';
import {Button, Dimensions, StyleSheet, View} from 'react-native';
import LiveCategory from '../../components/Map/LiveCategory';
import PheedCategory from '../../components/Pheed/Category/PheedCategory';
import {Modalize} from 'react-native-modalize';
import PheedContent from '../../components/Pheed/PheedContent';
import MainMapView from '../../components/Map/MainMapView';
import MapPheedContent from '../../components/Map/MapPheedContent';

const deviceWidth = Dimensions.get('window').width;

const MainMapScreen = () => {
  const modalizeRef = useRef<Modalize>(null);

  const [currentCategory, SetCurrentCategory] = useState('all');

  const renderContent = () => (
    <View style={styles.content}>
      <PheedCategory
        Category="main"
        CustomStyle={styles.pheedCategory}
        currentCategory={currentCategory}
        SetCurrentCategory={SetCurrentCategory}
      />
      <View style={styles.pheedContent}>
        <MapPheedContent category={currentCategory} />
      </View>
    </View>
  );

  return (
    <>
      <MainMapView />
      {/* <LiveCategory CustomStyle={styles.liveCategory} /> */}
      <Modalize
        ref={modalizeRef}
        modalStyle={styles.content__modal}
        alwaysOpen={150}
        withHandle
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
    // width: deviceWidth,
    // bottom: 114,
    top: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 5,
  },
  pheedCategory: {
    width: deviceWidth,
    paddingVertical: 5,
  },
  content: {
    padding: 20,
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
  },
  pheedContent: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default MainMapScreen;
