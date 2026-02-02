import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootHelpScreensParamList } from "../../../navigators/Navigators.types";
import { TTelegramChannelCategory } from "../../../storeRedux/apis/telegram-channels/telegram-channels.types";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useUserSelector } from "../../../storeRedux/apis/user/slice";

// API
import {
  useGetTelegramCategoriesQuery,
  useGetTelegramLocationsQuery,
  useAddTelegramChannelMutation,
} from "../../../storeRedux/api";

// components
import { InputButton } from "../../../components/InputButton/InputButton";
import { ModalSheetSearchPlaceAddress } from "../../../components/ModalSheetSearchPlaceAddress/ModalSheetSearchPlaceAddress";

// styles
import { styles } from "./AddTelegramChannel.styles";

type AddTelegramChannelProps = {
  navigation: NativeStackNavigationProp<RootHelpScreensParamList>;
};

export const AddTelegramChannel: React.FC<AddTelegramChannelProps> = ({
  navigation,
}) => {
  const { heightStatusBar } = useThemeProvider();
  const { i18n } = useLocalesProvider();
  const userData = useUserSelector();

  // Form state
  const [channelName, setChannelName] = useState<string>("");
  const [channelUrl, setChannelUrl] = useState<string>("");
  const [channelDescription, setChannelDescription] = useState<string>("");
  const [channelCategory, setChannelCategory] =
    useState<TTelegramChannelCategory | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isModalPlace, setIsModalPlace] = useState<boolean>(false);
  const [placeAddress, setPlaceAddress] = useState<any>(null);

  // API queries
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetTelegramCategoriesQuery();
  const { data: locationsData, isLoading: locationsLoading } =
    useGetTelegramLocationsQuery();
  const [addChannel, { isLoading: addChannelLoading }] =
    useAddTelegramChannelMutation();

  const containerStyles = [styles.container, { paddingTop: heightStatusBar }];

  const handleAddChannel = async () => {
    if (
      !channelName ||
      !channelUrl ||
      !channelCategory ||
      !userData?.userData?._id
    ) {
      Alert.alert(i18n._("Error"), i18n._("Please fill all required fields"));
      return;
    }

    try {
      await addChannel({
        name: channelName,
        description: channelDescription,
        channelUrl,
        category: channelCategory,
        place_id: placeAddress?.placeId || undefined,
        country_place_id: placeAddress?.address?.countryId || undefined,
        addedBy: userData.userData._id,
      }).unwrap();

      Toast.show({
        type: "success",
        text1: i18n._("Success"),
        text2: i18n._("Channel submitted for review"),
        position: "top",
        visibilityTime: 3000,
      });

      navigation.goBack();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: i18n._("Error"),
        text2: error.message || i18n._("Failed to add channel"),
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={containerStyles}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{i18n._("Add Telegram Channel")}</Text>
        <TouchableOpacity
          onPress={handleAddChannel}
          disabled={addChannelLoading}
        >
          <Text style={styles.saveButton}>
            {addChannelLoading ? i18n._("Adding...") : i18n._("Add")}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Channel Name */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n._("Channel Name")} *</Text>
          <TextInput
            style={styles.formInput}
            value={channelName}
            onChangeText={setChannelName}
            placeholder={i18n._("Enter channel name")}
          />
        </View>

        {/* Channel URL */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n._("Channel URL")} *</Text>
          <TextInput
            style={styles.formInput}
            value={channelUrl}
            onChangeText={setChannelUrl}
            placeholder={i18n._("https://t.me/channelname")}
            keyboardType="url"
          />
        </View>

        {/* Description */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n._("Description")}</Text>
          <TextInput
            style={[styles.formInput, styles.formInputMultiline]}
            value={channelDescription}
            onChangeText={setChannelDescription}
            placeholder={i18n._("Enter channel description")}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Category */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n._("Category")} *</Text>
          {categoriesLoading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
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
          )}
        </View>

        {/* Location Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n._("Location")}</Text>
          <InputButton
            isRegular
            placeholder={i18n._("Enter the address")}
            label={i18n._("Channel location")}
            value={placeAddress?.title || ""}
            customStyles={styles.buttonLocation}
            onPress={() => {
              setIsModalPlace(true);
            }}
          />
        </View>
      </ScrollView>

      {/* Place Selection Modal */}
      <ModalSheetSearchPlaceAddress
        isOpen={isModalPlace}
        onClose={() => {
          setIsModalPlace(false);
        }}
        onSubmit={(data) => {
          setPlaceAddress(data);
          setIsModalPlace(false);
        }}
      />
    </View>
  );
};
