import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Modal } from "react-native";
import WebView from "react-native-webview";

// components
import { ModalsSheet } from "../../../../../components/ModalsSheet/ModalsSheet";
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { Loader } from "../../../../../providers/LoadingProvider/components/Loader/Loader";

type ModalAgreementsProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "policy" | null;
};

export const ModalAgreements: FunctionComponent<ModalAgreementsProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const { language } = useLocalesProvider();
  const [loading, setLoading] = useState(true);

  const source = useMemo(() => {
    if (type === "policy")
      return {
        uri: `https://m-a-r-a.netlify.app/mobile/privacy-policy?language=${language}`,
      };
    return {
      uri: `https://m-a-r-a.netlify.app/mobile/term-of-use?language=${language}`,
    };
  }, [type]);

  useEffect(() => {
    if (!isOpen) setLoading(true);
  }, [isOpen]);

  return (
    <Modal visible={isOpen} transparent>
      <ModalsSheet isShow={isOpen} onClose={onClose}>
        <>
          <WebView
            source={source}
            onLoad={(event) => {
              setLoading(event.nativeEvent.loading);
            }}
            cacheEnabled
          />
          {loading ? <Loader /> : null}
        </>
      </ModalsSheet>
    </Modal>
  );
};
