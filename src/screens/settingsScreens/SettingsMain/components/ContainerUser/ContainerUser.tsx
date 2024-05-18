import React, { FunctionComponent, useContext, useMemo } from "react";
import { ImageURISource, Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { userContext } from "../../../../../providers/UserProvider/UserProvider";
import { placesContext } from "../../../../../providers/PlacesProvider/PlacesProvider";
import { localesContext } from "../../../../../../localization/localization.provider";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";
import { PhoneWithMessengers } from "../../../../../components/PhoneWithMessengers/PhoneWithMessengers";

// icons
import { IconProfileAvatar } from "../../../../../icons/components";

// styles
import { styles } from "./ContainerUser.styles";

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
          <IconProfileAvatar style={styles.containerImage} />
        )}
        <View style={styles.titlesMain}>
          <Text style={styles.titleInfo}>{userData?.firstName}</Text>
          <Text style={styles.titleInfo}>{showCity?.name}</Text>
          {userData?.phoneNumber ? (
            <PhoneWithMessengers
              title={userData.phoneNumber}
              //isTelegram
              //isWhatsApp
              //isViber
            />
          ) : null}
        </View>
      </View>
      {/* <View style={styles.containerOtherContacts}>
        <Text style={styles.titleOtherContacts}>
          <Trans>Additional contacts:</Trans>
        </Text>
        {userData?.phoneNumber ? (
          <PhoneWithMessengers
            title={userData.phoneNumber}
            isTelegram
            isWhatsApp
            isViber
          />
        ) : null}
      </View> */}
    </View>
  );
};
