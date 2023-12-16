import React, { FunctionComponent, useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { Trans } from '@lingui/macro';
import { z } from 'zod';

// providers
import { userContext } from '../../../providers/user/user.provider';
import { localesContext } from '../../../../localization/localization.provider';

// components
import { SelectPicker } from '../../../components/SelectPicker/SelectPicker';

// constants
import { languages, languagesKeys } from '../../../../localization/localization.const';

export const Settings: FunctionComponent = () => {
  const { userData, editUser } = useContext(userContext);
  const { language, setLanguage } = useContext(localesContext);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const changeLanguage = async (item: { title: string; key: string }) => {
    const isLanguage = z.enum(languagesKeys).safeParse(item.key);
    if (isLanguage.success) await setLanguage(isLanguage.data);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>
          <Trans>Language:</Trans>
        </Text>
        <SelectPicker value={language} onChange={changeLanguage} data={languages} />
      </View>
    </View>
  );
};
