import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootHelpScreensParamList } from "../../../navigators/Navigators.types";
import { TTelegramChannelCategory } from "../../../storeRedux/apis/telegram-channels/telegram-channels.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useUserSelector } from "../../../storeRedux/apis/user/slice";

// API
import {
  useGetTelegramCategoriesQuery,
  useAddTelegramChannelMutation,
} from "../../../storeRedux/api";

// components
import { Input } from "../../../components/Input/Input";
import { LocationModal } from "./components/LocationModal/LocationModal";
import { Header } from "../../../components/Header/Header";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";

// styles
import { styles } from "./AddTelegramChannel.styles";
import {
  CountryDbType,
  PlaceDbType,
} from "../../../providers/PlacesProvider/PlacesProvider.types";

type AddTelegramChannelProps = {
  navigation: NativeStackNavigationProp<RootHelpScreensParamList>;
};

export const AddTelegramChannel: React.FC<AddTelegramChannelProps> = ({
  navigation,
}) => {
  const { i18n, language } = useLocalesProvider();
  const userData = useUserSelector();
  const [channelName, setChannelName] = useState<string>("");
  const [channelUrl, setChannelUrl] = useState<string>("");
  const [channelDescription, setChannelDescription] = useState<string>("");
  const [channelCategory, setChannelCategory] =
    useState<TTelegramChannelCategory | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryDbType | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<PlaceDbType | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] =
    useState<boolean>(false);

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetTelegramCategoriesQuery();
  const [addChannel] = useAddTelegramChannelMutation();

  const isFormValid =
    channelName &&
    channelUrl &&
    channelCategory &&
    selectedCountry &&
    selectedCity;

  const handleLocationSelect = (type: "country" | "city", item: any) => {
    if (type === "country") {
      setSelectedCountry(item);
      setSelectedCity(null);
    } else setSelectedCity(item);
  };

  const handleAddChannel = async () => {
    if (!isFormValid || !userData?.userData?._id) {
      Alert.alert(i18n._("Error"), i18n._("Please fill all required fields"));
      return;
    }

    try {
      await addChannel({
        name: channelName,
        description: channelDescription,
        channelUrl,
        category: channelCategory,
        place_id: selectedCity._id,
        country_place_id: selectedCountry._id,
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
    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
      behavior="padding"
    >
      <Header
        title={i18n._("Add Telegram Channel")}
        onRightDelete={undefined}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>
            {i18n._("You can add a telegram channel")}:
          </Text>
          <Input
            isRegular
            placeholder={i18n._("Enter channel name")}
            label={i18n._("Channel Name")}
            value={channelName}
            onChange={(value) => {
              setChannelName(value);
            }}
          />
          <Input
            isRegular
            placeholder={i18n._("https://t.me/channelname or @channelname")}
            label={i18n._("Channel URL")}
            value={channelUrl}
            onChange={(value) => {
              setChannelUrl(value);
            }}
            keyboardType="url"
          />
          <Input
            isRegular
            placeholder={i18n._("Enter channel description")}
            label={i18n._("Description")}
            value={channelDescription}
            onChange={(value) => {
              setChannelDescription(value);
            }}
            customStyles={styles.formInputMultiline}
          />
          <View style={styles.formGroup}>
            <Text style={styles.labelInput}>{i18n._("Category")} *</Text>
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
          <View style={styles.formGroup}>
            <Text style={styles.labelInput}>{i18n._("Location")} *</Text>
            <TouchableOpacity
              style={styles.formInput}
              onPress={() => setIsLocationModalOpen(true)}
            >
              <Text style={styles.locationText}>
                {selectedCountry && selectedCity
                  ? `${
                      selectedCountry[language].long_name ||
                      selectedCountry.en.long_name
                    }, ${selectedCity[language]?.name || selectedCity.en.name}`
                  : i18n._("Select location...")}
              </Text>
            </TouchableOpacity>
          </View>
          <ButtonCustom
            title={i18n._("Add Channel")}
            onSubmit={handleAddChannel}
            disabled={!isFormValid}
          />
          <View style={styles.empty} />
        </ScrollView>
      </View>
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={handleLocationSelect}
        selectedLocation={{
          country: selectedCountry,
          city: selectedCity,
        }}
      />
    </KeyboardAvoidingView>
  );
};
