import React, { FunctionComponent, useContext, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Trans } from '@lingui/macro';

// providers
import { themeContext } from '../../providers/theme/theme.provider';

// components
import { SocialFacebook, SocialGoogle } from '../../icons/components';

// constants
import { THEME_DARK } from '../../providers/theme/theme.const';

// styles
import { styles } from './Social.styles';

export const Social: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const titleSocialConnectStyle = useMemo(
    () => [styles.titleSocialConnect, theme === THEME_DARK && styles.colorWhite],
    [theme],
  );
  const labelSocialConnectStyle = useMemo(
    () => [styles.labelSocialConnect, theme === THEME_DARK && styles.colorWhite],
    [theme],
  );

  const onSocial = (type: 'facebook' | 'google') => {
    console.log(type);
  };

  return (
    <View style={styles.socialConnect}>
      <Text style={titleSocialConnectStyle}>
        <Trans>or sign up using:</Trans>
      </Text>
      <TouchableOpacity
        onPress={() => {
          onSocial('facebook');
        }}
        style={styles.itemSocialConnect}
      >
        <SocialFacebook width={24} height={24} />
        <Text style={labelSocialConnectStyle}>Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onSocial('google');
        }}
        style={styles.itemSocialConnect}
      >
        <SocialGoogle width={24} height={24} />
        <Text style={labelSocialConnectStyle}>Google</Text>
      </TouchableOpacity>
    </View>
  );
};
