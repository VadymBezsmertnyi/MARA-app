import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// types
import { RootHelpScreensParamList } from "../../../navigators/Navigators.types";
import { TTelegramChannelCategory } from "../../../storeRedux/apis/telegram-channels/telegram-channels.types";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useUserSelector } from "../../../storeRedux/apis/user/slice";

// API
import {
  useGetTelegramChannelsQuery,
  useLazyGetTelegramChannelsQuery,
  useGetTelegramCategoriesQuery,
  useGetTelegramCountriesQuery,
  useGetTelegramCitiesQuery,
  useGetTelegramLocationsQuery,
  useAddTelegramChannelMutation,
  useReportTelegramChannelMutation,
} from "../../../storeRedux/api";

// styles
import { styles } from "./HelpMain.styles";

type HelpMainProps = {
  navigation: NativeStackNavigationProp<RootHelpScreensParamList> &
    DrawerNavigationProp<RootHelpScreensParamList>;
};

export const HelpMain: React.FC<HelpMainProps> = ({ navigation }) => {
  const { heightStatusBar } = useThemeProvider();
  const userData = useUserSelector();
  const [selectedCategory, setSelectedCategory] =
    useState<TTelegramChannelCategory | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>("");
  const [channelUrl, setChannelUrl] = useState<string>("");
  const [channelDescription, setChannelDescription] = useState<string>("");
  const [channelCategory, setChannelCategory] =
    useState<TTelegramChannelCategory | null>(null);
  const [channelCountry, setChannelCountry] = useState<string>("");
  const [channelCity, setChannelCity] = useState<string>("");

  const {
    data: channelsData,
    isLoading: channelsLoading,
    error: channelsError,
    refetch: refetchChannels,
  } = useGetTelegramChannelsQuery({
    category: selectedCategory || undefined,
    country_place_id: selectedCountry || undefined,
    place_id: selectedCity || undefined,
    verified: verifiedOnly || undefined,
    page: 1,
    limit: 20,
  });
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetTelegramCategoriesQuery();
  const { data: countriesData, isLoading: countriesLoading } =
    useGetTelegramCountriesQuery();
  const { data: citiesData, isLoading: citiesLoading } =
    useGetTelegramCitiesQuery({
      country_place_id: selectedCountry || undefined,
    });
  const { data: locationsData, isLoading: locationsLoading } =
    useGetTelegramLocationsQuery();
  const [addChannel, { isLoading: addChannelLoading }] =
    useAddTelegramChannelMutation();
  const [reportChannel, { isLoading: reportChannelLoading }] =
    useReportTelegramChannelMutation();

  const containerStyles = [styles.container, { paddingTop: heightStatusBar }];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchChannels();
    setRefreshing(false);
  };

  const handleAddChannel = async () => {
    if (
      !channelName ||
      !channelUrl ||
      !channelCategory ||
      !userData?.userData?._id
    ) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      await addChannel({
        name: channelName,
        description: channelDescription,
        channelUrl,
        category: channelCategory as any,
        place_id: channelCity || undefined,
        country_place_id: channelCountry || undefined,
        addedBy: userData.userData._id,
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Channel submitted for review",
        position: "top",
        visibilityTime: 3000,
      });

      setChannelName("");
      setChannelUrl("");
      setChannelDescription("");
      setChannelCategory(null);
      setChannelCountry("");
      setChannelCity("");
      setShowAddModal(false);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to add channel",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  const handleReportChannel = async (channelId: string) => {
    Alert.alert(
      "Report Channel",
      "Are you sure you want to report this channel?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Report",
          style: "destructive",
          onPress: async () => {
            try {
              await reportChannel({
                channelId,
                reportData: {
                  reason: "Inappropriate content",
                  reportedBy: userData?.userData?._id || "",
                },
              }).unwrap();

              Toast.show({
                type: "success",
                text1: "Reported",
                text2: "Channel has been reported",
                position: "top",
                visibilityTime: 3000,
              });
            } catch (error: any) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: error.message || "Failed to report channel",
                position: "top",
                visibilityTime: 3000,
              });
            }
          },
        },
      ]
    );
  };

  const handleOpenChannel = (url: string) => {
    Linking.openURL(url).catch(() => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Cannot open channel URL",
        position: "top",
        visibilityTime: 3000,
      });
    });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedCountry("");
    setSelectedCity("");
    setVerifiedOnly(false);
  };

  useEffect(() => {
    if (channelsError)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load telegram channels",
        position: "top",
        visibilityTime: 3000,
      });
  }, [channelsError]);

  return (
    <View style={containerStyles}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Resources</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)}>
          <MaterialIcons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.content}
      >
        {/* Filters Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filters</Text>

          {/* Category Filter */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Category:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categoriesData?.data?.map((category: any) => (
                <TouchableOpacity
                  key={category.value}
                  style={[
                    styles.filterChip,
                    selectedCategory === category.value &&
                      styles.filterChipActive,
                  ]}
                  onPress={() =>
                    setSelectedCategory(
                      selectedCategory === category.value
                        ? null
                        : category.value
                    )
                  }
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedCategory === category.value &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Country Filter */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Country:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {countriesData?.data?.map((country: string) => (
                <TouchableOpacity
                  key={country}
                  style={[
                    styles.filterChip,
                    selectedCountry === country && styles.filterChipActive,
                  ]}
                  onPress={() => {
                    setSelectedCountry(
                      selectedCountry === country ? "" : country
                    );
                    setSelectedCity(""); // Reset city when country changes
                  }}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedCountry === country &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    {country}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* City Filter */}
          {selectedCountry && (
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>City:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {citiesData?.data?.map((city: string) => (
                  <TouchableOpacity
                    key={city}
                    style={[
                      styles.filterChip,
                      selectedCity === city && styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setSelectedCity(selectedCity === city ? "" : city)
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedCity === city && styles.filterChipTextActive,
                      ]}
                    >
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Verified Filter */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Verified Only:</Text>
            <TouchableOpacity
              style={[
                styles.filterChip,
                verifiedOnly && styles.filterChipActive,
              ]}
              onPress={() => setVerifiedOnly(!verifiedOnly)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  verifiedOnly && styles.filterChipTextActive,
                ]}
              >
                {verifiedOnly ? "Yes" : "No"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Clear Filters */}
          {(selectedCategory ||
            selectedCountry ||
            selectedCity ||
            verifiedOnly) && (
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Channels List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Telegram Channels ({channelsData?.data?.pagination?.totalItems || 0}
            )
          </Text>

          {channelsLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading channels...</Text>
            </View>
          ) : (
            channelsData?.data?.channels?.map((channel: any) => (
              <View key={channel._id} style={styles.channelCard}>
                <View style={styles.channelHeader}>
                  <View style={styles.channelInfo}>
                    <Text style={styles.channelName}>{channel.name}</Text>
                    {channel.description && (
                      <Text style={styles.channelDescription}>
                        {channel.description}
                      </Text>
                    )}
                    <View style={styles.channelMeta}>
                      <Text style={styles.channelCategory}>
                        {channel.category}
                      </Text>
                      {channel.country_place_id?.name && (
                        <Text style={styles.channelLocation}>
                          {channel.country_place_id.name}
                        </Text>
                      )}
                      {channel.place_id?.name && (
                        <Text style={styles.channelLocation}>
                          {channel.place_id.name}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.channelBadges}>
                    {channel.verified && channel.aiVerified && (
                      <View style={styles.verifiedBadge}>
                        <MaterialIcons
                          name="verified"
                          size={16}
                          color="#4CAF50"
                        />
                        <Text style={styles.verifiedText}>Verified</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.channelActions}>
                  <TouchableOpacity
                    style={styles.channelButton}
                    onPress={() => handleOpenChannel(channel.channelUrl)}
                  >
                    <MaterialIcons name="telegram" size={20} color="#0088CC" />
                    <Text style={styles.channelButtonText}>Open Channel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.reportButton}
                    onPress={() => handleReportChannel(channel._id)}
                    disabled={reportChannelLoading}
                  >
                    <MaterialIcons name="flag" size={20} color="#F44336" />
                    <Text style={styles.reportButtonText}>Report</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Add Channel Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <MaterialIcons name="close" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Telegram Channel</Text>
            <TouchableOpacity
              onPress={handleAddChannel}
              disabled={addChannelLoading}
            >
              <Text style={styles.modalSaveButton}>
                {addChannelLoading ? "Adding..." : "Add"}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Channel Name *</Text>
              <TextInput
                style={styles.formInput}
                value={channelName}
                onChangeText={setChannelName}
                placeholder="Enter channel name"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Channel URL *</Text>
              <TextInput
                style={styles.formInput}
                value={channelUrl}
                onChangeText={setChannelUrl}
                placeholder="https://t.me/channelname"
                keyboardType="url"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Description</Text>
              <TextInput
                style={[styles.formInput, styles.formInputMultiline]}
                value={channelDescription}
                onChangeText={setChannelDescription}
                placeholder="Enter channel description"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Category *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categoriesData?.data?.map((category: any) => (
                  <TouchableOpacity
                    key={category.value}
                    style={[
                      styles.categoryChip,
                      channelCategory === category.value &&
                        styles.categoryChipActive,
                    ]}
                    onPress={() => setChannelCategory(category.value)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        channelCategory === category.value &&
                          styles.categoryChipTextActive,
                      ]}
                    >
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Country</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {countriesData?.data?.map((country: string) => (
                  <TouchableOpacity
                    key={country}
                    style={[
                      styles.categoryChip,
                      channelCountry === country && styles.categoryChipActive,
                    ]}
                    onPress={() => setChannelCountry(country)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        channelCountry === country &&
                          styles.categoryChipTextActive,
                      ]}
                    >
                      {country}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {channelCountry && (
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>City</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {citiesData?.data?.map((city: string) => (
                    <TouchableOpacity
                      key={city}
                      style={[
                        styles.categoryChip,
                        channelCity === city && styles.categoryChipActive,
                      ]}
                      onPress={() => setChannelCity(city)}
                    >
                      <Text
                        style={[
                          styles.categoryChipText,
                          channelCity === city && styles.categoryChipTextActive,
                        ]}
                      >
                        {city}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
