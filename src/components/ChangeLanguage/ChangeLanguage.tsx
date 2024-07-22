import React, { FunctionComponent, useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";
import { Shadow } from "react-native-shadow-2";

// types
import { Language } from "../../../localization/localization.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";
import { useUserProvider } from "../../providers/UserProvider/UserProvider";
import { usePushNotificationProvider } from "../../providers/PushNotificationProvider/PushNotificationProvider";
import { Loader } from "../../providers/LoadingProvider/components/Loader/Loader";
import { useLoadingProvider } from "../../providers/LoadingProvider/LoadingProvider";

// components
import { ImageCache } from "../ImageCache/ImageCache";
import { ModalsSheet } from "../ModalsSheet/ModalsSheet";
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { CheckboxPoint } from "../CheckboxPoint/CheckboxPoint";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { Input } from "../Input/Input";

// icons
import { IconSearchInput } from "../../icons/components";

// constants
import { languages } from "../../../localization/localization.const";

// styles
import { styles } from "./ChangeLanguage.styles";

export const ChangeLanguage: FunctionComponent = () => {
  const { i18n, language, setLanguage } = useLocalesProvider();
  const { isLoading } = useLoadingProvider();
  const { userData, editUser } = useUserProvider();
  const { setLanguageNotification } = usePushNotificationProvider();
  const [isShowChangeLanguage, setIsShowChangeLanguage] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [selectLanguage, setSelectLanguage] = useState<Language | null>(null);
  const showListLanguage = useMemo(
    () =>
      languages.filter(
        (languageItem) =>
          languageItem.native
            .toLocaleLowerCase()
            .includes(valueSearch.toLocaleLowerCase()) ||
          languageItem.title
            .toLocaleLowerCase()
            .includes(valueSearch.toLocaleLowerCase()) ||
          languageItem.key
            .toLocaleLowerCase()
            .includes(valueSearch.toLocaleLowerCase())
      ),
    [languages, language, valueSearch]
  );
  const selectLanguageGlobal = useMemo(
    () =>
      languages.find((languageItem) => languageItem.key === language) || null,
    [language]
  );
  const showLanguage = useMemo(
    () => (language === "uk" ? "ua" : language),
    [language]
  );

  const onChangeLanguage = async () => {
    if (selectLanguage !== null && language !== selectLanguage) {
      await setLanguage(selectLanguage);
      setLanguageNotification(selectLanguage);
      if (userData)
        await editUser({ ...userData, languageLocal: selectLanguage });
    }
    setSelectLanguage(null);
    setIsShowChangeLanguage(false);
    setValueSearch("");
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsShowChangeLanguage(true);
          setSelectLanguage(language);
        }}
        style={styles.buttonLanguage}
      >
        {selectLanguageGlobal ? (
          <ImageCache
            imageSrc={selectLanguageGlobal.icon}
            style={styles.iconLanguage}
          />
        ) : null}
        <Text style={styles.titleLanguage}>{showLanguage}</Text>
      </TouchableOpacity>
      <Modal visible={isShowChangeLanguage} transparent>
        <ModalsSheet
          onClose={() => {
            setIsShowChangeLanguage(false);
            setValueSearch("");
          }}
        >
          <View style={styles.containerModal}>
            <Shadow stretch>
              <View style={styles.headerModal}>
                <Text style={styles.titleModal}>
                  <Trans>Language selection</Trans>
                </Text>
                <LinearGradientCustom style={styles.lineHeader} />
                <Input
                  placeholder={i18n._("Enter text to search")}
                  accessibilityLabel={i18n._(
                    "Press and enter to search for a city"
                  )}
                  value={valueSearch}
                  onChange={setValueSearch}
                  labelStyle={styles.titleInput}
                  containerStyle={styles.containerInput}
                  wrapperStyle={styles.wrapperInput}
                  InputIcon={<IconSearchInput width={26} height={26} />}
                />
              </View>
            </Shadow>
            <ScrollView contentContainerStyle={styles.containerScroll}>
              {showListLanguage.map((languagesItem) => (
                <TouchableOpacity
                  key={`language-${languagesItem.key}`}
                  style={styles.containerItemList}
                  onPress={() => {
                    setSelectLanguage(languagesItem.key);
                  }}
                >
                  <Text style={styles.titleItemList}>
                    {languagesItem.title} ({languagesItem.native})
                  </Text>
                  <CheckboxPoint
                    isSelect={languagesItem.key === selectLanguage}
                  />
                </TouchableOpacity>
              ))}
              <View style={styles.containerEmpty} />
            </ScrollView>
            <Shadow stretch>
              <View style={styles.containerButtons}>
                <ButtonCustom
                  disabled={selectLanguage === null}
                  title={i18n._("Select")}
                  onSubmit={onChangeLanguage}
                />
              </View>
            </Shadow>
            {isLoading ? <Loader /> : null}
          </View>
        </ModalsSheet>
      </Modal>
    </>
  );
};
