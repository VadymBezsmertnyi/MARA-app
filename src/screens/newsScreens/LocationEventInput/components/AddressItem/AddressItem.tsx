import React, { FunctionComponent, useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Input } from '../../../../../components/Input/Input';

import { localesContext } from '../../../../../../localization/localization.provider';

// styles
import { styles } from './AddressItem.styles';

type AddressItemProps = {
  street: string;
  city: string;
  build: string;
  setBuild: (k: string) => void;
  setAddress: () => void;
};

export const AddressItem: FunctionComponent<AddressItemProps> = ({
  street,
  city,
  build,
  setBuild,
  setAddress,
}) => {
  const { i18n } = useContext(localesContext);
  const [isShowInput, setIsShowInput] = useState(false);

  return (
    <TouchableOpacity style={styles.container} onPress={setAddress}>
      <View style={styles.wrapper}>
        <Text style={styles.street}>{street}:</Text>
        <Text style={styles.city}>{city}:</Text>
        <TouchableOpacity
          onPress={() => {
            setIsShowInput(true);
          }}
        >
          <Text style={styles.buttonTitle}>+ {i18n._('Add a house number')}</Text>
        </TouchableOpacity>
        {isShowInput && (
          <Input value={build} onChange={setBuild} placeholder={i18n._('Enter the house number')} />
        )}
      </View>
    </TouchableOpacity>
  );
};
