import React, { FunctionComponent, useMemo } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Trans } from "@lingui/macro";

// types
import { WorkshopType } from "../../../../../providers/WorkshopsProvider/WorkshopsProvider.types";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";

// helps
import { useAllNavigation } from "../../../../../navigators/Navigators.helps";

// constants
import { PATHS_SETTINGS_SCREENS } from "../../../../../navigators/useNavigator.constants";

// icons
import {
  IconAutoService,
  IconChat,
  IconMotoService,
  IconPencilGradient,
  IconStar,
} from "../../../../../icons/components";

// styles
import { styles } from "./ItemSettingWorkshops.styles";
import colors from "../../../../../../styles/colors";

type ItemSettingWorkshopsProps = {
  workshop: WorkshopType;
  isStart: boolean;
};

export const ItemSettingWorkshops: FunctionComponent<
  ItemSettingWorkshopsProps
> = ({ workshop, isStart }) => {
  const navigation = useAllNavigation();
  const firstImage = workshop.images[0] ? workshop.images[0].url : null;
  const containerStyles: StyleProp<ViewStyle> = useMemo(
    () => [styles.container, { marginTop: isStart ? 0 : 12 }],
    [isStart]
  );

  const motoIconStyles = useMemo(
    () => [
      styles.moto,
      workshop.autoTypesWorks.length > 0 && {
        right: 14,
      },
    ],
    [workshop.autoTypesWorks]
  );

  const onPressChange = () => {
    navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshopChange, {
      workshopId: workshop._id,
    });
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerLeft}>
        {firstImage ? (
          <ImageCache imageSrc={firstImage} style={styles.image} />
        ) : null}
        <View style={styles.containerInfo}>
          <Text numberOfLines={1} style={styles.title}>
            {workshop.title}
          </Text>
          <View style={styles.containerIcons}>
            {workshop.autoTypesWorks.length > 0 && (
              <View style={styles.auto}>
                <IconAutoService width={20} height={20} />
              </View>
            )}
            {workshop.motoTypesWorks.length > 0 && (
              <View style={motoIconStyles}>
                <IconMotoService width={20} height={20} />
              </View>
            )}
          </View>
          {workshop.rating ? (
            <View style={styles.containerRating}>
              <View style={styles.inner}>
                <IconChat
                  width={14}
                  height={12}
                  fill={colors.californiaOrange}
                />
                <Text style={styles.infoText}>{workshop.comments.length}</Text>
              </View>
              <View style={styles.inner}>
                <IconStar width={12} height={12} fill={colors.yellow} />
                <Text style={styles.infoText}>{workshop.rating}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.notComments}>
              <Trans>Not comments</Trans>
            </Text>
          )}
        </View>
      </View>
      <View style={styles.containerRight}>
        <TouchableOpacity onPress={onPressChange}>
          <IconPencilGradient width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
