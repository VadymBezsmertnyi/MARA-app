import React, { FunctionComponent } from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { Image, ImageContentFit, ImageContentPosition, ImageSource } from 'expo-image';

type ImageCacheProps = {
  imageSrc: string | ImageSource;
  style?: StyleProp<ImageStyle>;
  contentFit?: ImageContentFit;
  contentPosition?: ImageContentPosition;
};
/**
 * A React component for caching and displaying images with various styling options.
 *
 * @param {ImageCacheProps} props - The component's props.
 * @param {string | ImageSource} props.imageSrc - The source URL of the image to display.
 * @param {StyleProp<ImageStyle>} [props.style] - Optional styling for the image container.
 * @param {ImageContentFit} [props.contentFit="cover"] - Optional content fitting strategy for the image.
 * @param {ImageContentPosition} [props.contentPosition] - An optional parameter that specifies the content positioning strategy for the displayed image.
 *   Possible values are "contain", "cover", "auto", etc.
 * @returns {JSX.Element} A React element that displays the cached image.
 */
export const ImageCache: FunctionComponent<ImageCacheProps> = ({
  imageSrc,
  style,
  contentFit = 'cover',
  contentPosition,
}: ImageCacheProps): JSX.Element => (
  <Image
    contentFit={contentFit}
    contentPosition={contentPosition}
    source={imageSrc}
    style={style}
  />
);
