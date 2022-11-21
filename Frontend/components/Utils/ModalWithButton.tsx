import React, {Dispatch, SetStateAction, ReactNode} from 'react';
import {Modal as ReactModal, View, StyleSheet, Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Button from './Button';
import Colors from '../../constants/Colors';

const ModalWithButton = ({
  isModalVisible,
  setIsModalVisible,
  children,
  leftText,
  rightText,
  onLeftPress,
  onRightPress,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  leftText: string;
  rightText?: string | undefined;
  // TODO type check for onPress
  onLeftPress: (...params: any) => any;
  onRightPress?: (...params: any) => any;
}) => {
  const gradientColors = [Colors.pink300, Colors.purple300];

  return (
    <ReactModal
      transparent={true}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}>
      <View style={styles.backdrop}>
        <LinearGradient
          colors={[...gradientColors]}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 1.0}}
          style={styles.gradientContainer}>
          <View style={styles.modal}>
            <View style={styles.contentContainer}>{children}</View>
            <View style={styles.buttonContainer}>
              <Button
                title={leftText}
                btnSize="small"
                textSize="small"
                customStyle={styles.button}
                isGradient={true}
                isOutlined={true}
                onPress={onLeftPress}
              />
              {rightText && onRightPress && (
                <Button
                  title={rightText}
                  btnSize="small"
                  textSize="small"
                  customStyle={styles.button}
                  isGradient={true}
                  isOutlined={false}
                  onPress={onRightPress}
                />
              )}
            </View>
          </View>
        </LinearGradient>
      </View>
    </ReactModal>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
    width: deviceWidth * 0.8,
    borderRadius: 8,
    backgroundColor: Colors.black500,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 48,
    paddingVertical: 16,
    justifyContent: 'space-around',
  },
  button: {
    width: 70,
  },
});

export default ModalWithButton;
