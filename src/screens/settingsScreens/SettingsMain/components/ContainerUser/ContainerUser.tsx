import React, { FunctionComponent, useMemo } from "react";
import { ImageURISource, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// redux
import { useUserSelector } from "../../../../../storeRedux/apis/user/slice";

// providers
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
  const { userData } = useUserSelector();
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
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {imageSource ? (
            <ImageCache style={styles.avatarImage} imageSrc={imageSource} />
          ) : (
            <IconProfileAvatar style={styles.avatarImage} />
          )}
          <TouchableOpacity style={styles.editButton}>
            <MaterialIcons name="edit" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {userData?.firstName || "John Doe"}
          </Text>
          <Text style={styles.profileLocation}>
            {showCity?.name || "San Francisco, CA"}
          </Text>
          {userData?.phoneNumber ? (
            <PhoneWithMessengers title={userData.phoneNumber} />
          ) : (
            <Text style={styles.profilePhone}>+1 234 567 8900</Text>
          )}
        </View>

        <TouchableOpacity style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>128</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>64</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Events</Text>
        </View>
      </View>
    </View>
  );
};
