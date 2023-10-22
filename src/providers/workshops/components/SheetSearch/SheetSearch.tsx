import React, { FunctionComponent, useContext, useMemo } from 'react';
import { Platform, Pressable, ScrollView, TextInput, View, ViewProps } from 'react-native';
import { t } from '@lingui/macro';

// providers
import { localesContext } from '../../../../../localization/localization.provider';
import { responsiveLayoutContext } from '../../../responsiveLayout/responsiveLayout.provider';

// components
import { SheetWorkshop } from '../SheetWorkshop/SheetWorkshop';

// icons
import { IconLocationMarker } from '../../../../icons/components';

// types
import { WorkshopsT } from '../../workshops.types';

// styles
import { styles } from './SheetSearch.styles';
import colors from '../../../../../styles/colors';

type SheetSearchProps = {
  isOpen: boolean;
  workshops: WorkshopsT;
  setIsOpen: (value: boolean) => void;
  value: string;
  setValue: (value: string) => void;
};

export const SheetSearch: FunctionComponent<SheetSearchProps> = ({
  isOpen,
  workshops,
  setIsOpen,
  value,
  setValue,
}) => {
  const { i18n } = useContext(localesContext);
  const { durationHeight } = useContext(responsiveLayoutContext);
  const onClose = () => {
    setIsOpen(false);
  };

  const containerStyles = useMemo(
    () => [styles.container, Platform.OS === 'ios' && { bottom: durationHeight }],
    [durationHeight],
  );
  const listStyles = useMemo(
    () =>
      ({
        height: durationHeight ? durationHeight - 160 : '80%',
        paddingBottom: 60 + Platform.OS === 'ios' ? durationHeight : 0,
      }) as ViewProps,
    [durationHeight],
  );

  if (!isOpen) return null;
  return (
    <>
      <Pressable style={styles.background} onPress={onClose} />
      <View style={containerStyles}>
        <View style={styles.containerInput}>
          <IconLocationMarker width={24} height={24} fill={colors.grayMercury} />
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={t(i18n)`Enter the address`}
            placeholderTextColor={colors.DavysGray}
            style={styles.input}
          />
        </View>
        <View style={listStyles}>
          <ScrollView indicatorStyle={'black'} contentContainerStyle={styles.scrollViewContainer}>
            {workshops.map((workshop, index) => (
              <SheetWorkshop
                key={`workshop-${workshop.id}`}
                workshop={workshop}
                isEndList={workshops.length - 1 === index}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};
