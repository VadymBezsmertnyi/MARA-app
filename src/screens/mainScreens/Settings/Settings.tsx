import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { Image, ImageURISource, Text, TouchableOpacity, View } from 'react-native';
import { Trans } from '@lingui/macro';
import { z } from 'zod';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';

// providers
import { userContext } from '../../../providers/user/user.provider';
import { localesContext } from '../../../../localization/localization.provider';

// components
import { SelectPicker } from '../../../components/SelectPicker/SelectPicker';

// helps
import showErrors from '../../../helps/errors/showError';

// constants
import { languages, languagesKeys } from '../../../../localization/localization.const';

// styles
import { styles } from './Settings.styles';
import { IconProfileAvatar } from '../../../icons/components';
import { ImageCache } from '../../../components/ImageCache/ImageCache';

export const Settings: FunctionComponent = () => {
  const { userData, editUser } = useContext(userContext);
  const { i18n, language, setLanguage } = useContext(localesContext);
  const { warning } = showErrors;

  const imageSource = useMemo(
    () =>
      userData?.avatar
        ? ({
            uri: userData.avatar.url,
            cache: 'force-cache',
          } as ImageURISource)
        : null,
    [userData?.avatar],
  );

  const changeLanguage = async (item: { title: string; key: string }) => {
    const isLanguage = z.enum(languagesKeys).safeParse(item.key);
    if (isLanguage.success) await setLanguage(isLanguage.data);
  };

  const toggleIsLocation = (isGeoLocation: boolean) => {
    if (userData) editUser({ isGeoLocation });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const titleSuccess = userData?.avatar?.id
        ? i18n._('The photo has been changed')
        : i18n._('The photo added');
      const resultUpdate = await editUser({
        avatar: { image: result.assets[0].base64 as string, type: 'jpg' },
      });

      if (!resultUpdate) warning(i18n._('Sorry, an error occurred'));
      else warning(titleSuccess);
    } else warning(i18n._('Sorry, an error occurred'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerAvatar}>
        <View style={styles.containerImage}>
          {imageSource ? (
            <ImageCache style={styles.containerImage} imageSrc={imageSource} />
          ) : (
            <IconProfileAvatar />
          )}
        </View>
      </View>
      <TouchableOpacity onPress={pickImage} style={styles.buttonAddPhoto}>
        <Text style={styles.titleButtonAddPhoto}>
          {imageSource ? <Trans>Edit photo +</Trans> : <Trans>Add photo +</Trans>}
        </Text>
      </TouchableOpacity>
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
