import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { BlurView } from 'expo-blur';

// components
import { Menu } from '../Menu/Menu';

// styles
import { styles } from './UpContainer.styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { Trans } from '@lingui/macro';

const INTENSITY = 5;

export const UpContainer: FunctionComponent = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isSos, setIsSos] = useState(false);

  const containerStyles = useMemo(() => [styles.container, isSos && styles.sosContainer], [isSos]);

  const pressSosLine = () => {
    console.log('pressSosLine');
  };

  useEffect(() => {
    setIsSos(true);
  }, []);

  return (
    <View style={containerStyles}>
      <BlurView intensity={isSos ? INTENSITY : 0} tint="dark" style={styles.blurViewContainer} />
      <Menu isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
      <TouchableOpacity onPress={pressSosLine} style={styles.buttonSos}>
        <Text style={styles.titleButtonSos}>
          <Trans>Someone needs help within a 5 km radius</Trans>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
