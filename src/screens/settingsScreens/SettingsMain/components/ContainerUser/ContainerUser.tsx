import React, { FunctionComponent, useContext, useMemo } from "react";
import { ImageURISource, Text, View } from "react-native";

// providers
import { userContext } from "../../../../../providers/UserProvider/UserProvider";
import { placesContext } from "../../../../../providers/PlacesProvider/PlacesProvider";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";

// icons
import { IconProfileAvatar } from "../../../../../icons/components";

// styles
import { styles } from "./ContainerUser.styles";
import { localesContext } from "../../../../../../localization/localization.provider";
import { PhoneWithMassagers } from "../../../../../components/PhoneWithMassagers/PhoneWithMassagers";
import { Trans } from "@lingui/macro";

export const ContainerUser: FunctionComponent = () => {
  const { language } = useContext(localesContext);
  const { userData } = useContext(userContext);
  const { placesDB, getPlace } = useContext(placesContext);
  const showCity = useMemo(
    () =>
      userData?.place_id
        ? getPlace(userData.place_id)?.[language] || null
        : null,
    [userData?.place_id, placesDB]
  );
  const imageSource = useMemo(
    () =>
      userData?.avatar
        ? ({
            uri: userData.avatar.url,
            cache: "force-cache",
          } as ImageURISource)
        : null,
    [userData?.avatar]
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        {imageSource ? (
          <ImageCache style={styles.containerImage} imageSrc={imageSource} />
        ) : (
          <IconProfileAvatar />
        )}
        <View style={styles.titlesMain}>
          <Text style={styles.titleInfo}>{userData?.firstName}</Text>
          <Text style={styles.titleInfo}>{showCity?.name}</Text>
          {userData?.phoneNumber ? (
            <PhoneWithMassagers
              title={userData.phoneNumber}
              isTelegram
              isWhatsApp
              isViber
            />
          ) : null}
        </View>
      </View>
      <View style={styles.containerOtherContacts}>
        <Text style={styles.titleOtherContacts}>
          <Trans>Additional contacts:</Trans>
        </Text>
        {userData?.phoneNumber ? (
          <PhoneWithMassagers
            title={userData.phoneNumber}
            isTelegram
            isWhatsApp
            isViber
          />
        ) : null}
      </View>
    </View>
  );
};
