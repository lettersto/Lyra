import React from 'react';
import {FlatList, Text} from 'react-native';
import {DonationInfo} from '../../constants/types';

interface Props {
  donations: DonationInfo[];
}

const DonationList = ({donations}: Props) => {
  return (
    <FlatList
      data={donations}
      renderItem={donation => <Text>{donation}</Text>}
      keyExtractor={item => String(item.supportedId)}
    />
  );
};

export default DonationList;
