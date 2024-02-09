import React, { FunctionComponent, useContext, useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../../localization/localization.provider";
import { workshopsContext } from "../../../providers/WorkshopsProvider/WorkshopsProvider";

// components
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { ItemSettingWorkshops } from "./components/ItemSettingWorkshops/ItemSettingWorkshops";

// helps
import { useAllNavigation } from "../../../navigators/Navigators.helps";

// icons
import { IconClose, IconPlus } from "../../../icons/components";

// constants
import { PATHS_SETTINGS_SCREENS } from "../../../navigators/useNavigator.constants";

// images
import notItemsImage from "../../../../assets/settingsScreen/notWorkshopsUsers.jpeg";

// styles
import { styles } from "./SettingsWorkshops.styles";
import colors from "../../../../styles/colors";

export const SettingsWorkshops: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { workshopsUser } = useContext(workshopsContext);
  const { heightStatusBar } = useContext(themeContext);
  const { i18n } = useContext(localesContext);
  const typeItem = i18n._("workshops");

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerHeader}>
        <View style={styles.boxHeaderEmpty} />
        <Text style={styles.titleHeader}>
          <Trans>My workshops</Trans>
        </Text>
        <TouchableOpacity onPress={onClose}>
          <IconClose width={24} height={24} fill={colors.blackCoffee} />
        </TouchableOpacity>
      </View>
      {workshopsUser.length === 0 ? (
        <View style={styles.containerNotElements}>
          <ImageCache
            contentFit="contain"
            style={styles.imageNotElements}
            imageSrc={notItemsImage}
          />
          <View style={styles.titlesNotElements}>
            <Text style={styles.titleNotElements}>
              <Trans>Sorry!</Trans>
            </Text>
            <Text style={styles.titleNotElements}>
              <Trans>You don't have {typeItem}.</Trans>
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.containerElements}>
          {workshopsUser.map((workshop, index) => {
            const isStart = index === 0;
            return (
              <ItemSettingWorkshops
                key={`user-workshop-${workshop.id}`}
                workshop={workshop}
                isStart={isStart}
              />
            );
          })}
          <ButtonCustom
            onSubmit={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshopAdd);
            }}
            styleContainer={styles.containerButtonAdd}
          >
            <View style={styles.buttonAdd}>
              <IconPlus width={16} height={16} fill={colors.white} />
              <Text style={styles.titleAdd}>
                <Trans>Add workshop</Trans>
              </Text>
            </View>
          </ButtonCustom>
        </ScrollView>
      )}

      <View style={styles.containerFooter}>
        <ButtonCustom
          onSubmit={() => {
            navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshopAdd);
          }}
        >
          <View style={styles.buttonAdd}>
            <IconPlus width={16} height={16} fill={colors.white} />
            <Text style={styles.titleAdd}>
              <Trans>Add workshop</Trans>
            </Text>
          </View>
        </ButtonCustom>
      </View>
    </View>
  );
};
