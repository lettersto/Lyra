import React, {useRef, useState} from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import LiveCategory from '../../components/Map/LiveCategory';
import Map from '../../components/Map/map';
import PheedCategory from '../../components/Pheed/Category/PheedCategory';
import {Modalize} from 'react-native-modalize';
import Colors from '../../constants/Colors';
import PheedContent from '../../components/Pheed/PheedContent';

const deviceWidth = Dimensions.get('window').width;

const MainMapScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const [currentCategory, SetCurrentCategory] = useState('');

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleClose = dest => {
    if (modalizeRef.current) {
      modalizeRef.current.close(dest);
    }
  };

  const renderContent = () => (
    <View style={styles.content}>
      <Text style={styles.modalTitle}>Open Fheed!</Text>
      <View style={styles.pheedContent}>
        <PheedContent />
      </View>
      <Button
        title="Close to initial position"
        onPress={() => handleClose('alwaysOpen')}
      />
      <Button title="Close completely" onPress={handleClose} />
    </View>
  );

  return (
    <>
      <Map />
      <LiveCategory CustomStyle={styles.liveCategory} />
      <PheedCategory
        Category="main"
        CustomStyle={styles.pheedCategory}
        scrollStyle={styles.scroll}
        currentCategory={currentCategory}
        SetCurrentCategory={SetCurrentCategory}
      />
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
    width: deviceWidth,
    // bottom: 114,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 5,
  },
  pheedCategory: {
    position: 'absolute',
    zIndex: 1,
    width: deviceWidth,
    top: 37,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 5,
  },
  scroll: {
    marginHorizontal: '5%',
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.white300,
  },
  pheedContent: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default MainMapScreen;
