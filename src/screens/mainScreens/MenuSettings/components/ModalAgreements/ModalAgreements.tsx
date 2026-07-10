import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { Shadow } from "react-native-shadow-2";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { Loader } from "../../../../../providers/LoadingProvider/components/Loader/Loader";

// styles
import { styles } from "./ModalAgreements.styles";

type ModalAgreementsProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "policy" | "about" | null;
};

export const ModalAgreements: FunctionComponent<ModalAgreementsProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const { language } = useLocalesProvider();
  const [loading, setLoading] = useState(true);

  const source = useMemo(() => {
    const EXPO_PUBLIC_WEB_SITE_URL = process.env
      .EXPO_PUBLIC_WEB_SITE_URL as string;
    const currentUrl =
      EXPO_PUBLIC_WEB_SITE_URL || "https://m-a-r-a.netlify.app";
    if (type === "policy")
      return {
        uri: `${currentUrl}/mobile/privacy-policy?language=${language}`,
      };
    if (type === "about")
      return {
        uri: `${currentUrl}/mobile/about?language=${language}`,
      };
    return {
      uri: `${currentUrl}/mobile/term-of-use?language=${language}`,
    };
  }, [type]);

  useEffect(() => {
    if (!isOpen) setLoading(true);
  }, [isOpen]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContent}
        >
          <Shadow stretch>
            <View style={styles.container}>
              <WebView
                source={source}
                onLoad={(event) => {
                  setLoading(event.nativeEvent.loading);
                }}
                cacheEnabled
                style={styles.webView}
              />
              {loading ? <Loader /> : null}
            </View>
          </Shadow>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
