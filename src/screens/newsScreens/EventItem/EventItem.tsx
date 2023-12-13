import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import Gallery from 'react-native-awesome-gallery';

// icons
import { ImageCache } from '../../../components/ImageCache/ImageCache';
import DEFAULT_IMAGE from '../DELETE_PHOTO.jpg';

// providers
import { localesContext } from '../../../../localization/localization.provider';

// components
import { Map } from '../../../components/Map/Map';
import {
  IconLocationMarker,
  RadixIconsCash,
  RadixIconsCalendar,
  MingcuteTimeLine,
} from '../../../icons/components';

// styles
import { styles } from './EventItem.styles';
import colors from '../../../../styles/colors';

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet consectetur. Orci sit rutrum vestibulum turpis tempus nulla arcu vel. Lorem ipsum dolor sit amet consectetur. Orci sit rutrum vestibulum turpis tempus nulla arcu vel.Lorem ipsum dolor sit amet consectetur. Orci sit rutrum vestibulum turpis tempus nulla arcu vel. Lorem ipsum dolor sit amet consectetur. Orci sit rutrum vestibulum turpis tempus nulla arcu vel. Orci sit rutrum vestibulum turpis tempus nulla arcu vel.';
const SEPARATED_TEXT = LOREM_IPSUM.split('.');

export const EventItem: FunctionComponent = () => {
  const { i18n } = useContext(localesContext);
  const tabBarHeight = useBottomTabBarHeight();
  const [isFullDescription, setIsFullDescription] = useState(false);

  const containerStyles = useMemo(
    () => ({ ...styles.container, paddingBottom: tabBarHeight || 0 }),
    [tabBarHeight],
  );

  const checkIsFullDescr = isFullDescription ? SEPARATED_TEXT.length : 3;
  const descriptionText = SEPARATED_TEXT.slice(0, checkIsFullDescr);

  return (
    <ScrollView>
      <View style={containerStyles}>
        <View style={styles.imageWrapper}>
          <ImageCache style={styles.image} contentFit="cover" imageSrc={DEFAULT_IMAGE} />
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Гонки</Text>
          <Text style={styles.subtitle}>01.01.2023</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Автодром ім. Вадима</Text>
          <View style={styles.distance}>
            <IconLocationMarker width={20} height={20} fill={colors.californiaOrange} />
            <Text style={styles.subtitle}>20 км</Text>
          </View>
        </View>
        <View style={styles.dateOfEvent}>
          <Text style={styles.title}>{i18n._('Date of the event')}</Text>
          <Text style={styles.label}>{i18n._('The beginning')}:</Text>
          <View style={styles.wrapper}>
            <View style={styles.inner}>
              <View style={styles.iconWrapper}>
                <RadixIconsCalendar width={24} height={24} fill={colors.californiaOrange} />
              </View>
              <Text style={styles.subtitle}>01.01.2023</Text>
            </View>
            <View style={styles.inner}>
              <View style={styles.iconWrapper}>
                <MingcuteTimeLine width={24} height={24} fill={colors.californiaOrange} />
              </View>
              <Text style={styles.subtitle}>10:00</Text>
            </View>
          </View>
          <Text style={styles.label}>{i18n._('Finish')}:</Text>
          <View style={styles.wrapper}>
            <View style={styles.inner}>
              <View style={styles.iconWrapper}>
                <RadixIconsCalendar width={24} height={24} fill={colors.californiaOrange} />
              </View>
              <Text style={styles.subtitle}>01.01.2023</Text>
            </View>
            <View style={styles.inner}>
              <View style={styles.iconWrapper}>
                <MingcuteTimeLine width={24} height={24} fill={colors.californiaOrange} />
              </View>
              <Text style={styles.subtitle}>22:00</Text>
            </View>
          </View>
        </View>
        <View style={styles.dateOfEvent}>
          <Text style={styles.title}>{i18n._('Price for participation')}:</Text>
          <View style={styles.wrapper}>
            <View style={styles.inner}>
              <View style={styles.iconWrapper}>
                <RadixIconsCash width={24} height={24} fill={colors.californiaOrange} />
              </View>
              <Text style={styles.title}>100-1000 грн</Text>
            </View>
          </View>
        </View>
        <View style={styles.dateOfEvent}>
          <Text style={styles.subtitle}>{i18n._('About event')}:</Text>
          <View style={styles.description}>
            <Text style={styles.text}>{descriptionText}.</Text>
            {!isFullDescription && (
              <>
                <Text style={styles.fullTextTitle}>{i18n._('Read the whole description...')}</Text>
                <TouchableOpacity
                  style={styles.fullText}
                  onPress={() => {
                    setIsFullDescription(true);
                  }}
                />
              </>
            )}
          </View>
        </View>
        <View style={styles.mapWrapper}>
          <Map longitude={31.976197008043528} latitude={49.63489179964168} />
        </View>
        <View style={styles.gallery}>
          <Text style={styles.subtitle}>{i18n._('Gallery')}:</Text>
          {/* <Gallery // TODO catch error about GestureDetector
              data={images}
              onIndexChange={newIndex => {
                console.log(newIndex);
              }}
            /> */}
          <TouchableOpacity onPress={() => null} style={styles.galleryButton}>
            <Text style={styles.galleryButtonTitle}>{i18n._('All photos')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
