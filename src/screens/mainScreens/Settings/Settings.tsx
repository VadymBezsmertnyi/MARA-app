import React, { FunctionComponent, useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { Trans } from '@lingui/macro';
import { z } from 'zod';
import Checkbox from 'expo-checkbox';

// providers
import { userContext } from '../../../providers/user/user.provider';
import { localesContext } from '../../../../localization/localization.provider';

// components
import { SelectPicker } from '../../../components/SelectPicker/SelectPicker';

// constants
import { languages, languagesKeys } from '../../../../localization/localization.const';
import { styles } from './Settings.styles';

export const Settings: FunctionComponent = () => {
  const { userData, editUser } = useContext(userContext);
  const { language, setLanguage } = useContext(localesContext);

  const changeLanguage = async (item: { title: string; key: string }) => {
    const isLanguage = z.enum(languagesKeys).safeParse(item.key);
    if (isLanguage.success) await setLanguage(isLanguage.data);
  };

  const toggleIsLocation = (isGeoLocation: boolean) => {
    if (userData) editUser({ isGeoLocation });
  };

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text>
          <Trans>Language:</Trans>
        </Text>
        <SelectPicker value={language} onChange={changeLanguage} data={languages} />
      </View>
      <View style={styles.option}>
        <Text>
          <Trans>Your location:</Trans>
        </Text>
        <Checkbox value={userData?.isGeoLocation} onValueChange={toggleIsLocation} />
      </View>
    </View>
  );
};
