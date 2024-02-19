import React, { FunctionComponent, useMemo } from "react";
import { Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";
import { LinearGradientCustom } from "../../../../../components/LinearGradientCustom/LinearGradientCustom";

// icons
import {
  IconAutoService,
  IconMotoService,
} from "../../../../../icons/components";

// styles
import { styles } from "./ComponentCallout.styles";

type ComponentCalloutProps = {
  imageSrc: string;
  title: string;
  distance: string | null;
  isMoto: boolean;
  isAuto: boolean;
};
export const ComponentCallout: FunctionComponent<ComponentCalloutProps> = ({
  imageSrc,
  title,
  distance,
  isMoto,
  isAuto,
}) => {
  const styleIconAuto = useMemo(() => ({ right: isMoto ? -12 : 0 }), [isMoto]);
  return (
    <View style={styles.container}>
      <LinearGradientCustom style={styles.linearGradient}>
        <View style={styles.containerMain}>
          <View style={styles.containerTitle}>
            <View style={styles.containerImage}>
              <ImageCache
                imageSrc={imageSrc}
                contentFit="cover"
                style={styles.image}
              />
            </View>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>
          <View style={styles.containerSubTitles}>
            <Text style={styles.title}>
              <Trans>{distance} km</Trans>
            </Text>
            <View style={styles.containerIcons}>
              {isAuto ? (
                <IconAutoService width={20} height={20} style={styleIconAuto} />
              ) : null}
              {isMoto ? <IconMotoService width={20} height={20} /> : null}
            </View>
          </View>
        </View>
      </LinearGradientCustom>
      <LinearGradientCustom style={styles.containerArrow}>
        <View style={styles.bodyArrow} />
      </LinearGradientCustom>
      <View style={styles.containerEmpty} />
    </View>
  );
};
