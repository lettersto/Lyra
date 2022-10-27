import React from 'react';
import {Pressable} from 'react-native';

import FIcons from 'react-native-vector-icons/FontAwesome5';

import Colors from '../../../constants/Colors';

const UserChatButtons = () => {
  return (
    <Pressable>
      {/* TODO gradation color? */}
      <FIcons name="donate" size={25} color={Colors.pink500} />
    </Pressable>
  );
};

export default UserChatButtons;
