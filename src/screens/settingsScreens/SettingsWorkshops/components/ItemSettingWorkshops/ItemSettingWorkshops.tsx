import React, { FunctionComponent, useMemo } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// types
import { TWorkshop } from "../../../../../storeRedux/apis/workshops/workshops.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

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
  IconStar,
} from "../../../../../icons/components";

// styles
import { styles } from "./ItemSettingWorkshops.styles";
import colors from "../../../../../../styles/colors";

type ItemSettingWorkshopsProps = {
  workshop: TWorkshop;
  isStart: boolean;
  currentUserId: string | null;
};

export const ItemSettingWorkshops: FunctionComponent<
  ItemSettingWorkshopsProps
> = ({ workshop, isStart, currentUserId }) => {
  const { i18n } = useLocalesProvider();
  const navigation = useAllNavigation();
  const firstImage = workshop.imageFiles[0] ? workshop.imageFiles[0].url : null;
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

  const hasOwner = !!workshop.ownerUserId;
  const isCurrentUserOwner =
    currentUserId && workshop.ownerUserId?._id === currentUserId;
  const canEdit = !hasOwner || isCurrentUserOwner;
  const showConfirmButton = !hasOwner;

  const onPressChange = () => {
    navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshopChange, {
      workshopId: workshop._id,
    });
  };

  const onPressConfirmOwnership = () => {};

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
          {workshop.verification && (
            <View style={styles.containerStatus}>
              <View
                style={[
                  styles.statusBadge,
                  workshop.verification.status === "pending" &&
                    styles.statusPending,
                  workshop.verification.status === "verified" &&
                    styles.statusVerified,
                  workshop.verification.status === "rejected" &&
                    styles.statusRejected,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    workshop.verification.status === "pending" &&
                      styles.statusTextPending,
                    workshop.verification.status === "verified" &&
                      styles.statusTextVerified,
                    workshop.verification.status === "rejected" &&
                      styles.statusTextRejected,
                  ]}
                >
                  {workshop.verification.status === "pending" &&
                    i18n._("Under review")}
                  {workshop.verification.status === "verified" &&
                    i18n._("Verified")}
                  {workshop.verification.status === "rejected" &&
                    i18n._("Rejected")}
                </Text>
              </View>
            </View>
          )}
          {workshop.verification?.status === "rejected" &&
            workshop.verification.reason && (
              <Text style={styles.reasonText} numberOfLines={2}>
                {workshop.verification.reason}
              </Text>
            )}
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
            <Text style={styles.notComments}>{i18n._("Not comments")}</Text>
          )}
        </View>
      </View>
      <View style={styles.containerRight}>
        {canEdit && (
          <TouchableOpacity style={styles.buttonEdit} onPress={onPressChange}>
            <Text style={styles.buttonEditText}>{i18n._("Edit")}</Text>
          </TouchableOpacity>
        )}
        {showConfirmButton && (
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={onPressConfirmOwnership}
          >
            <Text style={styles.buttonEditText}>
              {i18n._("Confirm ownership")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
