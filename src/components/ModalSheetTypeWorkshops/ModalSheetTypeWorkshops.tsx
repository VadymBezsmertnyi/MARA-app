import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { ModalsSheet } from "../ModalsSheet/ModalsSheet";
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { CheckboxClassic } from "../CheckboxClassic/CheckboxClassic";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// icons
import { IconAutoService, IconMotoService } from "../../icons/components";

// styles
import { styles } from "./ModalSheetTypeWorkshops.styles";

type ModalSheetTypeWorkshopsProps = {
  isShowTypeWorkshops: boolean;
  onClose: () => void;
  typeWorkshops: {
    moto: boolean;
    auto: boolean;
  };
  setTypeWorkshops: React.Dispatch<
    React.SetStateAction<{
      moto: boolean;
      auto: boolean;
    }>
  >;
  onSubmit: () => void;
};

export const ModalSheetTypeWorkshops: FunctionComponent<
  ModalSheetTypeWorkshopsProps
> = ({
  isShowTypeWorkshops,
  onClose,
  typeWorkshops,
  setTypeWorkshops,
  onSubmit,
}) => {
  const { i18n } = useLocalesProvider();

  return (
    <ModalsSheet isShow={isShowTypeWorkshops} onClose={onClose}>
      <View style={styles.containerModalType}>
        <View>
          <Text style={styles.titleModalType}>
            <Trans>Type workshops</Trans>
          </Text>
          <LinearGradientCustom style={styles.lineModalType} />
          <View style={styles.containerSelect}>
            <Text style={styles.titleSelect}>
              <Trans>Repair of motorcycles</Trans>
            </Text>
            <View style={styles.containerRightSelect}>
              {typeWorkshops.moto ? (
                <IconMotoService width={28} height={28} />
              ) : null}
              <CheckboxClassic
                check={typeWorkshops.moto}
                setCheck={(moto) => {
                  setTypeWorkshops((state) => ({ ...state, moto }));
                }}
                isGradient
                accessibilityLabel={i18n._("Select type work moto")}
              />
            </View>
          </View>
          <View style={styles.containerSelect}>
            <Text style={styles.titleSelect}>
              <Trans>Repair of automobiles</Trans>
            </Text>
            <View style={styles.containerRightSelect}>
              {typeWorkshops.auto ? (
                <IconAutoService width={28} height={28} />
              ) : null}
              <CheckboxClassic
                check={typeWorkshops.auto}
                setCheck={(auto) => {
                  setTypeWorkshops((state) => ({ ...state, auto }));
                }}
                isGradient
                accessibilityLabel={i18n._("Select type work auto")}
              />
            </View>
          </View>
        </View>
        <ButtonCustom
          disabled={!(typeWorkshops.auto || typeWorkshops.moto)}
          title={i18n._("Select")}
          accessibilityLabel={i18n._("Select")}
          onSubmit={onSubmit}
        />
      </View>
    </ModalsSheet>
  );
};
