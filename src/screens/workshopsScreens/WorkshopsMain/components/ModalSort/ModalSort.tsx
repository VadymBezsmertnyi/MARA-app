import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { BlurView } from "expo-blur";

// redux
import { useUserSelector } from "../../../../../storeRedux/apis/user/slice";
import { useEditUserMutation } from "../../../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useMapProvider } from "../../../../../providers/MapProvider/MapProvider";

// components
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// icons
import { IconClose } from "../../../../../icons/components";

// styles
import { styles } from "./ModalSort.styles";
import colors from "../../../../../../styles/colors";

type ModalSortProps = {
  onClose: () => void;
  setTypeSort: (type: "distance" | "rating" | "comments") => void;
  currentSort: "comments" | "distance" | "rating" | null;
};

export const ModalSort: FunctionComponent<ModalSortProps> = ({
  onClose,
  setTypeSort,
  currentSort,
}) => {
  const { i18n } = useLocalesProvider();
  const { userData } = useUserSelector();
  const [editUserMutation] = useEditUserMutation();
  const { location } = useMapProvider();

  const isLocationEnabled = userData?.isGeoLocation || false;
  const isLocationLoading = isLocationEnabled && !location;

  const onToggleLocation = async () => {
    if (!userData) return;

    const isGeoLocation = !(userData.isGeoLocation || false);
    const isGeoLocationBackground = isGeoLocation
      ? userData.isGeoLocationBackground || false
      : false;
    await editUserMutation({
      body: { isGeoLocation, isGeoLocationBackground },
      existingUserData: userData,
    });
  };

  return (
    <Shadow>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            accessibilityLabel={i18n._("Button for closing the modal window")}
            onPress={onClose}
          >
            <IconClose width={24} height={24} fill={colors.blackCoffee} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtons}>
          <View style={styles.distanceButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                if (isLocationEnabled && !isLocationLoading) {
                  setTypeSort("distance");
                }
              }}
              disabled={!isLocationEnabled || isLocationLoading}
              style={[
                styles.buttonItem,
                currentSort === "distance" && styles.buttonItemSelected,
                (!isLocationEnabled || isLocationLoading) &&
                  styles.buttonItemDisabled,
              ]}
            >
              <Text
                style={[
                  styles.titleButton,
                  currentSort === "distance" && styles.titleButtonSelected,
                ]}
              >
                {i18n._("By distance:")}
              </Text>
              <Text
                style={[
                  styles.subTitleButton,
                  currentSort === "distance" && styles.subTitleButtonSelected,
                ]}
              >
                {i18n._("from closest to farthest")}
              </Text>
            </TouchableOpacity>
            {isLocationLoading && (
              <BlurView intensity={5} style={styles.distanceBlur}>
                <View style={styles.distanceBlurContent}>
                  <Text style={styles.distanceWarningText}>
                    {i18n._("Getting location...")}
                  </Text>
                </View>
              </BlurView>
            )}
            {!isLocationEnabled && !isLocationLoading && (
              <BlurView intensity={5} style={styles.distanceBlur}>
                <View style={styles.distanceBlurContent}>
                  <Text style={styles.distanceWarningText} numberOfLines={2}>
                    {i18n._(
                      "To calculate distance, please enable location services"
                    )}
                  </Text>
                  <ButtonCustom
                    title={i18n._("Enable location")}
                    onSubmit={onToggleLocation}
                    styleContainer={styles.distanceButtonContainerStyle}
                    styleButton={styles.distanceButtonStyle}
                    styleTitle={styles.distanceButtonTitle}
                  />
                </View>
              </BlurView>
            )}
          </View>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setTypeSort("rating");
            }}
            style={[
              styles.buttonItem,
              currentSort === "rating" && styles.buttonItemSelected,
            ]}
          >
            <Text
              style={[
                styles.titleButton,
                currentSort === "rating" && styles.titleButtonSelected,
              ]}
            >
              {i18n._("By rating:")}
            </Text>
            <Text
              style={[
                styles.subTitleButton,
                currentSort === "rating" && styles.subTitleButtonSelected,
              ]}
            >
              {i18n._("from highest to lowest")}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setTypeSort("comments");
            }}
            style={[
              styles.buttonItem,
              currentSort === "comments" && styles.buttonItemSelected,
            ]}
          >
            <Text
              style={[
                styles.titleButton,
                currentSort === "comments" && styles.titleButtonSelected,
              ]}
            >
              {i18n._("By number of comments:")}
            </Text>
            <Text
              style={[
                styles.subTitleButton,
                currentSort === "comments" && styles.subTitleButtonSelected,
              ]}
            >
              {i18n._("from highest to lowest")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  );
};
