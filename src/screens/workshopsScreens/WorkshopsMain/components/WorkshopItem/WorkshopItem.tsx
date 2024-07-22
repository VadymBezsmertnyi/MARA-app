import React, { FunctionComponent, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Trans } from "@lingui/macro";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// types
import { RootWorkshopsScreensParamList } from "../../../../../navigators/Navigators.types";

// constants
import { PATHS_WORKSHOP_SCREENS } from "../../../../../navigators/useNavigator.constants";

// components
import {
  IconChat,
  IconLocationMarker,
  IconStar,
  IconAutoService,
  IconMotoService,
} from "../../../../../icons/components";

// image
import WorkshopPlaceholder from "../../../../../../assets/default/workshop-placeholder.png";

// styles
import { styles } from "./WorkshopItem.styles";
import colors from "../../../../../../styles/colors";

type WorkshopItemProps = {
  workshopId: string;
  title: string;
  description: string;
  range: number | string | null;
  comments: number;
  rate: number | null;
  navigation: NativeStackNavigationProp<RootWorkshopsScreensParamList>;
  isMotoService: boolean;
  isAutoService: boolean;
  image: { url: string } | null;
};

export const WorkshopItem: FunctionComponent<WorkshopItemProps> = ({
  workshopId,
  title,
  description,
  range,
  comments,
  rate,
  navigation,
  isMotoService,
  isAutoService,
  image,
}) => {
  const { i18n } = useLocalesProvider();
  const selectNew = () => {
    navigation.navigate(PATHS_WORKSHOP_SCREENS.workshopItem, { workshopId });
  };

  const autoServiceStyles = useMemo(
    () => ({ ...styles.auto, right: isMotoService ? 0 : -8 }),
    [isMotoService]
  );

  const checkImage = image
    ? { ...image, uri: image?.url }
    : WorkshopPlaceholder;

  return (
    <TouchableOpacity style={styles.container} onPress={selectNew}>
      <View>
        <Image source={checkImage} style={styles.image} />
        {isAutoService && (
          <View style={autoServiceStyles}>
            <IconAutoService width={25} height={25} />
          </View>
        )}
        {isMotoService && (
          <View style={styles.moto}>
            <IconMotoService width={25} height={25} />
          </View>
        )}
      </View>
      <View style={styles.fitContent}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <IconLocationMarker
              fill={colors.californiaOrange}
              width={12}
              height={12}
            />
            <Text style={styles.infoText}>
              {range} {i18n._("km")}
            </Text>
          </View>
          <View style={styles.comment}>
            {rate ? (
              <>
                <View style={styles.inner}>
                  <IconChat
                    width={12}
                    height={12}
                    fill={colors.californiaOrange}
                  />
                  <Text style={styles.infoText}>{comments}</Text>
                </View>
                <View style={styles.inner}>
                  <IconStar width={12} height={12} fill={colors.yellow} />
                  <Text style={styles.infoText}>{rate}</Text>
                </View>
              </>
            ) : (
              <Text style={styles.notComments}>
                <Trans>Not comments</Trans>
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
