import React, { FunctionComponent, useMemo } from "react";
import { ImageURISource, Text, View } from "react-native";

// providers
import { useUserProvider } from "../../../../../providers/UserProvider/UserProvider";
import { usePlacesProvider } from "../../../../../providers/PlacesProvider/PlacesProvider";
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";
import { PhoneWithMessengers } from "../../../../../components/PhoneWithMessengers/PhoneWithMessengers";

// icons
import { IconProfileAvatar } from "../../../../../icons/components";

// styles
import { styles } from "./ContainerUser.styles";

export const ContainerUser: FunctionComponent = () => {
  const { language } = useLocalesProvider();
  const { userData } = useUserProvider();
  const { placesDB } = usePlacesProvider();
  const showCity = useMemo(
    () => (userData?.place_id ? userData.place_id[language] || null : null),
    [userData?.place_id, placesDB]
  );
  const imageSource = useMemo(
    () =>
      userData?.avatarFile
        ? ({
            uri: userData.avatarFile.url,
            cache: "force-cache",
          } as ImageURISource)
        : null,
    [userData?.avatarFile]
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
          {i18n._("Additional contacts:")}
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
